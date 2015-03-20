## Keyword Analyzer

A nodejs module for discovering keywords for a given text input.

## Introduction

The keyword analyzer tool allows you to find what keywords are most prevalent for a given input of text and allows you to specify options for configuring it to your needs. A basic example below shows you how it functions.

    var keyword-analyzer = require('keyword-analyzer')

    keyword-analyzer.wrest('bar bar bar foo foo foo foo'); // ["foo", "bar"]

## Installation

    npm install --save keyword-analyzer

## Usage
## .wrest(string[, options])
You can supply several options to configure how you want to find keywords.

### Option: limit - .wrest(string,{ limit : int })
This specifies the max keyword results you want to be returned in the array. Defaults to all.

### Option: frequency - .wrest(string,{ frequency : bool })
This determines whether or not the keywords will be returned with the number of times used in the text. Defaults to false.

Returned array will look like this: `[{foo:3, bar:2}]`

### Option: min - .wrest(string,{ min : int })
The minimum times a word should be found in text to be returned. Defaults to 2.

### Option: stopWords - .wrest(string,{ stopWords : arr })
A way to add additional stopwords to check against.

### Option: nWords - .wrest(string,{ nWords : int })
Number of words to count as one keyword. A way to check phrases.

## License
MIT