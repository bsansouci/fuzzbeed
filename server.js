var express = require('express');
var app = express();
var swig = require('swig');
var Firebase = require("firebase");
var Identity = require('fake-identity');
var articleGenerator = require("./article");
var quizGenerator = require("./quiz");
var Templater = require("./templater");
var Flickr = require("flickrapi");
var seed = require("seed-random");

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

var firebaseArticles = new Firebase("https://fuzzbeed.firebaseio.com/articles");
var firebaseProfiles = new Firebase("https://fuzzbeed.firebaseio.com/profiles");
var firebaseQuizzes = new Firebase("https://fuzzbeed.firebaseio.com/quizzes");

// This is where all the magic happens!
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// Swig will cache templates for you, but you can disable
// that and use Express's caching instead, if you like:
app.set('view cache', false);
// To disable Swig's cache, do the following:
swig.setDefaults({ cache: false });
// NOTE: You should always cache templates in a production environment.
// Don't leave both of these to `false` in production!

var templater = new Templater();

app.param('username', function(req, res, next, username) {
  firebaseProfiles.child(username).once("value", function(snapshot) {
    var v = snapshot.val();
    if(v) {
      req.profile = v;
      firebaseArticles.orderByChild("username").equalTo(username).once("value", function(snapshot) {
        var vv = snapshot.val();
        if(!vv) return next();

        for (var prop in vv) {
          if(vv.hasOwnProperty(prop)) {
            vv[prop].timeAgo = timeAgo(vv[prop].timestamp);
          }
        }
        req.profile.articles = vv;
        req.profile.numArticles = Object.keys(vv).length;
        next();
      });
    } else {
      var obj = {};
      injectSideStuff(obj, firebaseArticles, function() {
        res.render('404', obj);
      });
      return;
    }
  });
});

app.param('articleName', function(req, res, next, articleName) {
  firebaseArticles.orderByChild("articleName").equalTo(articleName).once("value", function(snapshot) {
    var v = snapshot.val();
    if(!v) return next();

    for (var prop in v) {
      if(v.hasOwnProperty(prop)) {
        req.article = v[prop];
        req.article.timestamp = new Date(req.article.timestamp).toGMTString();
        next();
        return;
      }
    }
  });
});

app.param('quizzName', function(req, res, next, articleName) {
  firebaseQuizzes.orderByChild("articleName").equalTo(articleName).once("value", function(snapshot) {
    var v = snapshot.val();
    if(!v) return next();

    for (var prop in v) {
      if(v.hasOwnProperty(prop)) {
        req.quiz = v[prop];
        req.quiz.timestamp = new Date(req.quiz.timestamp).toGMTString();
        req.quiz.result = req.quiz.possibleResults[rand(0, req.quiz.possibleResults.length)];
        next();
        return;
      }
    }
  });
});

function checkIfLoaded(req, res, next) {
  if(!findPictures) {
    res.send("<html><title>Pushing code...</title><body><h1>Down for a sec...</h1></body></html>");
    return;
  }
  next();
}

app.use(checkIfLoaded);

app.get('/', function (req, res) {
  firebaseArticles.limitToLast(20).once("value", function(snapshot) {
    var v = snapshot.val();
    var arr = [];
    for (var prop in v) {
      if(v.hasOwnProperty(prop)) {
        v[prop].timeAgo = timeAgo(v[prop].timestamp);
        arr.push(v[prop]);
      }
    }
    arr.sort(function(a, b) {
      return b.timestamp - a.timestamp;
    });
    var obj = {
      articles: arr
    };
    injectSideStuff(obj, firebaseArticles, function() {
      obj.topBuzz = obj.__sideArticles.pop();
      res.render('index', obj);
    });
  });
});

app.get('/quizzes', function(req, res) {
  firebaseQuizzes.orderByChild("timestamp").limitToFirst(10).once("value", function(snapshot) {
    var v = snapshot.val();
    for (var prop in v) {
      if(v.hasOwnProperty(prop)) {
        v[prop].timeAgo = timeAgo(v[prop].timestamp);
      }
    }
    var obj = {
      articles: v
    };
    injectSideStuff(obj, firebaseQuizzes, function() {
      res.render('quizzes-view', obj);
    });
  });
});

app.get('/quizzes/:quizzName', function(req, res) {
  if(!req.quiz) {
    var obj = {};
    injectSideStuff(obj, firebaseQuizzes, function() {
      res.render('404', obj);
    });
    return;
  }
  injectSideStuff(req.quiz, firebaseQuizzes, function() {
    res.render('article-view', req.quiz);
  });
});

app.get('/users/:username/:articleName', function(req, res) {
  if(!req.article) {
    var obj = {};
    injectSideStuff(obj, firebaseArticles, function() {
      res.render('404', obj);
    });
    return;
  }
  injectSideStuff(req.article, firebaseArticles, function() {
    res.render('article-view', req.article);
  });
});

