var fs = require('fs');
var giphy = require("giphy")("dc6zaTOxFJmzC");


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
];



var dicts = {};
var minNum = 10;
var maxNum = 42;

function loadData(callback){
  // Mmmm serial loading...
  loadFile("sup-adj", "wordlists/sup-adj.txt", function () {
    loadFile("adj", "wordlists/adj.txt", function () {
      loadFile("subj", "wordlists/nouns.txt", function () {
        loadFile("people", "wordlists/people-nouns.txt", function () {
          loadFile("crazy", "wordlists/crazy-adj.txt", function () {
            callback();
          });
        });
      });
    });
  });
}

function loadFile(key, file, callback){
  fs.readFile(file, 'utf8', function (err,data) {
    if (err) {
      return console.error(err);
    }
    dicts[key] = data.split("\n");
    callback();
  });
}

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
    for (var i = 0; i < response.data.length; i++){
      ret.push(response.data[i].embed_url);
    }
    callback(ret);
  });
}

function assignAuthor(article){
  article.username = "alexalvares";
  article.authorName = "Alex Alvarez";
  article.profileUrl = "/users/" + article.username;
  article.authorProfilePicture = "/assets/" +
    ((stringToIntHash(article.username)%274) + 1) + ".jpg";
}

function stringToIntHash(str){
  var hash = 0;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    char = str.charCodeAt(i);
    hash = ((hash<<5)-hash)+char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

/////////////////////////////////////
// Entry point to Article Creation //
/////////////////////////////////////
function createEntireArticle(callback){
  var article = generateArticleName();
  assignAuthor(article);
  article.url = "/users/" + article.username + "/" + article.articleName;
  article.responses = rand(10,600); 
  article.elements = [];

  findGifUrls(article.subj, function(gifs){
    for (var i = 0; i < article.num; i++){
      if (i < gifs.length){
        article.elements[i] = {};
        article.elements[i].imageUrl = gifs[i];
        article.elements[i].body = "Default item body.";
        article.elements[i].title = "Default Item Title";
      } else break;
    }
    callback(article);
  });
}

//// Test function
loadData(function () {
  var f = function (article) {console.log(article);};
  for (var i = 0; i < 5; i++){
    createEntireArticle(f);
  }
});
