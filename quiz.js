var cheerio = require('cheerio');
var request = require('request');
var Templater = require('./templater');
var Flickr = require("flickrapi");

var flickrOptions = {
    api_key: "47f585c43e1ced1a1a3759da564fc143",
    secret: "a0a649c7f8b8fd28"
  };

var findPictures = null;
var maxPhotos = 7;

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

function getQuizPhotos(subject, callback) {
  findPictures(subject, function(photos) {
    if (photos.length > maxPhotos) {
      photos = photos.slice(0, maxPhotos);
    }
    callback(photos);
  });
}

function assignAuthor(quiz, author){
  quiz.username = author.username;
  quiz.authorName = author.name;
  quiz.profileUrl = "/users/" + quiz.username;
  quiz.authorProfilePicture = author.authorProfilePicture;
}

function rand(min, max){
return Math.floor(Math.random() * (max-min))+min;
}



module.exports = function QuizCreator () {




	var scrapeImdb = function(callback) {
		request('http://www.imdb.com/search/title?num_votes=5000,&sort=user_rating,desc&title_type=tv_series', function(err, res, html) {
    	if (err) return console.log(err);

    	var $ = cheerio.load(html);
    	var titles = $('.title a');
    	var links = [];
    	var coverPhotoUrl;


    	for (var i = 0; i < titles.length; i++) {
    		links.push({url: $(titles.get(i)).attr("href"), title: $(titles.get(i)).text().trim()});
    	}
    	links = links.filter(function(el) {
    		return el.url.indexOf("/title/") !== -1 && el.url.indexOf("/vote?v") === -1;
    	});

		var show = links[Math.floor((Math.random() * links.length))];
		request('http://imdb.com' + show.url, function (err, res, html) {
			var $ = cheerio.load(html);
			var characters = $('.character a');
			var links = [];
			var returnLinks = [];
			var showCover = $('.image a');

			console.log("Show cover", $(showCover).attr("href"));
			request('http://imdb.com' + $(showCover).attr("href"), function (err, res, html) {
				var $ = cheerio.load(html);
				coverPhotoUrl = $('#primary-img').attr("src");
			});


			for (var i = 0; i < characters.length; i++) {
				if ($(characters.get(i)).attr("href"))
					links.push({url: $(characters.get(i)).attr("href"), name: $(characters.get(i)).text().trim()});
			};

		//	console.log(links);

			var index = 0;
			function getImage(callback){
				if (index < links.length){
					request('http://imdb.com' + links[index].url, function (err, res, html) {
						var $ = cheerio.load(html);
						var photos = $("a[name='headshot']");

//						console.log(links[index].name + ": " + $(photos).attr("href"));
						if ($(photos).attr("href")) {
							request('http://imdb.com' + $(photos).attr("href"), function (err, res, html) {
								var $ = cheerio.load(html);
								var photo = $('#primary-img');
//								console.log("index: ", index, " list length: ", links.length);
								links[index].src = photo.attr('src');
								returnLinks.push(links[index]);
								index++;
								getImage(callback);
							});
						} else {
							index++;
							getImage(callback);
						}
					});
				} else {
					callback({title: show.title, coverPhoto: coverPhotoUrl, links: returnLinks});
				}
			}
			getImage(callback);

			// for (var j = 0; j < links.length; j++) {
			// 	request('http://imdb.com' + links[j].url, function (err, res, html) {
			// 		var $ = cheerio.load(html);
			// 		var photos = $("a[name='headshot']");
			// 		console.log(links[j].name + ": " + $(photos.first()).attr("href"));
			// 	});
			// }

			//callback({showTitle: show.title, characters:})

		});
		});

	}

	this.create = function(callback) {
		var templater = new Templater();
		scrapeImdb(function(imdb) {

			var quiz = {};
			quiz.title = generateQuizTitle(imdb.title, templater);
			quiz.articleName = quiz.title.toLowerCase().replace("\"", "").replace(" ", "-");
			quiz.isQuiz = true;
			quiz.possibleResults = [];
			for (var i = 0; i < imdb.links.length; i++) {
				quiz.possibleResults.push({imageUrl: imdb.links[i].url, title: "You Got "+imdb.links[i].name+"!", body: "body"}) // TODO generate body for this
			}
			quiz.previewUrl = imdb.coverPhoto;

			quiz.elements = [];
			var max = rand(5, 10);
			for (var i = 0; i < rand(5, 10); i++) {
				generatePhotoQuestion(templater, function(q){
					quiz.elements.push(q);
					if(max <= quiz.elements.length) {
						quiz.responses = rand(10, 800);
						quiz.subtitle = "";
						quiz.timestamp = Date.now();
						quiz.url = "/quizzes/" + quiz.articleName;
						return callback(quiz);
					}
				});
			}
		});
	}

	var generatePhotoQuestion = function(templater, callback) {
		var question = {};
		templater.loadQuizQuestions();
  		question.questionType = "openEnded";
  		var nameObj = templater.generateName();
  		getQuizPhotos(nameObj.subj, function(quizPhotos) {
  			console.log(quizPhotos);
	  		question.imageUrl = quizPhotos.pop();
	  		question.possibleAnswers = quizPhotos.map(function(obj) {return {url: obj}});
	  		question.title = nameObj.title;
	  		callback(question);
  		});
  	}

	var generateQuizTitle = function(showTitle, templater) {
		templater.loadQuizTitles();
		templater.loadKey("showTitle", [showTitle]);
		return templater.generateName().title;
	}
}

var QuizCreator = require('./quiz');


// var q = new QuizCreator();
// q.create();


