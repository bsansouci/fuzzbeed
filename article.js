var fs = require('fs');
var giphy = require("giphy")("dc6zaTOxFJmzC");
var Identity = require('fake-identity');
var Markov = require("./markov");
var Flickr = require("flickrapi")

var flickrOptions = {
    api_key: "47f585c43e1ced1a1a3759da564fc143",
    secret: "a0a649c7f8b8fd28"
  };

var findPictures = null;

Flickr.tokenOnly(flickrOptions, function(error, flickr) {
  // we can now use "flickr" as our API object
  findPictures = function(callback) {
    flickr.photos.search({
      text: "spoon"
    }, function(err, result) {
      if(err) { return console.log(err); }
      var photos = result.photos.photo;
      var arr = [];
      for (var i = photos.length - 1; i >= 0; i--) {
        var photo = photos[i];
        var url = "https://farm" + photo["farm"] + ".staticflickr.com/" + photo["server"] + "/" + photo["id"] + "_" + photo["secret"] + ".jpg";
        arr.push(url);
      }
      callback(arr);
    });
  };
});


//Syntax:
//num:         Just a number
//t-num:       Number optionally preceded by "The"
//x-num:       Random number that the system doesn't care about
//sup-adj:     Superlative adjective
//adj:         Regular adjective
//subj:        plural noun
//noun:        plural noun not used as subject
//people:      plural noun describing a group of people (eg. "Children")
//p-subj:      same as people noun, but used instead of subj
//crazy:       adjectives expressing craziness
//
//Every template must contain [[subj]] or [[p-subj]]
//  and either [[num]] or [[t-num]]

var templates = [
  "The [[num]] [[sup-adj]] [[subj]] In The World",
  "The [[num]] [[sup-adj]] [[subj]] Of Last Summer",
  "The [[num]] [[sup-adj]] [[subj]] Of The 90's",
  "The [[num]] [[sup-adj]] [[subj]] Of The Last [[x-num]] Years",
  "The [[num]] [[sup-adj]] [[subj]] Of This Century",
  "The [[num]] [[sup-adj]] [[subj]] Only [[people]] Will Understand",
  "The [[num]] [[sup-adj]] [[subj]] That Will Make You Laugh Every Time",
  "The [[num]] [[sup-adj]] [[subj]] You Probably Didn't Know",
  "[[num]] [[noun]] For [[p-subj]] That Should Really Exist",
  "[[t-num]] Things [[p-subj]] Know To Be True",
  "[[t-num]] [[adj]] [[subj]] That Will Make You Ask \"Why?\"",
  "[[t-num]] [[adj]] [[subj]] You Probably Didn't Know",
  "[[t-num]] [[crazy]] Things [[p-subj]] Know To Be True",
  "[[t-num]] [[p-subj]] Who Are Too Clever For Their Own Good",
  "[[t-num]] [[p-subj]] Who Have Performed For [[people]]",
  "[[t-num]] [[p-subj]] Who Need To Be Banned From Celebrating Halloween",
  "[[t-num]] [[p-subj]] Who Will Make You Feel Like A Genius",
  "[[t-num]] [[p-subj]] Who Are Clearly Being Raised [[adj]]",
  "[[t-num]] [[p-subj]] Who Completely Screwed Up Their One Job",
  "[[t-num]] [[p-subj]] Who Are Having A Really Rough Day",
  "[[t-num]] [[subj]] That Scream World Domination",
  "[[num]] Times [[subj]] Are The Worst And You Just Can't Even",
  "[[num]] Things [[p-subj]] Should Be Allowed To Complain About",
  "[[num]] [[p-subj]] With Excellent New Year's Resolutions"
];



var dicts = {};
var minNum = 10;
var maxNum = 42;

function loadFile(key, file, callback){
  fs.readFile(file, 'utf8', function (err,data) {
    if (err) {
      return console.error(err);
    }
    dicts[key] = data.split("\n");
    callback();
  });
}

function loadData(){
  // Mmmm serial loading...
  loadFile("sup-adj", "wordlists/sup-adj.txt", function () {
    loadFile("adj", "wordlists/adj.txt", function () {
      loadFile("subj", "wordlists/nouns.txt", function () {
        loadFile("people", "wordlists/people-nouns.txt", function () {
          loadFile("crazy", "wordlists/crazy-adj.txt", function () {
            // callback(createEntireArticle);
          });
        });
      });
    });
  });
}
loadData();

function genFromTemplate(template){
  var match;
  var inner;
  var ret = {};
  while (!!(match = template.match(/\[\[[^\]]+]]/))){
    match = match[0];
    inner = match.substr(2, match.length-4);
    if (inner === "num"){
      ret.num = rand(minNum, maxNum);
      template = replaceMatch(template, match, ""+ret.num);
    } else if (inner === "t-num"){
      ret.num = rand(minNum, maxNum);
      template = replaceMatch(template, match, "The "+ret.num);
    } else if (inner === "x-num"){
      template = replaceMatch(template, match, ""+rand(minNum,maxNum));
    } else if (inner === "noun"){
      inner = "subj";
      var n = dicts[inner][rand(0,dicts[inner].length)];
      template = replaceMatch(template, match, n);
    } else if (inner === "subj"){
      ret.subj = dicts[inner][rand(0,dicts[inner].length)];
      template = replaceMatch(template, match, ret.subj);
    } else if (inner === "p-subj"){
      inner = "people";
      ret.subj = dicts[inner][rand(0,dicts[inner].length)];
      template = replaceMatch(template, match, ret.subj);
    } else {
      template = replaceMatch(template, match, dicts[inner][rand(0,dicts[inner].length)]);
    }
  }
  ret.title = template;
  return ret;
}

function generateArticleName(){
  var template = templates[rand(0,templates.length)];
  var ret = genFromTemplate(template);
  ret.articleName = encodeURIComponent(ret.title.toLowerCase().replace(/ /g, "-"));
  return ret;
}

function rand(min, max){
  return Math.floor(Math.random() * (max-min))+min;
}

function replaceMatch(fullString, match, substitute){
  var start = fullString.indexOf(match);
  var newStr = fullString.slice(0,start) + substitute +
        fullString.slice(start + match.length, fullString.length);
  return newStr;
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
  var article = generateArticleName();
  assignAuthor(article, author);

  article.url = "/users/" + article.username + "/" + article.articleName;
  article.responses = rand(10,600);
  article.elements = [];
  article.timestamp = Date.now();

  var m = new Markov();
  m.pretrainBuzzfeedLists();
  m.pretrainWikipediaSubject(article.subj, function() {

    findGifUrls(article.subj, function(gifs){
      if(gifs.data.length < article.num) {
        return createEntireArticle(author, callback);
      }
      article.previewUrl = gifs.data[0].images.original_still.url;
      for (var i = 0; i < article.num; i++){
        if (i < gifs.data.length){
          article.elements[i] = {};
          article.elements[i].imageUrl = gifs.data[i].images.original.url;
          article.elements[i].body = m.generate(rand(rand(0, 2),5),10);
          article.elements[i].title = m.generate(1,10);
        } else break;
      }
      callback(article, author);
    });

  });

}

module.exports = {
  createEntireArticle: createEntireArticle,
  newAuthor: newAuthor,
  findPictures: findPictures
};
