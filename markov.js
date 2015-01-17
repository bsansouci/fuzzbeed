"use strict";


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
		var sentences = string.split(/[!?.]+/).filter(function(x) {return x.length > 0;});
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

	 var generateSentence = function(maxWords) {
		var prev = startWords[rand(startWords.length)];
		var addedWords = 0;
		var sentence = "";
		while (prev !== "."){
			sentence += prev + " ";
			prev = hashMap[hash(prev)][rand(hashMap[hash(prev)].length)];
			if (addedWords++ > maxWords) return generateSentence(maxWords);
		}
		sentence = sentence.slice(0,-1) + ".";
		return sentence;
	};

	 this.generate = function(sentenceCount, maxWordsPerSentence, filter) {
		var numSentences = 0;
		var allSentences = "";
		while (numSentences < sentenceCount){
			var s = generateSentence(maxWordsPerSentence);
			if (filter === undefined || filter(s)){
				allSentences += s + "  ";
				numSentences++;
			}
		}
		return allSentences;
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
		jsonList.push([ { "property1": "1. This large breasted cappuccino." }, { "property1": "2. This tree with DAT ASS." }, { "property1": "3. This stawberry with a badonk." }, { "property1": "4. This nipple egg." }, { "property1": "5. This sexy rock pile." }, { "property1": "6. This sensual carrot." }, { "property1": "7. This bro’s butt chest." }, { "property1": "8. This tree with a lot of junk in the trunk." }, { "property1": "9. Whatever this is." }, { "property1": "10. These training balls." }, { "property1": "11. This NSFW yogurt." }, { "property1": "12. This strawberry with weird boobs." }, { "property1": "13. These boob mushrooms." }, { "property1": "14. This naughty box." }, { "property1": "15. This THICK and CREAMY mac and cheese." }, { "property1": "16. This interestingly shaped carrot." }, { "property1": "17. And this dude’s confidence." } ]);
		jsonList.push([ { "property1": "1. This majestic camouflage armchair." }, { "property1": "2. These pads who finally found their chill." }, { "property1": "3. This cake awaiting Willcome at home." }, { "property1": "4. This sacrificial altar of retail greatness in the bathroom." }, { "property1": "5. This vengeful chicken." }, { "property1": "6. These magical dress shoes that improve exponentially with age." }, { "property1": "7. This bargain to beat all bargains." }, { "property1": "8. This mini-horse, the ultimate finder of bargains." }, { "property1": "9. This meticulously priced lawn furniture." }, { "property1": "10. This shirt, telling the most romantic story ever told." }, { "property1": "11. This carefully engraved bottle of Clorox." }, { "property1": "12. This display of tremendous markdowns." }, { "property1": "13. This most rare and precious hand soap." }, { "property1": "14. These ever-morphing chameleon pails." }, { "property1": "15. This display of the dark side of geometry." }, { "property1": "16. This heartfelt message for the recent graduate." }, { "property1": "17. This insane amount of irony." }, { "property1": "18. These potatoes of mystery and wonder." }, { "property1": "19. And, of course, this perfect gift." } ]);
		for (var i = jsonList.length - 1; i >= 0; i--) {
			var json = jsonList[i];
			for (var j = json.length - 1; j >= 0; j--) {
				var listItem = json[j]["property1"];
				listItem = listItem.replace(/^[0-9]+\./g, "");
				this.train(listItem);
			}
		}
	};

	// this.pretrainWikipediaSubject = function(subject) {
	// 	var scraper = require('scraper');
	// 	scraper('http://search.twitter.com/search?q=javascript', function(err, jQuery) {
 //    	if (err) {throw err}
 //    		jQuery('.msg').each(function() {
 //        		console.log(jQuery(this).text().trim()+'\n');
 //    		});
	// 	});
	// }
};

//var m = new Markov();

// Ted Moseby
//m.train("Ted is prone to socially questionable romantic gestures; in the pilot episode, for example, he steals a blue French horn (nicknamed \"The Smurf Penis\") that was a topic of conversation in his first date with Robin, and then scares Robin off by telling her he is in love with her. In a similar vein, he dresses up as a \"hanging chad\" every year for Halloween, in the hopes of meeting \"The Slutty Pumpkin,\" a woman dressed as a jack-o'-lantern (complete with strategically placed holes) whom he once met at a Halloween party. Ted describes himself as \"half-Jewish.\" He is seen cheering for the Cleveland Indians when they play the New York Yankees at a baseball game in the episode \"Where Were We?\". He and Marshall were randomly assigned as freshman year roommates at Wesleyan, and became best friends on a long, ill-fated road trip. This story was told in \"Arrivederci, Fiero\". In several episodes Ted's claim of being \"vomit-free since '93\" is mentioned, although it is untrue. Ted knows French and sign language, and has a strong tendency to correct everything that people around him say. As a child, he had a detective club called \"The Mosby Boys\". He also speaks and reads Spanish, albeit clumsily. Pablo Neruda is one of his favorite writers.");

//m.pretrainWikipediaSubject("");

//m.pretrainBuzzfeedLists();
//console.log(m.generate(10, 10));




