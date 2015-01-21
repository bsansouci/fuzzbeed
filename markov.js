"use strict";
var cheerio = require('cheerio');
var request = require('request');
var inflect = require('i')();
module.exports = function Markov () {

	var startWords = [];

	var hashMap = {};



	 var hash = function(word) {
		return "-hashed-" + word;
	};

	 var hashMapPut = function (key, value) {
		if (!hashMap[hash(key)]) // if word's not in the map yet
			hashMap[hash(key)] = [];
		hashMap[hash(key)].push(value);
	};

	 var rand = function(max){
		return Math.floor(Math.random() * max);
	};


	 this.train = function(string) {
	 	string = string.replace(/[\"”“]/g, "");
		var sentences = string.split(/[!?.…]+/).filter(function(x) {return x.length > 0;});
		sentences.map(trainSentence);
	};

	 var trainSentence = function(sentence) {
		var wordList = sentence.split(/[ \t\n]+/).filter(function(x) {return x.length > 0;});
		// representing beginning of sentence
		var previousWord = null;
		for (var i = 0; i < wordList.length; i++) {

			if (previousWord === null)
				startWords.push(wordList[i]);
			else {
				hashMapPut(previousWord, wordList[i]);
			}
			previousWord = wordList[i];
		}
		hashMapPut(previousWord, ".");
	};

	 var generateSentence = function(maxWords, minWords) {
		var prev = startWords[rand(startWords.length)];
		var addedWords = 0;
		var sentence = "";
		while (prev !== "."){
			sentence += prev + " ";
			prev = hashMap[hash(prev)][rand(hashMap[hash(prev)].length)];
			if (addedWords++ > maxWords) return generateSentence(maxWords, minWords);
		}
		if(addedWords < minWords) return generateSentence(maxWords, minWords);
		sentence = sentence.slice(0,-1) + ".";
		// If the first letter is lowercase, prefix with "..."
		if (sentence.charAt(0) === sentence.charAt(0).toLowerCase()) {
			sentence = "... " + sentence;
		}
		return sentence;
	};

	 this.generate = function(sentenceCount, maxWordsPerSentence, minWordsPerSentence, filter) {
		var numSentences = 0;
		var allSentences = "";
		while (numSentences < sentenceCount){
			var s = generateSentence(maxWordsPerSentence, minWordsPerSentence);
			if (filter === undefined || filter(s)){
				allSentences += s + "  ";
				numSentences++;
			}
		}
		return allSentences;
	};

  this.pretrainPersonality = function() {
    this.train(
        "Your primary mode of living is focused internally, where you take things in via your five senses in a literal, concrete fashion. Your secondary mode is external, where you deal with things rationally and logically."+
        "You are quiet and reserved individuals who are interested in security and peaceful living. They have a strongly-felt internal sense of duty, which lends them a serious air and the motivation to follow through on tasks. Organized and methodical in their approach, they can generally succeed at any task which they undertake."+
        "You are very loyal, faithful, and dependable. They place great importance on honesty and integrity. They are good citizens who can be depended on to do the right thing for their families and communities. While they generally take things very seriously, they also usually have an offbeat sense of humor and can be a lot of fun - especially at family or work-related gatherings." +
        "You tend to believe in laws and traditions, and expect the same from others. They're not comfortable with breaking laws or going against the rules. If they are able to see a good reason for stepping outside of the established mode of doing things, you will support that effort. However, you more often tend to believe that things should be done according to procedures and plans. If you have not developed their intuitive side sufficiently, they may become overly obsessed with structure, and insist on doing everything by the book."+
        "You are extremely dependable on following through with things which he or she has promised. For this reason, they sometimes get more and more work piled on them. Because you has such a strong sense of duty, they may have a difficult time saying no when they are given more work than they can reasonably handle. For this reason, you often works long hours, and may be unwittingly taken advantage of."+
        "You will work for long periods of time and put tremendous amounts of energy into doing any task which they see as important to fulfilling a goal. However, they will resist putting energy into things which don't make sense to them, or for which they can't see a practical application. They prefer to work alone, but work well in teams when the situation demands it. They like to be accountable for their actions, and enjoy being in positions of authority. You has little use for theory or abstract thinking, unless the practical application is clear."+
        "You have tremendous respect for facts. They hold a tremendous store of facts within themselves, which they have gathered through their Sensing preference. They may have difficulty understanding a theory or idea which is different from their own perspective. However, if they are shown the importance or relevance of the idea to someone who they respect or care about, the idea becomes a fact, which you will internalize and support. Once you supports a cause or idea, he or she will stop at no lengths to ensure that they are doing their duty of giving support where support is needed."+
        "You are not naturally in tune with their own feelings and the feelings of others. They may have difficulty picking up on emotional needs immediately, as they are presented. Being perfectionists themselves, they have a tendency to take other people's efforts for granted, like they take their own efforts for granted. They need to remember to pat people on the back once in a while."
    );
    this.train("You have a unique ability to intuit others' emotions and motivations, and will often know how someone else is feeling before that person knows it himself. They trust their insights about others and have strong faith in their ability to read people. Although they are sensitive, they are also reserved; a private sort, and are selective about sharing intimate thoughts and feelings.");
    this.train("You often appear quiet, caring and sensitive, and may be found listening attentively to someone else's ideas or concerns. You are highly perceptive about people and want to help others achieve understanding. You are not afraid of complex personal problems; in fact, you are quite complex yourself, and have a rich inner life that few are privy to. You reflect at length on issues of ethics, and feel things deeply. Because you initially appear so gentle and reserved, you may surprise others with their intensity when one of their values is threatened or called into question. Your calm exterior belies the complexity of their inner worlds");
    this.train("You are typically agile and expressive communicators, using their wit, humor, and mastery of language to create engaging stories. Imaginative and original, You often have a strong artistic side. You are drawn to art because of its ability to express inventive ideas and create a deeper understanding of human experience.");
    this.train("You often seem unconventional, and may come off as scattered; you don’t tend to be in touch with your physical surroundings. They often overlook the details, as you are more likely to focus on connecting with other people or on exploring their own imagination and self-expression. You have little patience for the mundane and want to experience life with intensity and flair. You often have an artistic streak, and may be artistic in appearance. Many have developed a distinctive and quirky personal style.");
  };

	this.pretrainHoroscope = function() {
		this.train("Intuition plays a large part in your work. You're apt to sense what others want or need and foresee the consequences of one course of action over another. This is definitely going to make a positive difference in what you accomplish. You're likely to be quite pleased with what you do. Exercise this intuition today so it will stay with you in the future.");
		this.train("Information that you receive from far away could make doing business with a group you're affiliated with that much easier. Travel might also be on your mind. Friends could be inclined to consider the idea, so it might be fun to go out on the town with them tonight.");
		this.train("You're probably feeling optimistic and enthusiastic about your future. You could lapse into some very pleasant daydreams about the possibilities, but don't get carried away. Try to remain practical.");
		this.train("You're more likely to get the results you want. You've got a lot to think about.");
		this.train("You might toy with the idea of getting some kind of project or enterprise going with a close friend or love partner. Go for it.");
		this.train("You might like to get on the phone and run ideas for new projects by colleagues or perhaps make arrangements to complete current projects. Success through creativity is strongly indicated at this time. If this has been on your mind, get started.");
		this.train("You probably feel especially optimistic about this. You're looking forward to new opportunities that may come your way. Your intuition is high, so you're likely to be able to separate the wheat from the chaff where opportunities are concerned. Go for it.");
		this.train("Don't hesitate. Have a great day.");
		this.train("You feel especially optimistic and enthusiastic, although you may not know why.");
	};

	this.pretrainBuzzfeedLists = function() {
		var jsonList = [];
		jsonList.push([ { "property1": "1. When you wake up all warm and doughy in your bed and you can feel the icy fingers of winter waiting for you on the other side of the blanket." }, { "property1": "2. When your sock slips off in your boot while you’re walking and you just want to lay down and die." }, { "property1": "3. When there’s an unseasonably warm day and you think to yourself, “This is it! It’s really over!” And — BAM! — you wake up the next day to -15 degree windchill." }, { "property1": "4. When every cell on your body is so starved of moisture you’re afraid if you even reach for lotion you’ll crack and break into a million sad, dry pieces." }, { "property1": "5. When you just need to run to the store to buy a quart of milk and it takes you thirty-five minutes and help from a friend to get your winter gear on." }, { "property1": "6. When you wake up to pee and even the idea of touching your sweet, warm buns to the Arctic rim of the toilet seat sends shivers up your spine." }, { "property1": "7. When it hits you that the last time your bare skin tasted golden drops of sunlight was fall." }, { "property1": "8. When the salt-slick sole of your boot slips on black ice and you and your dignity tumble to the ground." }, { "property1": "9. When you can’t remember the last time you felt awake, excited, or alive." }, { "property1": "10. When winter audibly scoffs at your attempts to have any semblance of control of your life. “HA!” says winter. “I am your god.”" }, { "property1": "11. When you desperately try to make winter seem desirable and it just makes you more accutely aware of how bleak your life has become." }, { "property1": "12. When it just feels like the entire world is against you and you’re going to die alone, cold, and covered in snow." }, { "property1": "13. When you’re like, “It’s cold out, but maybe I could actually still live my life today if I wear a lot of clothes and pretend I don’t have any emotions” and winter is like “Lol.”" }, { "property1": "14. When you go to extreme, dangerous lengths to dull the chill in the hollow of your frozen bones." }, { "property1": "15. When winter pulls you down to deeply profound levels of loneliness." }, { "property1": "16. When no part of you, body or soul, is spared from winter’s wrath." }, { "property1": "17. When you don’t even value your own personal appearance anymore because winter has taken everything from you and nothing matters and what’s the point." }, { "property1": "18. And when something breaks inside of you and you can’t even find the will to care anymore." } ]);
		jsonList.push([ { "property1": "1. Because a Honey BBQ Chicken Strip Sandwich will never stop calling your name at 2:00 AM." }, { "property1": "2. And there’s nothing like accompanying your meal with an ice-cold Lone Star, the best state beer in the country." }, { "property1": "3. Because you can’t get the magical taste of Bluebell (or those little wooden spoons) anywhere else." }, { "property1": "4. Because there’s nothing like the camaraderie of cheering on the Cowboys or your Cotton Bowl team at Jerryworld." }, { "property1": "5. And all football rivalries pale in comparison to A&M and Texas." }, { "property1": "6. Because the “Friday night lights” don’t shine brighter in any other state." }, { "property1": "7. And nobody else understands the insanity of the homecoming mum tradition." }, { "property1": "8. Because there’s nothing like spending those summer nights at the lake." }, { "property1": "9. And other water parks are child’s play compared to Schlitterbahn." }, { "property1": "10. Nothing can beat spending a lazy day floating down Guadalupe River." }, { "property1": "11. Because you can’t get your fried food fix anywhere but the Texas State Fair." }, { "property1": "12. And the Houston Rodeo is the one time where everyone has an excuse to wear their boots for the day." }, { "property1": "13. Because if you need to escape for a little bit, the serenity of West Texas is hard to beat." }, { "property1": "14. Because you’ll be able to get your fill of art no matter where you go…" }, { "property1": "15. … and you’ll find it in the most unique and unexpected places." }, { "property1": "16. Because you wouldn’t mind actually living in Arlen with Hank and the guys." }, { "property1": "17. And you know Walker, Texas Ranger will always have your back." }, { "property1": "18. Because there’s nothing more comforting than staying in and watching Texas thunderstorms." }, { "property1": "19. And the one-of-a-kind bluebonnets are breathtaking reminders of picture-perfect Texas springs." }, { "property1": "20. Because a bottle of the original Dr. Pepper MADE WITH REAL SUGAR is always waiting for you in Dublin." }, { "property1": "21. Because waking up to warm and fresh kolaches from Czech Stop will always be the best breakfast…" }, { "property1": "22. … Unless you pick up the best doughnut in the world at Round Rock Donuts." }, { "property1": "23. Because nobody shares your everlasting love for watching tortillas being hand-rolled at Uncle Julio’s…" }, { "property1": "24. … as well as your skill for creating the perfect BBQ platter." }, { "property1": "25. And although you might forget a few things now and again, you’ll never forget your first field trip to The Alamo." }, { "property1": "26. And let’s not forget the fact that Boyhood will now always be that constant reminder that Texas will forever be home." } ]);
		jsonList.push([ { "property1": "2. This tree with DAT ASS." }, { "property1": "3. This stawberry with a badonk." }, {}, { "property1": "8. This tree with a lot of junk in the trunk." }, { "property1": "9. Whatever this is." }, { "property1": "14. This naughty box." }, { "property1": "15. This THICK and CREAMY mac and cheese." }, { "property1": "16. This interestingly shaped carrot." }, { "property1": "17. And this dude’s confidence." } ]);
		jsonList.push([ { "property1": "2. These pads who finally found their chill." }, { "property1": "3. This cake awaiting Willcome at home." }, { "property1": "4. This sacrificial altar of retail greatness in the bathroom." }, { "property1": "5. This vengeful chicken." }, { "property1": "6. These magical dress shoes that improve exponentially with age." }, { "property1": "7. This bargain to beat all bargains." }, { "property1": "8. This mini-horse, the ultimate finder of bargains." }, { "property1": "10. This shirt, telling the most romantic story ever told." }, { "property1": "11. This carefully engraved bottle of Clorox." }, { "property1": "12. This display of tremendous markdowns." }, { "property1": "13. This most rare and precious hand soap." }, { "property1": "14. These ever-morphing chameleon pails." }, { "property1": "15. This display of the dark side of geometry." }, { "property1": "16. This heartfelt message for the recent graduate." }, { "property1": "17. This insane amount of irony." }, { "property1": "18. These potatoes of mystery and wonder." }, { "property1": "19. And, of course, this perfect gift." } ]);
		jsonList.push([ { "property1": "1. Choosing which spoon to use." }, { "property1": "2. And then deciding which cereal you would use your spoon in." }, { "property1": "3. And of course that doesn’t even cover the difficulty of choosing a Lunchables flavor." }, { "property1": "4. Settling on either playing with your Beanie Babies or leaving them on the shelf so that they would be in mint condition to make MILLIONS someday." }, { "property1": "5. Determining what your AOL screen name should be." }, { "property1": "6. And then trying to figure out WHAT THE HELL your away message was going to say." }, { "property1": "7. Choosing a boy band to pledge lifetime allegiance to." }, { "property1": "8. Trying to make a final decision on what color gel pen you were going to use to write a note to your BFFL." }, { "property1": "9. Choosing which part of the Wonder Ball you would devour first." }, { "property1": "10. Whether you would chew a piece of Fruit Stripe gum or chew a piece of gum that would actually remain flavorful longer than three minutes." }, { "property1": "11. Deciding whether or not you wanted to watch the second tape of Titanic on VHS." }, { "property1": "12. Whether you would purchase school supplies that were useful, or spend your money on Lisa Frank because it was FUNKY." }, { "property1": "13. If you would spend your allowance at the Scholastic Book Fair or save up for moon shoes." }, { "property1": "14. Trying to decide whether to play Oregon Trail or watch TRL." }, { "property1": "15. Deciding whether you should buy a Furby or be able to sleep at night." }, { "property1": "16. Rewinding your VHS tape or leaving it as a problem for your future self to deal with." }, { "property1": "17. And, of course, the insanely difficult task of trying to choose what movies you would rent from Blockbuster." } ]);
		jsonList.push([ { "property1": "1. You’ve picked up objects with your feet because bending over was too much work." }, { "property1": "2. You’ve texted your friends when they were sitting right next to you." }, { "property1": "3. You’ve eaten yogurt with a butter knife (or no utensil at all) when all of the spoons were dirty." }, { "property1": "4. You’ve bought new underwear instead of doing your laundry." }, { "property1": "5. You’ve given up typing in the middle of a sentence because you didn’t have the effort to finish your thought." }, { "property1": "6. You’ve “cleaned your room” by shoving everything under your bed." }, { "property1": "7. You’ve peed in water bottles instead of getting up to go to the bathroom." }, { "property1": "8. You’ve downloaded something on your Kindle instead of searching through your house for the actual hard copy." }, { "property1": "9. You’ve shaved your legs in the living room so you could watch TV." }, { "property1": "10. You’ve eaten the crumbs you find on your shirt instead of dusting them off." }, { "property1": "11. You’ve taught your dog how to fetch the remote control." }, { "property1": "12. You’ve poured milk into the cereal box because you were out of clean bowls." }, { "property1": "13. You’ve ironed your shirts with a hair straightener." }, { "property1": "14. You’ve waited hours for someone else to get home so they could make you breakfast." }, { "property1": "15. You’ve done your homework on the floor because your desk was too messy." }, { "property1": "16. You’ve eaten cold food out of the can instead of cooking it." }, { "property1": "17. You’ve invited someone over to build your Ikea furniture and then immediately sent them home." }, { "property1": "18. You’ve had a mini fridge in your room so you didn’t have to get up and walk to the kitchen." }, { "property1": "19. You’ve waited 45 minutes for a movie to download on your computer instead of ordering it on your TV." }, { "property1": "20. You’ve still not fully unpacked after moving out of college." }, { "property1": "21. And, most importantly, you’ve ordered food from a restaurant that’s on the first floor of your building." } ]);
		for (var i = jsonList.length - 1; i >= 0; i--) {
			var json = jsonList[i];
			for (var j = json.length - 1; j >= 0; j--) {
				var listItem = json[j]["property1"];
				if (listItem) {
					listItem = listItem.replace(/^[0-9]+\./g, "");
					this.train(listItem);
				}
			}
		}
	};

	var singularizeSubject = function(subject) {
		var words = subject.split(/[ \t\n]+/).filter(function(x) {return x.length > 0;});
		var singularizedSubject = "";
		for (var i = 0; i < words.length; i++) {
			singularizedSubject += inflect.singularize(words[i]);
			if (i < words.length - 1) singularizedSubject += " ";
		}
		return singularizedSubject;
	};

	this.pretrainWikipediaSubject = function(article, callback) {
		var subject = article.subj;
		subject = singularizeSubject(subject);
		var train = this.train;

		var checkDisambiguation = function($) {
			var disambigbox = $("#disambigbox");
			if(disambigbox.length > 0) {
				var a = $('#mw-content-text ul a');
	    	var url = a.first().attr("href");

	    	request('https://simple.wikipedia.org' + url, function (err, res, html) {
    			var $ = cheerio.load(html);
    			$('.mw-content-ltr').each(function() {
    				var data = $(this);
	    			var paragraphs = data.find('p').text().trim().replace(/\[.*?\]|\(.*?\)/g, "");
	    			paragraphs = paragraphs.split(/\. /).slice(0, 300).join(". ");
	    			train(paragraphs);
	    			if(callback) callback();
	    		});
    		});
			} else {
				$('.mw-content-ltr').each(function() {
					var data = $(this);
	  			var paragraphs = data.find('p').text().trim().replace(/\[.*?\]|\(.*?\)/g, "");
	  			paragraphs = paragraphs.split(/\. /).slice(0, 300).join(". ");
	  			train(paragraphs);
	  			if(callback) callback();
	  		});
			}
		};

		request('https://en.wikipedia.org/wiki/Special:Search/'+subject, function(err, res, html) {
    	if (err) return console.log(err);

    	var $ = cheerio.load(html);
    	if(res.request.path.indexOf("Special:Search") !== -1) {
    		var a = $('.mw-search-results a');
    		var url = a.first().attr("href");
    		request('https://en.wikipedia.org' + url, function (err, res, html) {
    			if(err) {
    				console.error("error at", url, " with subject ", subject, " ---> ", err);
    				if(callback) return callback();
    				else return;
    			}

    			var $ = cheerio.load(html);
    			checkDisambiguation($);
    		});
    	} else {
    		checkDisambiguation($);
    	}
		});
	};
};

/*
 var markov = require("./markov");
 var m = new markov();

 m.pretrainBuzzfeedLists();

// //m.pretrainHoroscope();
// m.pretrainWikipediaSubject("pickle", function() {
 	console.log(m.generate(10, 10, 4));
// });
*/
