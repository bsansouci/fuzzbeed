var express = require('express'),
  app = express(),
  swig = require('swig'),
  people;

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
  // typically we might sanity check that user_id is of the right format
  // UserDatabase.find(user_id, function(err, user) {
  //   if (err) return next(err);
  //   if (!user) return next(...create a 404 error...);

  //   req.user = user;
  //   next()
  // });
  console.log("username", username);
  req.username = username;
  next();
});

app.param('articleName', function(req, res, next, articleName) {
  console.log("articleName", articleName);
  req.articleName = articleName;
  next();
});

var articles = [{
  title: "22 Confessions Shy People Will Never Tell You",
  weird: "*Converses with you in total silence.*",
  authorName: "Alex Alvarez",
  username: "alexalvarez",
  userPage: "users/alexalvarez",
  timestamp: timeAgo(Date.now()),
  responses: "66 responses",
  previewUrl: "/BuzzFeed%20Buzz_files/22-confessions-shy-people-will-never-tell-you-2-11223-142146.jpg",
  link: "/users/alexalvarez/quietly-judging-all-of-you"
}];

app.get('/', function (req, res) {
  res.render('index', {
    articles: articles
  });
});


var article1 = [{
  num: 1,
  title: "You should know that being quiet doesn’t mean we’re judging you.",
  imageUrl: "http://s3-ec.buzzfed.com/static/2015-01/16/13/imagebuzz/webdr03/anigif_optimized-3238-1421434742-18.gif",
  body: "I mean. Unless we are."
}];
app.get('/users/:username/:articleName', function(req, res) {
  console.log(req.params);
  res.render('article-view', {
    elements: article1
  });
});

app.get('/users/:username', function(req, res) {
  console.log(req.params, req.username);
  res.render('index', {
    articles: articles
  });
});

app.use(express.static(__dirname + "/views"));

app.listen(1337);
console.log('Application Started on http://localhost:1337/');

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
      return diff2 + " " + unit.name + (diff2>1 ? "s" : "");
    }
  }
}