"use strict";



function Markov () {

	var startWords = [];

	var hashMap = {};
	


	 var hash = function(word) {
		return "-hashed-" + word;
	}

	 var hashMapPut = function (key, value) {
		if (!hashMap[hash(key)]) // if word's not in the map yet
			hashMap[hash(key)] = [];
		hashMap[hash(key)].push(value);
	}

	 var rand = function(max){
		return Math.floor(Math.random() * max);
	}


	 this.train = function(string) {
		var sentences = string.split(/[!?.]+/).filter(function(x) {return x.length > 0});
		sentences.map(trainSentence);
	}

	 var trainSentence = function(sentence) {
		var wordList = sentence.split(/[ \t\n]+/).filter(function(x) {return x.length > 0});
		// representing beginning of sentence
		var previousWord = null;
		for (var i = 0; i < wordList.length; i++) {

			if (previousWord === null)
				startWords.push(wordList[i]);
			else {
				hashMapPut(previousWord, wordList[i]);
			}
			previousWord = wordList[i];
		};
		hashMapPut(previousWord, ".");
	}

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
	}

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

	}
};

var m = new Markov();
m.train("Ted is prone to socially questionable romantic gestures; in the pilot episode, for example, he steals a blue French horn (nicknamed \"The Smurf Penis\") that was a topic of conversation in his first date with Robin, and then scares Robin off by telling her he is in love with her. In a similar vein, he dresses up as a \"hanging chad\" every year for Halloween, in the hopes of meeting \"The Slutty Pumpkin,\" a woman dressed as a jack-o'-lantern (complete with strategically placed holes) whom he once met at a Halloween party. Ted describes himself as \"half-Jewish.\" He is seen cheering for the Cleveland Indians when they play the New York Yankees at a baseball game in the episode \"Where Were We?\". He and Marshall were randomly assigned as freshman year roommates at Wesleyan, and became best friends on a long, ill-fated road trip. This story was told in \"Arrivederci, Fiero\". In several episodes Ted's claim of being \"vomit-free since '93\" is mentioned, although it is untrue. Ted knows French and sign language, and has a strong tendency to correct everything that people around him say. As a child, he had a detective club called \"The Mosby Boys\". He also speaks and reads Spanish, albeit clumsily. Pablo Neruda is one of his favorite writers.");
m.train("Intuition plays a large part in your work. You're apt to sense what others want or need and foresee the consequences of one course of action over another. This is definitely going to make a positive difference in what you accomplish. You're likely to be quite pleased with what you do. Exercise this intuition today so it will stay with you in the future.");
m.train("Information that you receive from far away could make doing business with a group you're affiliated with that much easier. Travel might also be on your mind. Friends could be inclined to consider the idea, so it might be fun to go out on the town with them tonight.");
m.train("You're probably feeling optimistic and enthusiastic about your future. You could lapse into some very pleasant daydreams about the possibilities, but don't get carried away. Try to remain practical.");
m.train("You're more likely to get the results you want. You've got a lot to think about.");
m.train("You might toy with the idea of getting some kind of project or enterprise going with a close friend or love partner. Go for it.");
m.train("You might like to get on the phone and run ideas for new projects by colleagues or perhaps make arrangements to complete current projects. Success through creativity is strongly indicated at this time. If this has been on your mind, get started.");
m.train("You probably feel especially optimistic about this. You're looking forward to new opportunities that may come your way. Your intuition is high, so you're likely to be able to separate the wheat from the chaff where opportunities are concerned. Go for it.");
m.train("Don't hesitate. Have a great day.");
m.train("You feel especially optimistic and enthusiastic, although you may not know why.");
console.log(m.generate(10, 50));
