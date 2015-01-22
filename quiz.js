var cheerio = require('cheerio');
var request = require('request');
var Templater = require('./templater');
var Markov = require('./markov');
var Flickr = require("flickrapi");
var fs = require("fs");

var flickrOptions = {
    api_key: "47f585c43e1ced1a1a3759da564fc143",
    secret: "a0a649c7f8b8fd28"
  };

var findPictures = null;
var maxPhotos = 7;
var allShows = JSON.parse(fs.readFileSync("allShows.json", 'utf8')).data;
Flickr.tokenOnly(flickrOptions, function(error, flickr) {
  // we can now use "flickr" as our API object
  findPictures = function(text, callback) {
    flickr.photos.search({
      text: text
    }, function(err, result) {
      if(err) return console.error(err);

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
  quiz.authorTitle = author.authorTitle;
}

function rand(min, max){
return Math.floor(Math.random() * (max-min))+min;
}



module.exports = new function () {
	// var scrapeImdb = function(callback) {
	// 	request('http://www.imdb.com/search/title?num_votes=5000,&sort=user_rating,desc&title_type=tv_series', function(err, res, html) {
 //    	if (err) return console.log(err);

 //    	var $ = cheerio.load(html);
 //    	var titles = $('.title a');
 //    	var links = [];
 //    	var coverPhotoUrl;


 //    	for (var i = 0; i < titles.length; i++) {
 //    		links.push({url: $(titles.get(i)).attr("href"), title: $(titles.get(i)).text().trim()});
 //    	}
 //    	links = links.filter(function(el) {
 //    		return el.url.indexOf("/title/") !== -1 && el.url.indexOf("/vote?v") === -1;
 //    	});

	// 		var show = links[Math.floor((Math.random() * links.length))];
	// 		request('http://imdb.com' + show.url, function (err, res, html) {
	// 			var $ = cheerio.load(html);
	// 			var characters = $('.character a');
	// 			var links = [];
	// 			var returnLinks = [];
	// 			var showCover = $('.image a');

	// 			// showCover.filter(function(el) { el. });
	// 			console.log("Show cover", $(showCover).attr("href"));
	// 			request('http://imdb.com' + $(showCover).attr("href"), function (err, res, html) {
	// 				var temp = cheerio.load(html); // crashed here, "Cannot read property 'parent' of undefined" with http://www.imdb.com/list/ls073461000/?ref_=tt_tt_edw_OscarNom_i_1#1
	// 				coverPhotoUrl = temp('#primary-img').attr("src");

	// 				for (var i = 0; i < characters.length; i++) {
	// 					if ($(characters.get(i)).attr("href"))
	// 						links.push({url: $(characters.get(i)).attr("href"), name: $(characters.get(i)).text().trim()});
	// 				}

	// 			//	console.log(links);

	// 				var index = 0;
	// 				function getImage(callback){
	// 					if (index < links.length) {
	// 						request('http://imdb.com' + links[index].url, function (err, res, html) {
	// 							var $ = cheerio.load(html);
	// 							var photos = $("a[name='headshot']");
	// 							if ($(photos).attr("href")) {
	// 								request('http://imdb.com' + $(photos).attr("href"), function (err, res, html) {
	// 									var $ = cheerio.load(html);
	// 									var photo = $('#primary-img');
	// 									links[index].src = photo.attr('src');
	// 									returnLinks.push(links[index]);
	// 									index++;
	// 									getImage(callback);
	// 								});
	// 							} else {
	// 								index++;
	// 								getImage(callback);
	// 							}
	// 						});
	// 					} else {
	// 						callback({title: show.title, coverPhoto: coverPhotoUrl, links: returnLinks});
	// 					}
	// 				}
	// 				getImage(callback);
	// 			});



				// for (var j = 0; j < links.length; j++) {
				// 	request('http://imdb.com' + links[j].url, function (err, res, html) {
				// 		var $ = cheerio.load(html);
				// 		var photos = $("a[name='headshot']");
				// 		console.log(links[j].name + ": " + $(photos.first()).attr("href"));
				// 	});
				// }

				//callback({showTitle: show.title, characters:})

			// });
		// });
	// };
	var scrapeImdb = function(callback) {
		var show = allShows[rand(0, allShows.length)];
		show.coverPhoto = "/imdb/coverPhoto-"+show.title.replace(/ /g, "_")+".jpg";
		show.links.map(function(v) {
			v.src = "/imdb/"+show.title.replace(/ /g, "_")+"-"+v.name.replace(/ /g, "_") + ".jpg";
		});
		callback(show);
	};
	function create(author, templater, callback) {
		scrapeImdb(function(imdb) {

			var quiz = {};
			quiz.title = generateQuizTitle(imdb.title, templater);
			quiz.articleName = quiz.title.toLowerCase().replace(/[\"\'\?]/g, "").replace(/ /g, "-");
			quiz.isQuiz = true;
			quiz.possibleResults = [];
      var markov = new Markov();
      markov.pretrainPersonality();
      markov.pretrainHoroscope();
			if (imdb.links.length === 0) return create(author, templater, callback);
			for (var i = 0; i < imdb.links.length; i++) {
				quiz.possibleResults.push({
          imageUrl: imdb.links[i].src,
          title: "You Got "+imdb.links[i].name+"!",
          body: markov.generate(rand(10,15), 4)});
			}
			quiz.previewUrl = imdb.coverPhoto;

			quiz.elements = [];

			assignAuthor(quiz, author);
			var max = rand(5, 10);
			var func = null;
			for (var i = 0; i < max; i++) {
				var r = rand(0, 100);
				if(r > 33) {
					if(r > 66) {
						func = generatePhotoQuestion;
					} else {
						func = generateWordQuestion;
					}
				} else {
					func = generateYesNoQuestion;
				}

				func(templater, function(q){
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

	this.create = create;

	var generatePhotoQuestion = function(templater, callback) {
		var question = {};
		templater.loadQuizPhotoQuestions();
		question.questionType = "openEnded";
		var nameObj = templater.generateName();
		getQuizPhotos(nameObj.subj, function(quizPhotos) {
  		question.imageUrl = quizPhotos.pop();
  		question.possibleAnswers = quizPhotos.map(function(obj) {return {url: obj}});
  		question.title = nameObj.title;
  		callback(question);
		});
	};

	var generateYesNoQuestion = function(templater, callback) {
		var question = {};
		templater.loadQuizYesNoQuestions();
		question.questionType = "yesNo";
		var nameObj = templater.generateName();
		question.title = nameObj.title;
		callback(question);
	};

	var generateWordQuestion = function(templater, callback) {
		var question = {};
		if(rand(0, 100) < 50) {
			templater.loadQuizNounQuestions();
			question.possibleAnswers = [];
			for (var i = 0; i < 6; i++) {
				question.possibleAnswers.push({
					text: templater.getRand('noun')
				});
			}
		} else {
			templater.loadQuizPeopleQuestions();
			question.possibleAnswers = [];
			for (var i = 0; i < 6; i++) {
				question.possibleAnswers.push({
					text: templater.getRand('people')
				});
			}
		}
		question.questionType = "openEnded";
		var nameObj = templater.generateName();

		question.title = nameObj.title;
		callback(question);
	};

	var generateQuizTitle = function(showTitle, templater) {
		templater.loadQuizTitles();
		templater.loadKey("showTitle", [showTitle]);
		return templater.generateName().title;
	};
};




var RUNME = function(start, toScrape, callback) {
	request(start, function(err, res, html) {
  	if (err) return console.error(err);

  	var $ = cheerio.load(html);
  	var titles = $(toScrape);
  	var links = [];
  	var coverPhotoUrl;


  	for (var i = 0; i < titles.length; i++) {
  		links.push({url: $(titles.get(i)).attr("href"), title: $(titles.get(i)).text().trim()});
  	}
  	links = links.filter(function(el) {
  		return el.url.indexOf("/title/") !== -1 && el.url.indexOf("/vote?v") === -1;
  	});

		// var show = links[Math.floor((Math.random() * links.length))];
		var allShows = [];
		var loop = function(i) {
			console.log(i + 1, "/", links.length);
			if(i >= links.length) {
				return callback(allShows);
			}
			var show = links[i];
			request('http://imdb.com' + show.url, function (err, res, html) {
				var $ = cheerio.load(html);
				var characters = $('.character a');
				var links = [];
				var returnLinks = [];
				var showCover = $('.image a');

				// showCover.filter(function(el) { el. });
				console.log("Show cover", $(showCover).attr("href"));
				request('http://imdb.com' + $(showCover).attr("href"), function (err, res, html) {
					if(!html) {
						return loop(i+1);
					}
					var temp = cheerio.load(html); // crashed here, "Cannot read property 'parent' of undefined" with http://www.imdb.com/list/ls073461000/?ref_=tt_tt_edw_OscarNom_i_1#1
					coverPhotoUrl = temp('#primary-img').attr("src");

					for (var j = 0; j < characters.length; j++) {
						if ($(characters.get(j)).attr("href"))
							links.push({url: $(characters.get(j)).attr("href"), name: $(characters.get(j)).text().trim()});
					}

				//	console.log(links);

					var index = 0;
					function getImage(callback){
						if (index < links.length) {
							request('http://imdb.com' + links[index].url, function (err, res, html) {
								var $ = cheerio.load(html);
								var photos = $("a[name='headshot']");
								if ($(photos).attr("href")) {
									request('http://imdb.com' + $(photos).attr("href"), function (err, res, html) {
										var $ = cheerio.load(html);
										var photo = $('#primary-img');
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
							var s = {title: show.title, coverPhoto: coverPhotoUrl, links: returnLinks};
							allShows.push(s);
							// request(s.coverPhoto).pipe(fs.createWriteStream("./imdb/coverPhoto-"+s.title+".jpg")).on('close', function() {
							// 	console.log("Done Cover");
							// });
							// s.links.map(function(v) {
							// 	request(v.src).pipe(fs.createWriteStream("./imdb/"+s.title+"-"+v.name + ".jpg")).on('close', function() {
							// 		console.log("done");
							// 	});
							// });
							loop(i+1);
						}
					}
					getImage(callback);
				});



				// for (var j = 0; j < links.length; j++) {
				// 	request('http://imdb.com' + links[j].url, function (err, res, html) {
				// 		var $ = cheerio.load(html);
				// 		var photos = $("a[name='headshot']");
				// 		console.log(links[j].name + ": " + $(photos.first()).attr("href"));
				// 	});
				// }

				//callback({showTitle: show.title, characters:})

			});
		};

		loop(0);
	});
};

// RUNME("http://www.imdb.com/chart/top?ref_=nv_ch_250_4", ".titleColumn a", function(arr) {
// 	fs.writeFile("allMovies.json", JSON.stringify({data: arr}), function() {
// 		console.log("DONE");
// 	});
// });


// fs.readFile("allShows.json", 'utf8', function(err, data) {
// 	var arr = JSON.parse(data).data;
// 	var cur = 0;
// 	var max = arr.length;
// 	arr.map(function(show) {
// 		request(show.coverPhoto).pipe(fs.createWriteStream("./imdb/coverPhoto-"+show.title+".jpg")).on('close', function() {
// 			cur++;
// 			console.log("Done Cover --->", cur, "/", max);
// 		});
// 		show.links.map(function(v) {
// 			request(v.src).pipe(fs.createWriteStream("./imdb/"+show.title+"-"+v.name + ".jpg")).on('close', function() {
// 				console.log("done");
// 			});
// 		});
// 	});
// });
