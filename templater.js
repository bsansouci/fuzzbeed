var fs = require('fs');
var async = require("async");
var Inflect = require('i')();


module.exports = function Templater (callback) {
  // SYNTAX:
  // Add s- to a key to make it the subject
  // Surround something with _ to add it to the extra search terms
  // Convention: plural things have plural keys
  // E.g. "cats" should be in "nouns"
  //      "cat" should be in "noun"
  // Every template should include an s- key.
  // OPTIONALS:
  // {{first|second|...}}
  // SPECIAL CASES:
  // num:        Just a number
  // tnum:       Number optionally preceded by "The"
  // xnum:       Random number that the system doesn't care about

  var templates = {};

  this.loadTestTitles = function(){
    templates = ["_Test_ [[s-noun]] _{{one option|two option}}_"];
  };

  this.loadBuzzTitles = function(){
    templates = [
      "The [[num]] [[sup-adj]] [[s-nouns]] In The World",
      "The [[num]] [[sup-adj]] [[s-nouns]] Of Last _Summer_",
      "The [[num]] [[sup-adj]] [[s-nouns]] Of The 90's",
      "The [[num]] [[sup-adj]] [[s-nouns]] Of The Last [[x-num]] Years",
      "The [[num]] [[sup-adj]] [[s-nouns]] Of This Century",
      "The [[num]] [[sup-adj]] [[s-nouns]] Only _[[people]]_ Will Understand",
      "The [[num]] [[sup-adj]] [[s-nouns]] That Will Make You Laugh Every Time",
      "The [[num]] [[sup-adj]] [[s-nouns]] You Probably Didn't Know",
      "[[num]] Things [[s-people]] Should Be Allowed To Complain About",
      "[[num]] Times [[s-nouns]] Are The Worst And You Just Can't Even",
      "[[num]] [[s-people]] With Excellent New Year's Resolutions",
      "[[num]] _[[people]]_ With [[crazy]] [[s-nouns]]",
      "[[num]] [[s-nouns]] For _[[people]]_ That Should Really Exist",
      "[[t-num]] Things [[s-people]] Know To Be True",
      "[[t-num]] [[adj]] [[s-nouns]] That Will Make You Ask \"Why?\"",
      "[[t-num]] [[adj]] [[s-nouns]] You Probably Didn't Know",
      "[[t-num]] [[crazy]] Things [[s-people]] Know To Be True",
      "[[t-num]] [[s-people]] Who Are Clearly Being Raised _[[adj]]_",
      "[[t-num]] [[s-people]] Who Are Having A Really Rough Day",
      "[[t-num]] [[s-people]] Who Are Too Clever For Their Own Good",
      "[[t-num]] [[s-people]] Who Completely Screwed Up Their One Job",
      "[[t-num]] [[s-people]] Who Have Performed For _[[people]]_",
      "[[t-num]] [[s-people]] Who Need To Be Banned From Celebrating _Halloween_",
      "[[t-num]] [[s-people]] Who Will Make You Feel Like A Genius",
      "[[t-num]] [[s-nouns]] That Scream _World Domination_",
      "[[t-num]] [[s-people]] You Must Do In Your [[age]] According To _[[famous-person]]_",
      "If [[s-tv-show-character]] Had Instagram",
      "[[t-num]] Times [[s-tv-show-character]] Summed Up You And Your BFF",
      "[[s-famous-person]] Receives A _[[noun]]_, Is Overcome With Joy",
      "[[t-num]] [[s-people]] You Actually Cannot Resist _Kissing_"
    ];
  };

  this.loadQuizTitles = function(){
    templates = [
      "What Character From [[s-showTitle]] Are You?",
      "Which [[s-showTitle]] Characters Are You?",
      "Which [[s-showTitle]] Character Is Your Soulmate?",
      "Which [[s-showTitle]] Character Is Your Kindred Spirit?"
    ];
  };



  this.loadQuizPhotoQuestions = function(){
    templates = [
      "What's Your Favorite [[s-noun]]?",
      "What's Your Dream [[s-noun]]?",
      "Which [[s-noun]] Resonates With You The Most?",
      "Pick A [[s-noun]]",
      "Which [[s-noun]] Is Most Attractive?",
      "Choose A [[s-noun]]",
      "What Type Of [[s-noun]] Really Puts You In The Mood",
      "Pick What Represents Your [[sup-adj]] [[s-noun]] The Best"
    ];
  };


  this.loadQuizNounQuestions = function(){
    templates = [
      "Which Of The Following Would You Rather Eat?",
      "Which Looks The Most Appetizing?",
      "Which One Is The [[sup-adj]] Of The Following?",
      "Which Seems Like It Would Feel The Best?",
      "Which Do You Value Most?",
      "Which Is [[sup-adj]]?",
      "Which Of The Following is Worth Your Life?",
      "Which Of These Do You Have The Most Of?",
      "Which Is The Best Aphrodisiac?",
      "Choose A Synonym For [[noun]]",
      "What's [[num]] + [[num]]?",
      "What Are Your Thoughts On [[s-noun]]?",
      "Is [[s-noun]] A Childhood Dream?",
    ];
  };

  this.loadQuizPeopleQuestions = function() {
    templates = [
      "Choose Your Future Career",
      "Who Do You Hate The Most?",
      "Pick The [[sup-adj]] Co-Worker",
      "Who Would You Rather [[verb]]?",
      "Who's The [[sup-adj]]?",
      "What's Your Drunk Alter Ego?",
      "What's [[s-tv-show-character]]'s Real Job?"
    ];
  };

  this.loadQuizYesNoQuestions = function() {
    templates = [
      "Do You Usually [[verb]] [[s-noun]] In The Morning?",
      "Do You Hate [[s-people]]?",
      "Is [[s-noun]] Your Favorite Food",
      "Would You Ever Eat [[s-nouns]]",
      "Is [[s-famous-person]] Actually [[adj]]"
    ];
  };

  this.getRand = function(key) {
    return dicts[key][rand(0,dicts[key].length)];
  };

  var dicts = {};
  var minNum = 7;
  var maxNum = 30;

  function loadFile(key, file, callback){
    fs.readFile(file, 'utf8', function (err,data) {
      if (err) {
        return console.error(err);
      }
      dicts[key] = data.replace(/\r/g, "").split("\n");
      callback();
    });
  }

  this.loadKey = function(key, list){
    dicts[key] = list;
  };

  var __listsToLoad = [
    ["sup-adj", "wordlists/sup-adj.txt"],
    ["adj", "wordlists/adj.txt"],
    ["nouns", "wordlists/nouns.txt"],
    ["noun", "wordlists/noun.txt"],
    ["people", "wordlists/people.txt"],
    ["crazy", "wordlists/crazy.txt"],
    ["verb", "wordlists/verb.txt"],
    ["famous-person", "wordlists/famous-person.txt"],
    ["tv-show-character", "wordlists/tv-show-character.txt"],
    ["age", "wordlists/age.txt"],
  ];

  async.mapLimit(__listsToLoad, 5, function(arr, callback) {
    loadFile(arr[0], arr[1], callback);
  }, function(err) {
    if(err) return console.error(err);
    if(callback) callback();
  });

  function genFromTemplate(template){
    var match;
    var inner;
    var ret = {};
    ret.num = rand(minNum, maxNum);
    ret.extra = [];
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
      } else  if (inner.indexOf("s-") === 0){
        inner = inner.substring(2,inner.length);
        ret.subj = dicts[inner][rand(0,dicts[inner].length)];
        template = replaceMatch(template, match, ret.subj);
      } else if (inner.indexOf("x-") === 0){
        inner = inner.substring(2,inner.length);
        var repl = dicts[inner][rand(0,dicts[inner].length)];
        ret.extra.push(repl);
        template = replaceMatch(template, match, repl);
      } else {
        console.log(inner);
        var repl2 = dicts[inner][rand(0,dicts[inner].length)];
        template = replaceMatch(template, match, repl2);
      }
    }

    while (!!(match = template.match(/{{[^}]+}}/))){
      match = match[0];
      inner = match.substr(2, match.length-4);
      var opts = inner.split("|");
      template = replaceMatch(template, match, opts[rand(0,opts.length)]);
    }

    while (!!(match = template.match(/_[^_]+_/))){
      match = match[0];
      inner = match.substr(1, match.length-2);
      ret.extra.push(inner);
      template = replaceMatch(template, match, inner);
    }

    ret.title = template;
    return ret;
  }

  this.generateName = function(){
    var template = templates[rand(0,templates.length)];
    var ret = genFromTemplate(template);
    ret.articleName = ret.title.toLowerCase().replace(/ /g, "-").replace(/[\"\'\?]/g, "");
    return ret;
  };

  function rand(min, max){
    return Math.floor(Math.random() * (max-min))+min;
  }

  function replaceMatch(fullString, match, substitute){
    var start = fullString.indexOf(match);
    var newStr = fullString.slice(0,start) + substitute +
          fullString.slice(start + match.length, fullString.length);
    return newStr;
  }
};

// var Templater = require("./templater");
// var temp = new Templater(function () {
//   console.log("loaded");
//   temp.loadTestTitles();
//   temp.loadBuzzTitles();
//   for (var i = 0; i < 100; i++){
//     console.log(temp.generateName());
//   }
// });