app.get('/users/:username', function(req, res) {
  if(!req.profile) {
    var obj = {};
    injectSideStuff(obj, firebaseArticles, function() {
      res.render('404', obj);
    });
    return;
  }

  injectSideStuff(req.profile, firebaseArticles, function() {
    res.render('profile-view', addAwards(req.profile));
  });
});

app.get('/write-article', function(req, res) {
  res.render('write-article-view', {});
});

app.get('/write-an-article', function(req, res) {
  // 50% chances of creating a new person
  if(rand(0, 100) > 50) {
    var author = newAuthor();
    articleGenerator.createEntireArticle(author, templater, function(article) {
      pushProfile(author, function() {
        firebaseArticles.push(article, function() {
          res.redirect(article.url);
        });
      });
    });
  } else {
    firebaseProfiles.once("value", function(snapshot) {
      var v = snapshot.val();
      // If there are no authors
      if(!v) {
        var author = newAuthor();
        articleGenerator.createEntireArticle(author, templater, function(article) {
          pushProfile(author, function() {
            firebaseArticles.push(article, function() {
              res.redirect(article.url);
            });
          });
        });
        return;
      }
      var allKeys = Object.keys(v);
      var author = v[allKeys[rand(0, allKeys.length)]];
      articleGenerator.createEntireArticle(author, templater, function(article) {
        firebaseArticles.push(article, function() {
          res.redirect(article.url);
        });
      });
    });
  }
});

app.get('/write-a-quiz', function(req, res) {
  // 50% chances of creating a new person
  if(rand(0, 100) > 50) {
    var author = newAuthor();
    quizGenerator.create(author, templater, function(article) {
      pushProfile(author, function() {
        firebaseQuizzes.push(article, function() {
          res.redirect(article.url);
        });
      });
    });
  } else {
    firebaseProfiles.once("value", function(snapshot) {
      var v = snapshot.val();
      var allKeys = Object.keys(v);
      var author = v[allKeys[rand(0, allKeys.length)]];
      quizGenerator.create(author, templater, function(article) {
        firebaseQuizzes.push(article, function() {
          res.redirect(article.url);
        });
      });
    });
  }
});

app.use(express.static(__dirname + "/views"));

app.use(function(req, res, next) {
  var obj = {};
  injectSideStuff(obj, firebaseArticles, function() {
    res.render('404', obj);
  });
});

app.listen(process.env.PORT || parseInt(process.argv[2]));
console.log("Application Started on http://localhost:"+(process.env.port || parseInt(process.argv[2]))+"/");


function pushProfile(author, callback) {
  var obj = {};
  obj[author.username] = author;
  firebaseProfiles.update(obj, callback);
}

