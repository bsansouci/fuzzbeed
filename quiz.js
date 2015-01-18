var cheerio = require('cheerio');
var request = require('request');

module.exports = function QuizCreator () {


	var scrapeImdb = function(callback) {
		request('http://www.imdb.com/search/title?num_votes=5000,&sort=user_rating,desc&title_type=tv_series', function(err, res, html) {
    	if (err) return console.log(err);

    	var $ = cheerio.load(html);
    	var titles = $('.title a');
    	var links = [];


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

			for (var i = 0; i < characters.length; i++) {
				links.push({url: $(characters.get(i)).attr("href"), name: $(characters.get(i)).text().trim()});
			};

			console.log(links);

			var index = 0;
			function getImage(callback{
				index++;
				if (index < links.length){
					request('http://imdb.com' + links[index].url, function (err, res, html) {
						var $ = cheerio.load(html);
						var photos = $("a[name='headshot']");

						console.log(links[index].name + ": " + $(photos).attr("href"));

						request('http://imdb.com' + $(photos).attr("href"), function (err, res, html) {
							var $ = cheerio.load(html);
							var photo = $('#primary-img');

							links[index].src = photo.attr('src');
						});

						getImage();
					});
				} else {callback({title: show.title, links:links);}
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
		scrapeImdb(function(links) {
			// Create quiz:
			
		});
	}
}
var QuizCreator = require('./quiz');


var q = new QuizCreator();
q.scrapeImdb();


