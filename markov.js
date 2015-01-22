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

var all = [{
  "url": "/title/tt0111161/?ref_=chttp_tt_1",
  "title": "The Shawshank Redemption"
}, {
  "url": "/title/tt0068646/?ref_=chttp_tt_2",
  "title": "The Godfather"
}, {
  "url": "/title/tt0071562/?ref_=chttp_tt_3",
  "title": "The Godfather: Part II"
}, {
  "url": "/title/tt0468569/?ref_=chttp_tt_4",
  "title": "The Dark Knight"
}, {
  "url": "/title/tt0110912/?ref_=chttp_tt_5",
  "title": "Pulp Fiction"
}, {
  "url": "/title/tt0060196/?ref_=chttp_tt_6",
  "title": "The Good, the Bad and the Ugly"
}, {
  "url": "/title/tt0050083/?ref_=chttp_tt_7",
  "title": "12 Angry Men"
}, {
  "url": "/title/tt0108052/?ref_=chttp_tt_8",
  "title": "Schindler's List"
}, {
  "url": "/title/tt0167260/?ref_=chttp_tt_9",
  "title": "The Lord of the Rings: The Return of the King"
}, {
  "url": "/title/tt0137523/?ref_=chttp_tt_10",
  "title": "Fight Club"
}, {
  "url": "/title/tt0120737/?ref_=chttp_tt_11",
  "title": "The Lord of the Rings: The Fellowship of the Ring"
}, {
  "url": "/title/tt0080684/?ref_=chttp_tt_12",
  "title": "Star Wars: Episode V - The Empire Strikes Back"
}, {
  "url": "/title/tt1375666/?ref_=chttp_tt_13",
  "title": "Inception"
}, {
  "url": "/title/tt0109830/?ref_=chttp_tt_14",
  "title": "Forrest Gump"
}, {
  "url": "/title/tt0073486/?ref_=chttp_tt_15",
  "title": "One Flew Over the Cuckoo's Nest"
}, {
  "url": "/title/tt0167261/?ref_=chttp_tt_16",
  "title": "The Lord of the Rings: The Two Towers"
}, {
  "url": "/title/tt0816692/?ref_=chttp_tt_17",
  "title": "Interstellar"
}, {
  "url": "/title/tt0099685/?ref_=chttp_tt_18",
  "title": "Goodfellas"
}, {
  "url": "/title/tt0133093/?ref_=chttp_tt_19",
  "title": "The Matrix"
}, {
  "url": "/title/tt0076759/?ref_=chttp_tt_20",
  "title": "Star Wars: Episode IV - A New Hope"
}, {
  "url": "/title/tt0047478/?ref_=chttp_tt_21",
  "title": "Seven Samurai"
}, {
  "url": "/title/tt0317248/?ref_=chttp_tt_22",
  "title": "City of God"
}, {
  "url": "/title/tt0114369/?ref_=chttp_tt_23",
  "title": "Se7en"
}, {
  "url": "/title/tt0114814/?ref_=chttp_tt_24",
  "title": "The Usual Suspects"
}, {
  "url": "/title/tt0102926/?ref_=chttp_tt_25",
  "title": "The Silence of the Lambs"
}, {
  "url": "/title/tt0038650/?ref_=chttp_tt_26",
  "title": "It's a Wonderful Life"
}, {
  "url": "/title/tt0064116/?ref_=chttp_tt_27",
  "title": "Once Upon a Time in the West"
}, {
  "url": "/title/tt0110413/?ref_=chttp_tt_28",
  "title": "Léon"
}, {
  "url": "/title/tt0118799/?ref_=chttp_tt_29",
  "title": "Life Is Beautiful"
}, {
  "url": "/title/tt0034583/?ref_=chttp_tt_30",
  "title": "Casablanca"
}, {
  "url": "/title/tt0082971/?ref_=chttp_tt_31",
  "title": "Raiders of the Lost Ark"
}, {
  "url": "/title/tt0120586/?ref_=chttp_tt_32",
  "title": "American History X"
}, {
  "url": "/title/tt0120815/?ref_=chttp_tt_33",
  "title": "Saving Private Ryan"
}, {
  "url": "/title/tt0021749/?ref_=chttp_tt_34",
  "title": "City Lights"
}, {
  "url": "/title/tt0054215/?ref_=chttp_tt_35",
  "title": "Psycho"
}, {
  "url": "/title/tt0245429/?ref_=chttp_tt_36",
  "title": "Spirited Away"
}, {
  "url": "/title/tt0047396/?ref_=chttp_tt_37",
  "title": "Rear Window"
}, {
  "url": "/title/tt1675434/?ref_=chttp_tt_38",
  "title": "Untouchable"
}, {
  "url": "/title/tt0027977/?ref_=chttp_tt_39",
  "title": "Modern Times"
}, {
  "url": "/title/tt2582802/?ref_=chttp_tt_40",
  "title": "Whiplash"
}, {
  "url": "/title/tt0103064/?ref_=chttp_tt_41",
  "title": "Terminator 2: Judgment Day"
}, {
  "url": "/title/tt0209144/?ref_=chttp_tt_42",
  "title": "Memento"
}, {
  "url": "/title/tt0120689/?ref_=chttp_tt_43",
  "title": "The Green Mile"
}, {
  "url": "/title/tt0253474/?ref_=chttp_tt_44",
  "title": "The Pianist"
}, {
  "url": "/title/tt0407887/?ref_=chttp_tt_45",
  "title": "The Departed"
}, {
  "url": "/title/tt0043014/?ref_=chttp_tt_46",
  "title": "Sunset Boulevard"
}, {
  "url": "/title/tt0078788/?ref_=chttp_tt_47",
  "title": "Apocalypse Now"
}, {
  "url": "/title/tt0057012/?ref_=chttp_tt_48",
  "title": "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb"
}, {
  "url": "/title/tt0172495/?ref_=chttp_tt_49",
  "title": "Gladiator"
}, {
  "url": "/title/tt0088763/?ref_=chttp_tt_50",
  "title": "Back to the Future"
}, {
  "url": "/title/tt0078748/?ref_=chttp_tt_51",
  "title": "Alien"
}, {
  "url": "/title/tt0482571/?ref_=chttp_tt_52",
  "title": "The Prestige"
}, {
  "url": "/title/tt0032553/?ref_=chttp_tt_53",
  "title": "The Great Dictator"
}, {
  "url": "/title/tt0405094/?ref_=chttp_tt_54",
  "title": "The Lives of Others"
}, {
  "url": "/title/tt0110357/?ref_=chttp_tt_55",
  "title": "The Lion King"
}, {
  "url": "/title/tt1853728/?ref_=chttp_tt_56",
  "title": "Django Unchained"
}, {
  "url": "/title/tt1345836/?ref_=chttp_tt_57",
  "title": "The Dark Knight Rises"
}, {
  "url": "/title/tt0095765/?ref_=chttp_tt_58",
  "title": "Cinema Paradiso"
}, {
  "url": "/title/tt0081505/?ref_=chttp_tt_59",
  "title": "The Shining"
}, {
  "url": "/title/tt0050825/?ref_=chttp_tt_60",
  "title": "Paths of Glory"
}, {
  "url": "/title/tt0169547/?ref_=chttp_tt_61",
  "title": "American Beauty"
}, {
  "url": "/title/tt0910970/?ref_=chttp_tt_62",
  "title": "WALL·E"
}, {
  "url": "/title/tt0053125/?ref_=chttp_tt_63",
  "title": "North by Northwest"
}, {
  "url": "/title/tt0090605/?ref_=chttp_tt_64",
  "title": "Aliens"
}, {
  "url": "/title/tt0033467/?ref_=chttp_tt_65",
  "title": "Citizen Kane"
}, {
  "url": "/title/tt0052357/?ref_=chttp_tt_66",
  "title": "Vertigo"
}, {
  "url": "/title/tt0211915/?ref_=chttp_tt_67",
  "title": "Amélie"
}, {
  "url": "/title/tt0022100/?ref_=chttp_tt_68",
  "title": "M"
}, {
  "url": "/title/tt0082096/?ref_=chttp_tt_69",
  "title": "Das Boot"
}, {
  "url": "/title/tt0095327/?ref_=chttp_tt_70",
  "title": "Grave of the Fireflies"
}, {
  "url": "/title/tt0435761/?ref_=chttp_tt_71",
  "title": "Toy Story 3"
}, {
  "url": "/title/tt0364569/?ref_=chttp_tt_72",
  "title": "Oldboy"
}, {
  "url": "/title/tt0119698/?ref_=chttp_tt_73",
  "title": "Princess Mononoke"
}, {
  "url": "/title/tt0086190/?ref_=chttp_tt_74",
  "title": "Star Wars: Episode VI - Return of the Jedi"
}, {
  "url": "/title/tt0087843/?ref_=chttp_tt_75",
  "title": "Once Upon a Time in America"
}, {
  "url": "/title/tt0066921/?ref_=chttp_tt_76",
  "title": "A Clockwork Orange"
}, {
  "url": "/title/tt0105236/?ref_=chttp_tt_77",
  "title": "Reservoir Dogs"
}, {
  "url": "/title/tt0075314/?ref_=chttp_tt_78",
  "title": "Taxi Driver"
}, {
  "url": "/title/tt0036775/?ref_=chttp_tt_79",
  "title": "Double Indemnity"
}, {
  "url": "/title/tt0112573/?ref_=chttp_tt_80",
  "title": "Braveheart"
}, {
  "url": "/title/tt0180093/?ref_=chttp_tt_81",
  "title": "Requiem for a Dream"
}, {
  "url": "/title/tt0056592/?ref_=chttp_tt_82",
  "title": "To Kill a Mockingbird"
}, {
  "url": "/title/tt0056172/?ref_=chttp_tt_83",
  "title": "Lawrence of Arabia"
}, {
  "url": "/title/tt0051201/?ref_=chttp_tt_84",
  "title": "Witness for the Prosecution"
}, {
  "url": "/title/tt0338013/?ref_=chttp_tt_85",
  "title": "Eternal Sunshine of the Spotless Mind"
}, {
  "url": "/title/tt0093058/?ref_=chttp_tt_86",
  "title": "Full Metal Jacket"
}, {
  "url": "/title/tt0045152/?ref_=chttp_tt_87",
  "title": "Singin' in the Rain"
}, {
  "url": "/title/tt0070735/?ref_=chttp_tt_88",
  "title": "The Sting"
}, {
  "url": "/title/tt0040522/?ref_=chttp_tt_89",
  "title": "Bicycle Thieves"
}, {
  "url": "/title/tt0086879/?ref_=chttp_tt_90",
  "title": "Amadeus"
}, {
  "url": "/title/tt0071853/?ref_=chttp_tt_91",
  "title": "Monty Python and the Holy Grail"
}, {
  "url": "/title/tt0208092/?ref_=chttp_tt_92",
  "title": "Snatch."
}, {
  "url": "/title/tt0042876/?ref_=chttp_tt_93",
  "title": "Rashomon"
}, {
  "url": "/title/tt0119488/?ref_=chttp_tt_94",
  "title": "L.A. Confidential"
}, {
  "url": "/title/tt0059578/?ref_=chttp_tt_95",
  "title": "For a Few Dollars More"
}, {
  "url": "/title/tt0062622/?ref_=chttp_tt_96",
  "title": "2001: A Space Odyssey"
}, {
  "url": "/title/tt0012349/?ref_=chttp_tt_97",
  "title": "The Kid"
}, {
  "url": "/title/tt0053604/?ref_=chttp_tt_98",
  "title": "The Apartment"
}, {
  "url": "/title/tt0042192/?ref_=chttp_tt_99",
  "title": "All About Eve"
}, {
  "url": "/title/tt0361748/?ref_=chttp_tt_100",
  "title": "Inglourious Basterds"
}, {
  "url": "/title/tt0053291/?ref_=chttp_tt_101",
  "title": "Some Like It Hot"
}, {
  "url": "/title/tt0097576/?ref_=chttp_tt_102",
  "title": "Indiana Jones and the Last Crusade"
}, {
  "url": "/title/tt0040897/?ref_=chttp_tt_103",
  "title": "The Treasure of the Sierra Madre"
}, {
  "url": "/title/tt0041959/?ref_=chttp_tt_104",
  "title": "The Third Man"
}, {
  "url": "/title/tt1832382/?ref_=chttp_tt_105",
  "title": "A Separation"
}, {
  "url": "/title/tt0055630/?ref_=chttp_tt_106",
  "title": "Yojimbo"
}, {
  "url": "/title/tt0114709/?ref_=chttp_tt_107",
  "title": "Toy Story"
}, {
  "url": "/title/tt0372784/?ref_=chttp_tt_108",
  "title": "Batman Begins"
}, {
  "url": "/title/tt2562232/?ref_=chttp_tt_109",
  "title": "Birdman"
}, {
  "url": "/title/tt0017136/?ref_=chttp_tt_110",
  "title": "Metropolis"
}, {
  "url": "/title/tt0986264/?ref_=chttp_tt_111",
  "title": "Like Stars on Earth"
}, {
  "url": "/title/tt0105695/?ref_=chttp_tt_112",
  "title": "Unforgiven"
}, {
  "url": "/title/tt0086250/?ref_=chttp_tt_113",
  "title": "Scarface"
}, {
  "url": "/title/tt0081398/?ref_=chttp_tt_114",
  "title": "Raging Bull"
}, {
  "url": "/title/tt1049413/?ref_=chttp_tt_115",
  "title": "Up"
}, {
  "url": "/title/tt0071315/?ref_=chttp_tt_116",
  "title": "Chinatown"
}, {
  "url": "/title/tt1187043/?ref_=chttp_tt_117",
  "title": "3 Idiots"
}, {
  "url": "/title/tt0057115/?ref_=chttp_tt_118",
  "title": "The Great Escape"
}, {
  "url": "/title/tt0363163/?ref_=chttp_tt_119",
  "title": "Downfall"
}, {
  "url": "/title/tt0095016/?ref_=chttp_tt_120",
  "title": "Die Hard"
}, {
  "url": "/title/tt1065073/?ref_=chttp_tt_121",
  "title": "Boyhood"
}, {
  "url": "/title/tt0047296/?ref_=chttp_tt_122",
  "title": "On the Waterfront"
}, {
  "url": "/title/tt0457430/?ref_=chttp_tt_123",
  "title": "Pan's Labyrinth"
}, {
  "url": "/title/tt0031679/?ref_=chttp_tt_124",
  "title": "Mr. Smith Goes to Washington"
}, {
  "url": "/title/tt2106476/?ref_=chttp_tt_125",
  "title": "The Hunt"
}, {
  "url": "/title/tt0113277/?ref_=chttp_tt_126",
  "title": "Heat"
}, {
  "url": "/title/tt0050212/?ref_=chttp_tt_127",
  "title": "The Bridge on the River Kwai"
}, {
  "url": "/title/tt2267998/?ref_=chttp_tt_128",
  "title": "Gone Girl"
}, {
  "url": "/title/tt0119217/?ref_=chttp_tt_129",
  "title": "Good Will Hunting"
}, {
  "url": "/title/tt0116231/?ref_=chttp_tt_130",
  "title": "The Bandit"
}, {
  "url": "/title/tt0096283/?ref_=chttp_tt_131",
  "title": "My Neighbour Totoro"
}, {
  "url": "/title/tt0050976/?ref_=chttp_tt_132",
  "title": "The Seventh Seal"
}, {
  "url": "/title/tt0044741/?ref_=chttp_tt_133",
  "title": "Ikiru"
}, {
  "url": "/title/tt0015864/?ref_=chttp_tt_134",
  "title": "The Gold Rush"
}, {
  "url": "/title/tt0080678/?ref_=chttp_tt_135",
  "title": "The Elephant Man"
}, {
  "url": "/title/tt0993846/?ref_=chttp_tt_136",
  "title": "The Wolf of Wall Street"
}, {
  "url": "/title/tt0089881/?ref_=chttp_tt_137",
  "title": "Ran"
}, {
  "url": "/title/tt0050986/?ref_=chttp_tt_138",
  "title": "Wild Strawberries"
}, {
  "url": "/title/tt0083658/?ref_=chttp_tt_139",
  "title": "Blade Runner"
}, {
  "url": "/title/tt0017925/?ref_=chttp_tt_140",
  "title": "The General"
}, {
  "url": "/title/tt0120735/?ref_=chttp_tt_141",
  "title": "Lock, Stock and Two Smoking Barrels"
}, {
  "url": "/title/tt1305806/?ref_=chttp_tt_142",
  "title": "The Secret in Their Eyes"
}, {
  "url": "/title/tt0112641/?ref_=chttp_tt_143",
  "title": "Casino"
}, {
  "url": "/title/tt1205489/?ref_=chttp_tt_144",
  "title": "Gran Torino"
}, {
  "url": "/title/tt0118715/?ref_=chttp_tt_145",
  "title": "The Big Lebowski"
}, {
  "url": "/title/tt1291584/?ref_=chttp_tt_146",
  "title": "Warrior"
}, {
  "url": "/title/tt0032976/?ref_=chttp_tt_147",
  "title": "Rebecca"
}, {
  "url": "/title/tt0434409/?ref_=chttp_tt_148",
  "title": "V for Vendetta"
}, {
  "url": "/title/tt0347149/?ref_=chttp_tt_149",
  "title": "Howl's Moving Castle"
}, {
  "url": "/title/tt0405508/?ref_=chttp_tt_150",
  "title": "Rang De Basanti"
}, {
  "url": "/title/tt0077416/?ref_=chttp_tt_151",
  "title": "The Deer Hunter"
}, {
  "url": "/title/tt0025316/?ref_=chttp_tt_152",
  "title": "It Happened One Night"
}, {
  "url": "/title/tt0061512/?ref_=chttp_tt_153",
  "title": "Cool Hand Luke"
}, {
  "url": "/title/tt0892769/?ref_=chttp_tt_154",
  "title": "How to Train Your Dragon"
}, {
  "url": "/title/tt0116282/?ref_=chttp_tt_155",
  "title": "Fargo"
}, {
  "url": "/title/tt0055031/?ref_=chttp_tt_156",
  "title": "Judgement at Nuremberg"
}, {
  "url": "/title/tt0117951/?ref_=chttp_tt_157",
  "title": "Trainspotting"
}, {
  "url": "/title/tt0031381/?ref_=chttp_tt_158",
  "title": "Gone with the Wind"
}, {
  "url": "/title/tt1979320/?ref_=chttp_tt_159",
  "title": "Rush"
}, {
  "url": "/title/tt0758758/?ref_=chttp_tt_160",
  "title": "Into the Wild"
}, {
  "url": "/title/tt0033870/?ref_=chttp_tt_161",
  "title": "The Maltese Falcon"
}, {
  "url": "/title/tt0268978/?ref_=chttp_tt_162",
  "title": "A Beautiful Mind"
}, {
  "url": "/title/tt0046912/?ref_=chttp_tt_163",
  "title": "Dial M for Murder"
}, {
  "url": "/title/tt0167404/?ref_=chttp_tt_164",
  "title": "The Sixth Sense"
}, {
  "url": "/title/tt0046268/?ref_=chttp_tt_165",
  "title": "The Wages of Fear"
}, {
  "url": "/title/tt0395169/?ref_=chttp_tt_166",
  "title": "Hotel Rwanda"
}, {
  "url": "/title/tt0084787/?ref_=chttp_tt_167",
  "title": "The Thing"
}, {
  "url": "/title/tt0266543/?ref_=chttp_tt_168",
  "title": "Finding Nemo"
}, {
  "url": "/title/tt0477348/?ref_=chttp_tt_169",
  "title": "No Country for Old Men"
}, {
  "url": "/title/tt0978762/?ref_=chttp_tt_170",
  "title": "Mary and Max"
}, {
  "url": "/title/tt0064115/?ref_=chttp_tt_171",
  "title": "Butch Cassidy and the Sundance Kid"
}, {
  "url": "/title/tt0266697/?ref_=chttp_tt_172",
  "title": "Kill Bill: Vol. 1"
}, {
  "url": "/title/tt0091763/?ref_=chttp_tt_173",
  "title": "Platoon"
}, {
  "url": "/title/tt0079470/?ref_=chttp_tt_174",
  "title": "Life of Brian"
}, {
  "url": "/title/tt1255953/?ref_=chttp_tt_175",
  "title": "Incendies"
}, {
  "url": "/title/tt2015381/?ref_=chttp_tt_176",
  "title": "Guardians of the Galaxy"
}, {
  "url": "/title/tt0292490/?ref_=chttp_tt_177",
  "title": "Dil Chahta Hai"
}, {
  "url": "/title/tt2024544/?ref_=chttp_tt_178",
  "title": "12 Years a Slave"
}, {
  "url": "/title/tt0074958/?ref_=chttp_tt_179",
  "title": "Network"
}, {
  "url": "/title/tt0052311/?ref_=chttp_tt_180",
  "title": "Touch of Evil"
}, {
  "url": "/title/tt0046911/?ref_=chttp_tt_181",
  "title": "Les Diaboliques"
}, {
  "url": "/title/tt0075686/?ref_=chttp_tt_182",
  "title": "Annie Hall"
}, {
  "url": "/title/tt0093779/?ref_=chttp_tt_183",
  "title": "The Princess Bride"
}, {
  "url": "/title/tt0469494/?ref_=chttp_tt_184",
  "title": "There Will Be Blood"
}, {
  "url": "/title/tt2278388/?ref_=chttp_tt_185",
  "title": "The Grand Budapest Hotel"
}, {
  "url": "/title/tt0092005/?ref_=chttp_tt_186",
  "title": "Stand by Me"
}, {
  "url": "/title/tt0401792/?ref_=chttp_tt_187",
  "title": "Sin City"
}, {
  "url": "/title/tt0052618/?ref_=chttp_tt_188",
  "title": "Ben-Hur"
}, {
  "url": "/title/tt0053198/?ref_=chttp_tt_189",
  "title": "The 400 Blows"
}, {
  "url": "/title/tt0245712/?ref_=chttp_tt_190",
  "title": "Amores Perros"
}, {
  "url": "/title/tt0107207/?ref_=chttp_tt_191",
  "title": "In the Name of the Father"
}, {
  "url": "/title/tt0405159/?ref_=chttp_tt_192",
  "title": "Million Dollar Baby"
}, {
  "url": "/title/tt0032551/?ref_=chttp_tt_193",
  "title": "The Grapes of Wrath"
}, {
  "url": "/title/tt0032138/?ref_=chttp_tt_194",
  "title": "The Wizard of Oz"
}, {
  "url": "/title/tt1028532/?ref_=chttp_tt_195",
  "title": "Hachi: A Dog's Tale"
}, {
  "url": "/title/tt0060827/?ref_=chttp_tt_196",
  "title": "Persona"
}, {
  "url": "/title/tt0036868/?ref_=chttp_tt_197",
  "title": "The Best Years of Our Lives"
}, {
  "url": "/title/tt0848228/?ref_=chttp_tt_198",
  "title": "Avengers Assemble"
}, {
  "url": "/title/tt0087544/?ref_=chttp_tt_199",
  "title": "Nausicaä of the Valley of the Wind"
}, {
  "url": "/title/tt0440963/?ref_=chttp_tt_200",
  "title": "The Bourne Ultimatum"
}, {
  "url": "/title/tt0083987/?ref_=chttp_tt_201",
  "title": "Gandhi"
}, {
  "url": "/title/tt2084970/?ref_=chttp_tt_202",
  "title": "The Imitation Game"
}, {
  "url": "/title/tt0246578/?ref_=chttp_tt_203",
  "title": "Donnie Darko"
}, {
  "url": "/title/tt0056801/?ref_=chttp_tt_204",
  "title": "8½"
}, {
  "url": "/title/tt1954470/?ref_=chttp_tt_205",
  "title": "Gangs of Wasseypur"
}, {
  "url": "/title/tt0044079/?ref_=chttp_tt_206",
  "title": "Strangers on a Train"
}, {
  "url": "/title/tt0338564/?ref_=chttp_tt_207",
  "title": "Infernal Affairs"
}, {
  "url": "/title/tt0079944/?ref_=chttp_tt_208",
  "title": "Stalker"
}, {
  "url": "/title/tt0114746/?ref_=chttp_tt_209",
  "title": "Twelve Monkeys"
}, {
  "url": "/title/tt0073195/?ref_=chttp_tt_210",
  "title": "Jaws"
}, {
  "url": "/title/tt1130884/?ref_=chttp_tt_211",
  "title": "Shutter Island"
}, {
  "url": "/title/tt1877832/?ref_=chttp_tt_212",
  "title": "X-Men: Days of Future Past"
}, {
  "url": "/title/tt0044706/?ref_=chttp_tt_213",
  "title": "High Noon"
}, {
  "url": "/title/tt0169102/?ref_=chttp_tt_214",
  "title": "Lagaan: Once Upon a Time in India"
}, {
  "url": "/title/tt0038787/?ref_=chttp_tt_215",
  "title": "Notorious"
}, {
  "url": "/title/tt0088247/?ref_=chttp_tt_216",
  "title": "The Terminator"
}, {
  "url": "/title/tt0112471/?ref_=chttp_tt_217",
  "title": "Before Sunrise"
}, {
  "url": "/title/tt1504320/?ref_=chttp_tt_218",
  "title": "The King's Speech"
}, {
  "url": "/title/tt0107048/?ref_=chttp_tt_219",
  "title": "Groundhog Day"
}, {
  "url": "/title/tt1201607/?ref_=chttp_tt_220",
  "title": "Harry Potter and the Deathly Hallows: Part 2"
}, {
  "url": "/title/tt1220719/?ref_=chttp_tt_221",
  "title": "Ip Man"
}, {
  "url": "/title/tt0083922/?ref_=chttp_tt_222",
  "title": "Fanny and Alexander"
}, {
  "url": "/title/tt0058946/?ref_=chttp_tt_223",
  "title": "The Battle of Algiers"
}, {
  "url": "/title/tt0075148/?ref_=chttp_tt_224",
  "title": "Rocky"
}, {
  "url": "/title/tt0072890/?ref_=chttp_tt_225",
  "title": "Dog Day Afternoon"
}, {
  "url": "/title/tt0048424/?ref_=chttp_tt_226",
  "title": "The Night of the Hunter"
}, {
  "url": "/title/tt0198781/?ref_=chttp_tt_227",
  "title": "Monsters, Inc."
}, {
  "url": "/title/tt0113247/?ref_=chttp_tt_228",
  "title": "La Haine"
}, {
  "url": "/title/tt0353969/?ref_=chttp_tt_229",
  "title": "Memories of Murder"
}, {
  "url": "/title/tt0061184/?ref_=chttp_tt_230",
  "title": "Who's Afraid of Virginia Woolf?"
}, {
  "url": "/title/tt0047528/?ref_=chttp_tt_231",
  "title": "La Strada"
}, {
  "url": "/title/tt0325980/?ref_=chttp_tt_232",
  "title": "Pirates of the Caribbean: The Curse of the Black Pearl"
}, {
  "url": "/title/tt0072684/?ref_=chttp_tt_233",
  "title": "Barry Lyndon"
}, {
  "url": "/title/tt0058461/?ref_=chttp_tt_234",
  "title": "For a Fistful of Dollars"
}, {
  "url": "/title/tt0092067/?ref_=chttp_tt_235",
  "title": "Laputa: Castle in the Sky"
}, {
  "url": "/title/tt0120382/?ref_=chttp_tt_236",
  "title": "The Truman Show"
}, {
  "url": "/title/tt0038355/?ref_=chttp_tt_237",
  "title": "The Big Sleep"
}, {
  "url": "/title/tt1454029/?ref_=chttp_tt_238",
  "title": "The Help"
}, {
  "url": "/title/tt0107290/?ref_=chttp_tt_239",
  "title": "Jurassic Park"
}, {
  "url": "/title/tt0061722/?ref_=chttp_tt_240",
  "title": "The Graduate"
}, {
  "url": "/title/tt0046250/?ref_=chttp_tt_241",
  "title": "Roman Holiday"
}, {
  "url": "/title/tt0054997/?ref_=chttp_tt_242",
  "title": "The Hustler"
}, {
  "url": "/title/tt0070511/?ref_=chttp_tt_243",
  "title": "Papillon"
}, {
  "url": "/title/tt0101414/?ref_=chttp_tt_244",
  "title": "Beauty and the Beast"
}, {
  "url": "/title/tt0118694/?ref_=chttp_tt_245",
  "title": "In the Mood for Love"
}, {
  "url": "/title/tt1392214/?ref_=chttp_tt_246",
  "title": "Prisoners"
}, {
  "url": "/title/tt0154420/?ref_=chttp_tt_247",
  "title": "Festen"
}, {
  "url": "/title/tt0040746/?ref_=chttp_tt_248",
  "title": "Rope"
}, {
  "url": "/title/tt0056217/?ref_=chttp_tt_249",
  "title": "The Man Who Shot Liberty Valance"
}, {
  "url": "/title/tt0381681/?ref_=chttp_tt_250",
  "title": "Before Sunset"
}];

// var async = require("async");

// var i = 250;
// async.mapLimit(all, 5, function(v, callback) {
// 	request("http://www.imdb.com"+v.url, function(err, res, html) {
// 		var $ = cheerio.load(html);
// 		var arr = [];
// 		$(".cast_list .itemprop a").map(function(i, v){arr.push($(v).text().trim())});
// 		console.log(i--);
// 		callback(null, {title:v.title, characters: arr});
// 	});
// }, function(err, all) {
// 	console.log(JSON.stringify(all));
// });

/*
 var markov = require("./markov");
 var m = new markov();

 m.pretrainBuzzfeedLists();

// //m.pretrainHoroscope();
// m.pretrainWikipediaSubject("pickle", function() {
 	console.log(m.generate(10, 10, 4));
// });
*/
