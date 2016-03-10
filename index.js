/**
 * Require deps
 */
var stopWords = require('./stopwords.json')

exports.wrest = function (source, options) {
	var results		= []
	var words 		= []
	var dictionary 	= []

	if (!source) return []
	if (typeof source !== 'string') source = source.toString()

	if (!options) options						= {}
	if (!options.limit) options.limit 			= 0
	if (!options.frequency) options.frequency 	= false
	if (!options.min) options.min				= 2
	if (!options.stopWords) options.stopWords	= []
	if (!options.nWords) options.nWords 		= 1

	stopWords = stopWords.concat(options.stopWords)

	words = splitWords(options.nWords, source)

	words.forEach(function(e, i, a){
		var word = {
			word: e,
			frequency : 1
		}
		if (!isStopWord(e)){
			(isInDictionary(e, dictionary))
				? incrementFrequency(e, dictionary)
				: dictionary.push(word)
		}
	})

	dictionary.sort(compare)

	dictionary = removeBelowMin(options.min, dictionary)

	results = (options.frequency)
		? objArrayWithFrequency(dictionary)
		: toWordArray(dictionary)

	if(results.length > options.limit && options.limit != 0) results = results.slice(0, options.limit);

	return results;
}

/**
 * Turn array of objects into a different formatted object.
 * @param  {Array} a Array of objects
 * @return {Array}   Array of objects
 */
function objArrayWithFrequency(a){
	var ret = []
	for(var i = 0; i < a.length; i++) {
		var obj = {}
		obj[a[i].word] = a[i].frequency
		ret.push(obj)
	}
	return ret
}

/**
 * Turn array of objects to final array of words.
 * @param  {Array} a Array of objects
 * @return {Array}   Final array
 */
function toWordArray(a){
	var ret = []
	for(var i = 0; i < a.length; i++) {
		ret.push(a[i].word)
	}
	return ret
}

/**
 * Increment the number of occurances found.
 * @param  {String} k Keyword to search
 * @param  {Array} a Array of objects
 */
function incrementFrequency (k, a) {
	for(var i = 0; i < a.length; i++) {
		if(a[i].word === k) {
			a[i].frequency += 1
			return
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
            return true
        }
    }
    return false
}

/**
 * Compare frequencies and sort.
 * @param  {Number} a Frequency a
 * @param  {Number} b Frequency b
 */
function compare(a,b) {
  if (a.frequency > b.frequency)
     return -1
  if (a.frequency < b.frequency)
    return 1
  return 0
}

/**
 * Check if the given word is a stop word.
 * @param  {String}  word Word to check against the stop words
 * @return {Boolean}      Return true if found
 */
function isStopWord(word){
	return (stopWords.indexOf(word) == -1)
		? false
		: true
}

/**
 * Remove occurances below the specified threshold.
 * @param  {Number} min  The specified threshold
 * @param  {Array} dict  The array of words to check
 * @return {Array}       The return array (same as dict)
 */
function removeBelowMin(min, dict){
	for(var	i=0; i < dict.length; i++){
		if(dict[i].frequency < min) dict.splice(i, i+1)
	}
	return dict
}

/**
 * Split the string into groups of n words.
 * @param  {Number} n      The number of words in the group.
 * @param  {String} string The string to split up.
 * @return {Array}         The return array.
 */
function splitWords(n, string){
	var array = string.split(" ")
	var words = []
	for(var i=0;i<array.length;i++){
	    words.push(array.slice(i,i+n).join(' '))
	    i+=(n-1)
	}
	return words
}