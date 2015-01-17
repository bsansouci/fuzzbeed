var express = require('express');
var app = express();
var swig = require('swig');
var Firebase = require("firebase");

var firebaseArticles = new Firebase("https://fuzzbeed.firebaseio.com/articles");
var firebaseProfiles = new Firebase("https://fuzzbeed.firebaseio.com/profiles");

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


app.param('username', function(req, res, next, username) {
  firebaseProfiles.child(username).once("value", function(snapshot) {
    var v = snapshot.val();
    if(v) {
      req.profile = v;
      firebaseArticles.orderByChild("username").equalTo(username).once("value", function(snapshot) {
        var vv = snapshot.val();
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
      console.error("HACKER");
      return;
    }
  });
});

app.param('articleName', function(req, res, next, articleName) {
  firebaseArticles.orderByChild("articleName").equalTo(articleName).once("value", function(snapshot) {
    var v = snapshot.val();
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

app.get('/', function (req, res) {
  firebaseArticles.orderByChild("timestamp").limitToFirst(10).once("value", function(snapshot) {
    var v = snapshot.val();
    for (var prop in v) {
      if(v.hasOwnProperty(prop)) {
        v[prop].timeAgo = timeAgo(v[prop].timestamp);
      }
    }
    res.render('index', {
      articles: v
    });
  });
});
app.get('/users/:username/:articleName', function(req, res) {
  console.log(req.article);
  res.render('article-view', req.article);
});

app.get('/users/:username', function(req, res) {
  res.render('profile-view', req.profile);
});

app.use(express.static(__dirname + "/views"));

app.listen(1337);
console.log('Application Started on http://localhost:1337/');


function generateArticle() {
  // firebaseArticles.push({
  //   elements: [{
  //     num: 1,
  //     title: "You should know that being quiet doesn’t mean we’re judging you.",
  //     imageUrl: "http://s3-ec.buzzfed.com/static/2015-01/16/13/imagebuzz/webdr03/anigif_optimized-3238-1421434742-18.gif",
  //     body: "I mean. Unless we are."
  //   }],
  //   username: "alexalvarez",
  //   title: "22 Confessions Shy People Will Never Tell You",
  //   subtitle: "*Converses with you in total silence.*",
  //   authorName: "Alex Alvarez",
  //   profileUrl: "/users/alexalvarez",
  //   authorProfilePicture: "/article-view_files/alexalvarez-3154-1405446917-2_large.jpg",
  //   timestamp: Date.now(),
  //   responses: Math.floor(Math.random() * 1000),
  //   previewUrl: "/BuzzFeed%20Buzz_files/22-confessions-shy-people-will-never-tell-you-2-11223-142146.jpg",
  //   articleName: "quietly-judging-all-of-you",
  //   url: "/users/alexalvarez/quietly-judging-all-of-you"
  // });
}

function generateProfile() {
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
}

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
