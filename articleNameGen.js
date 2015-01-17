fs = require('fs');


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
//Every template must contain [[subj]] or [[p-subj]]and either [[num]] or [[t-num]]

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
  "[[t-num]] [[subj]] That Scream World Domination",
  "[[t-num]] [[subj]] Who Are Clearly Being Raised [[adj]]",
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
 // template = templates[0];
  var ret = genFromTemplate(template);
  ret.url = encodeURIComponent(ret.title.toLowerCase().replace(/ /g, "-"));
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


loadData(function () {
  for (var i = 0; i < 5; i++){
    console.log(generateArticleName());
  }
});
