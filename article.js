var fs = require('fs');
var giphy = require("giphy")("dc6zaTOxFJmzC");
var Identity = require('fake-identity');
var Markov = require("./markov");
var quizCreator = require("./quiz")
var Templater = require("./templater")
var Flickr = require("flickrapi");

var flickrOptions = {
    api_key: "47f585c43e1ced1a1a3759da564fc143",
    secret: "a0a649c7f8b8fd28"
  };

var findPictures = null;

Flickr.tokenOnly(flickrOptions, function(error, flickr) {
  // we can now use "flickr" as our API object
  findPictures = function(text, callback) {
    flickr.photos.search({
      text: text
    }, function(err, result) {
      if(err) { return console.log(err); }
      var photos = result.photos.photo;
      var arr = [];
      for (var i = 0; i < photos.length; i++) {
        var photo = photos[i];
        var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg";
        arr.push(url);
      }
      callback(arr);
    });
  };
});

function getQuizPhotos(subject, maxPhotos) {
  findPictures(subject, function(photos) {
    if (photos.length > maxPhotos) {
      photos = photos.slice(0, maxPhotos);
    }
    return photos;
  });
}

function findGifUrls(string, callback){
  giphy.search({q:string}, function (err, response){
    if (err){
      return console.error("ERROR: ", err);
    }
    var ret = [];
    //console.log(response);
    for (var i = 0; i < response.data.length; i++){
    }
    callback(response);
  });
}

function assignAuthor(article, author){
  article.username = author.username;
  article.authorName = author.name;
  article.profileUrl = "/users/" + article.username;
  article.authorProfilePicture = author.authorProfilePicture;
}

function newAuthor(){
  var id = Identity.generate();
  var author = {};
  author.name = id.firstName + " " + id.lastName;
  author.username= id.firstName.toLowerCase() + id.lastName.toLowerCase();
  author.email = id.firstName.toLowerCase()+[".","","-","_"][rand(0,3)]+id.lastName.toLowerCase() + "@" +
    ["hotmail.com","gmail.com","fuzzbeed.com","yahoo.com","live.com","outlook.com"][rand(0,5)];
  author.profileUrl = "/users/" + author.username;
  author.authorProfilePicture = "/assets/userpics/" +
    ((stringToIntHash(author.username)%274) + 1) + ".jpg";
  var randomBannerSearchText = dicts.subj[rand(0,dicts.subj.length)];
  findPictures(randomBannerSearchText, function(photos) {
    author.bannerPhoto = photos[rand(0, photos.length)];
    console.log("Banner URL: " + author.bannerPhoto);
  });
  return author;
}

function stringToIntHash(str){
  var hash = 0;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    char = str.charCodeAt(i);
    hash = ((hash<<5)-hash)+char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return (hash > 0)? hash : -hash;
}


/////////////////////////////////////
// Entry point to Article Creation //
/////////////////////////////////////
function createEntireArticle(author, callback){
  if(typeof author === "function") {
    callback = author;
    author = newAuthor();
  }
  var templater = new Templater();
  templater.loadBuzzTitles();
  var article = templater.generateName();
  assignAuthor(article, author);

  article.url = "/users/" + article.username + "/" + article.articleName;
  article.responses = rand(10,600);
  article.elements = [];
  article.timestamp = Date.now();

  var m = new Markov();
  m.pretrainBuzzfeedLists();
  m.pretrainWikipediaSubject(article.subj, function() {
    findGifUrls(article.subj, function(gifs){
      gifs.data = gifs.data.filter(function(v, i) {
        return gifs.data.indexOf(v) === i;
      });

      if(gifs.data.length > 0) article.previewUrl = gifs.data[0].images.original_still.url;

      var arr = [];
      var i;
      if(gifs.data.length < article.num) {
        for (i = 0; i < gifs.data.length; i++) {
          arr.push({
            imageUrl: gifs.data[i].images.original.url,
            body: m.generate(rand(rand(0, 2),5),10, 2),
            title: m.generate(1,10, 3)
          });
        }
        findPictures(article.subj, function(allPics) {
          var diffPictures = allPics.slice(0, article.num - gifs.data.length);
          if(!article.previewUrl) article.previewUrl = diffPictures[0];

          for (i = 0; i < diffPictures.length; i++) {
            arr.push({
              imageUrl: diffPictures[i],
              body: m.generate(rand(rand(rand(0, 2), 3),7),10, 5),
              title: m.generate(1,10, 3)
            });
          }
          arr = shuffle(arr);
          article.elements = arr;
          callback(article, author);
        });
      } else {
        for (i = 0; i < article.num; i++){
          if (i < gifs.data.length){
            arr.push({
              imageUrl: gifs.data[i].images.original.url,
              body: m.generate(rand(rand(0, 2),5),10, 2),
              title: m.generate(1,10, 3)
            });
          } else break;
        }
        arr = shuffle(arr);
        article.elements = arr;
        callback(article, author);
      }
    });
  });
}

function contains(coll, el, f) {
  return find(coll, el, f) !== null;
}

function find(coll, el, f) {
  var max = coll.length;
  for (var i = 0; i < max; ++i){
    if(f(coll[i], el)) {
      return coll[i];
    }
  }

  return null;
}

function shuffle(o, func){
  if(!func) func = Math.random;

  for(var j, x, i = o.length; i; j = Math.floor(func() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
}

module.exports = {
  createEntireArticle: createEntireArticle,
  newAuthor: newAuthor,
  findPictures: findPictures
};
