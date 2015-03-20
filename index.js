/**
 * Require deps
 */
var stopWords = require('./stopWords.json');

exports.wrest = function (source, options) {
	var results			= [];
	var words 			= [];
	var dictionary 	= [];

	if (!source) return [];
	if (typeof source !== 'string') source = source.toString();

	if (!options) options 											= {};
	if (!options.limit) options.limit 					= 0;
	if (!options.frequency) options.frequency 	= false;
	if (!options.min) options.min								= 2;
	if (!options.stopWords) options.stopWords		= [];
	if (!options.nWords) options.nWords 				= 1;

	stopWords = stopWords.concat(options.stopWords);

	words = source.toLowerCase().split(' ');
	words.forEach(function(e, i, a){
		var word = {
			word: e,
			frequency : 1
		};
		if (!isStopWord(e)){
			(isInDictionary(e, dictionary)) ? incrementFrequency(e, dictionary) : dictionary.push(word);
		}
	});

	dictionary.sort(compare);

	(options.frequency) ? results = objArrayWithFrequency(dictionary) : results = toWordArray(dictionary);
	if(results.length > options.limit && options.limit != 0) results = results.slice(0, options.limit);
	return results;
}

/**
 * Turn array of objects into a different formatted object.
 * @param  {Array} a Array of objects
 * @return {Array}   Array of objects
 */
function objArrayWithFrequency(a){
	var ret = [];
	for(var i = 0; i < a.length; i++) {
		var obj = {};
		obj[a[i].word] = a[i].frequency;
		ret.push(obj);
	}
	return ret;
}

/**
 * Turn array of objects to final array of words.
 * @param  {Array} a Array of objects
 * @return {Array}   Final array
 */
function toWordArray(a){
	var ret = [];
	for(var i = 0; i < a.length; i++) {
		ret.push(a[i].word);
	}
	return ret;
}

/**
 * Increment the number of occurances found.
 * @param  {String} k Keyword to search
 * @param  {Array} a Array of objects
 */
function incrementFrequency (k, a) {
	for(var i = 0; i < a.length; i++) {
		if(a[i].word === k) {
			a[i].frequency += 1;
			return;
		}
	}
}

/**
 * Check if keyword is in dictionary.
 * @param  {String}  k Keyword to search
 * @param  {Array}  a Array of objects
 * @return {Boolean}
 */
function isInDictionary(k, a){
    for (var i=0; i < a.length; i++) {
        if (a[i].word === k) {
            return true;
        }
    }
    return false;
}

/**
 * Compare frequencies and sort.
 * @param  {Number} a Frequency a
 * @param  {Number} b Frequency b
 */
function compare(a,b) {
  if (a.frequency > b.frequency)
     return -1;
  if (a.frequency < b.frequency)
    return 1;
  return 0;
}

/**
 * Check if the given word is a stop word.
 * @param  {String}  word Word to check against the stop words
 * @return {Boolean}      Return true if found
 */
function isStopWord(word){
	return (stopWords.indexOf(word) == -1) ? false : true;
}