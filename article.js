var fs = require('fs');
var giphy = new require("giphy")("dc6zaTOxFJmzC");
var Markov = require("./markov");
var quizCreator = require("./quiz");
var Templater = require("./templater");
var async = require("async");
var zip = require("lodash.zip");
var flatten = require("lodash.flatten");
var findPictures = require("./flickr.js");

/**
 * Will find gifs from Giphy given search tags.
 * allWords: [String]  a list of all the keywords to search for seperately
 * callback: () => ()  a callback
 *
 * This will also filter out the duplicates.
 *
 * callback := [{data: [...]}, ...]
 * (look at the return type of giphy here: https://github.com/giphy/GiphyAPI)
 */
function findGifUrls(allWords, callback){
  async.mapLimit(allWords, 5, function(str, cb) {
    giphy.search({q:str}, function (err, response){
      if (err) return cb(err);
      // Filter for duplicates (simple filter using the URL of the gif)
      response.data = response.data.filter(function(v, i) {
        return response.data.indexOf(v) === i;
      });
      cb(null, response.data);
    });
  }, function(err, allData) {
    if (err) return console.error("Giphy: ", err);
    if(allData.length === 1) return callback(allData[0]);
    var ret = allData = flatten(zip.apply(null, allData)).filter(function(v) {
      return !!v;
    });
    callback(ret);
  });
}

function assignAuthor(article, author){
  article.username = author.username;
  article.authorName = author.name;
  article.profileUrl = "/users/" + article.username;
  article.authorProfilePicture = author.authorProfilePicture;
  article.authorTitle = author.authorTitle;
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
function createEntireArticle(author, templater, callback){
  if(typeof author === "function") {
    callback = author;
    author = newAuthor();
  }

  templater.loadBuzzTitles();
  var article = templater.generateName();
  assignAuthor(article, author);

  article.url = "/users/" + article.username + "/" + article.articleName;
  article.responses = rand(10,600);
  article.elements = [];
  article.timestamp = Date.now();

  var m = new Markov();
  m.pretrainBuzzfeedLists();
  m.pretrainWikipediaSubject(article, function() {
    var searchWords = [article.subj];
    if(article.extra.length > 0) {
      searchWords = searchWords.concat(article.extra.map(function(v) {
        return article.subj + ' ' + v;
      })).concat(article.extra.map(function(v) {
        return v;
      }));
    }
    findGifUrls(searchWords, function(gifs) {
      if(gifs.length > 0) article.previewUrl = gifs[0].images.original_still.url;

      // TODO: find a smarter way to sort the gifs
      // right now the order depends on the which get request arrives first
      // when querying all the searchWords in parallel
      shuffle(gifs);

      var arr = [];
      var i;
      if(gifs.length < article.num) {
        for (i = 0; i < gifs.length; i++) {
          arr.push({
            imageUrl: gifs[i].images.original.url,
            body: m.generate(rand(rand(0, 2),5),10, 2),
            title: m.generate(1,10, 3)
          });
        }
        findPictures(searchWords, function(allPics) {
          var diffPictures = allPics.slice(0, article.num - gifs.length);
          if(!article.previewUrl) article.previewUrl = diffPictures[0];

          for (i = 0; i < diffPictures.length; i++) {
            arr.push({
              imageUrl: diffPictures[i],
              body: m.generate(rand(rand(rand(0, 2), 3),7),10, 5),
              title: m.generate(1,10, 3)
            });
          }
          shuffle(arr);
          article.elements = arr;
          callback(article);
        });
      } else {
        for (i = 0; i < article.num; i++){
          if (i < gifs.length){
            arr.push({
              imageUrl: gifs[i].images.original.url,
              body: m.generate(rand(rand(0, 2),5),10, 2),
              title: m.generate(1,10, 3)
            });
          } else break;
        }
        shuffle(arr);
        article.elements = arr;
        callback(article);
      }
    });
  });
}

function identity(v) {
  return v;
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

function rand(min, max){
  return Math.floor(Math.random() * (max-min))+min;
}

/**
 * Shuffles a given given inplace.
 * @param  {[a']} coll    array to be shuffled
 * @return {[a']}      shuffled array
 */
function shuffle(coll){
  for(var j, x, i = coll.length; i; j = Math.floor(Math.random() * i), x = coll[--i], coll[i] = coll[j], coll[j] = x);
  return coll;
}

module.exports = {
  createEntireArticle: createEntireArticle,
  findPictures: findPictures
};