function shuffle(o, func){
  if(!func) func = Math.random;

  for(var j, x, i = o.length; i; j = Math.floor(func() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
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

var allAwards = ["/assets/classic_002.png", "/assets/post_wtf.png", "/assets/fail_002.png", "/assets/posts_silver.png", "/assets/collection.png", "/assets/reactions_bronze.png", "/assets/post_lol_bronze.png", "/assets/referrer_reddit_silver.png"];
function addAwards(profile) {
  profile.__awards = shuffle(allAwards, seed(profile.username)).slice(0, rand(2, allAwards.length));
  return profile;
}

function injectSideStuff(obj, db, callback) {
  if(!obj) return console.error("injectSideStuff obj was null");

  db.once("value", function(snapshot) {
    var v = snapshot.val();
    if(!v) {
      obj.__sideArticles = [];
      return callback();
    }

    var arr = [];
    var allKeys = Object.keys(v);
    var length = Object.keys(v).length >= 9 ? 9 : Object.keys(v).length;
    for (var i = 0; i < length; i++) {
      var r = rand(0, Object.keys(v).length);
      arr.push(v[Object.keys(v)[r]]);
      delete v[Object.keys(v)[r]];
    }
    obj.topBuzz = arr.pop();
    obj.__sideArticles = arr;
    callback();
  });
}

function rand(min, max){
  return Math.floor(Math.random() * (max-min))+min;
}

// firebaseQuizzes.orderByChild("articleName").equalTo("hey").once("value", function(snapshot) {
//   var v = snapshot.val();
//   v = v[Object.keys(v)[0]];
//   v.elements[1] = JSON.parse(JSON.stringify(v.elements[0]));
//   v.elements[1].possibleAnswers[0].text = "blablab words are important";
//   firebaseQuizzes.push(v);
// });

function newAuthor(){
  var id = Identity.generate();
  var author = {};
  author.name = id.firstName + " " + id.lastName;
  author.username= id.firstName.toLowerCase() + id.lastName.toLowerCase();
  author.email = id.firstName.toLowerCase()+[".","","-","_"][rand(0,3)]+id.lastName.toLowerCase() + "@" +
    ["hotmail.com","gmail.com","fuzzbeed.com","yahoo.com","live.com","outlook.com"][rand(0,5)];
  author.profileUrl = "/users/" + author.username;
  author.authorTitle = Math.random() > 0.5 ? "FuzzBeed Staff" : "FuzzBeed News Reporter";
  author.authorProfilePicture = "/assets/userpics/" +
    ((stringToIntHash(author.username)%274) + 1) + ".jpg";
  var randomBannerSearchText = templater.getRand('subj');
  findPictures(randomBannerSearchText, function(photos) {
    author.bannerPhoto = photos[rand(0, photos.length)];
  });
  return author;
}


// firebaseQuizzes.push({
//   elements: [{
//     title: "What do you usually do at parties?",
//     imageUrl: "http://s3-ec.buzzfed.com/static/2015-01/16/13/imagebuzz/webdr03/anigif_optimized-3238-1421434742-18.gif",
//     possibleAnswers: [{
//         text: "------",
//         url: "http://s3-ak.buzzfeed.com/static/2015-01/16/17/enhanced/webdr12/enhanced-buzz-23510-1421448289-3.jpg"
//       },{
//         text: "--------",
//         url: "http://s3-ak.buzzfeed.com/static/2015-01/16/17/enhanced/webdr06/enhanced-buzz-23520-1421448297-0.jpg"
//       },{
//         text: "----------",
//         url: "http://s3-ak.buzzfeed.com/static/2015-01/16/17/enhanced/webdr06/enhanced-buzz-23523-1421448306-0.jpg"
//       },{
//         text: "------------",
//         url: "http://s3-ak.buzzfeed.com/static/2015-01/16/17/enhanced/webdr06/enhanced-buzz-24219-1421448323-0.jpg"
//       },{
//         text: "--------------",
//         url: "http://s3-ak.buzzfeed.com/static/2015-01/16/17/enhanced/webdr10/enhanced-buzz-6635-1421448333-0.jpg"
//       },{
//         text: "-----------------",
//         url: "http://s3-ak.buzzfeed.com/static/2015-01/16/17/enhanced/webdr07/enhanced-buzz-1607-1421448344-0.jpg"
//       }
//     ],
//     body: "I mean. Unless we are."
//   }],
//   possibleResults: [{
//     title: "title1",
//     body: "body1",
//     randomWord: "penis"
//   }],
//   isQuiz: true,
//   questionType: "openEnded",
//   username: "alexalvarez",
//   title: "khlja;kfh fas;kj asdsa?",
//   subtitle: "*Bob*",
//   authorName: "Alex Alvarez",
//   profileUrl: "/users/alexalvarez",
//   authorProfilePicture: "/article-view_files/alexalvarez-3154-1405446917-2_large.jpg",
//   timestamp: Date.now(),
//   responses: Math.floor(Math.random() * 1000),
//   previewUrl: "/BuzzFeed%20Buzz_files/22-confessions-shy-people-will-never-tell-you-2-11223-142146.jpg",
//   articleName: "quietly-judging-all-of-you",
//   url: "/users/alexalvarez/quietly-judging-all-of-you"
// });



// var profile1 = {
//   authorName: "Alex Alvarez",
//   authorDescription: "LOL but also WTF. Send pitches, tips, chisme, and Pitbull/Alex genderswap fanfic to alex.alvarez@buzzfeed.com.",
//   authorEmail: "alex.alvarez@buzzfeed.com",
//   profileUrl: "/users/alexalvarez",
//   username: "alexalvarez"
// };
// var obj = {};
// obj[profile1.username] = profile1;
// firebaseProfiles.update(obj);

function timeAgo(time){
  var units = [
    { name: "second", limit: 60, in_seconds: 1 },
    { name: "minute", limit: 3600, in_seconds: 60 },
    { name: "hour", limit: 86400, in_seconds: 3600  },
    { name: "day", limit: 604800, in_seconds: 86400 },
    { name: "week", limit: 2629743, in_seconds: 604800  },
    { name: "month", limit: 31556926, in_seconds: 2629743 },
    { name: "year", limit: null, in_seconds: 31556926 }
  ];
  var diff = (new Date() - new Date(time)) / 1000;
  if (diff < 5) return "now";

  var i = 0;
  while (unit = units[i++]) {
    if (diff < unit.limit || !unit.limit){
      var diff2 =  Math.floor(diff / unit.in_seconds);
      return diff2 + " " + unit.name + (diff2>1 ? "s" : "") + " ago";
    }
  }
}
