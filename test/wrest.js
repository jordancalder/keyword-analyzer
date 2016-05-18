var keys = require('../'),
	assert = require("assert");

describe('wrest()', function(){
  it('Should return empty set', function(){
    assert.equal('', keys.wrest());
  })
})

describe('wrest(num,[])', function(){
	it('Should return results toString()', function(){
		assert.equal('3', keys.wrest(3, {min:1}));
	})
})

describe('wrest(string,[])', function () {
	it('Should return array of results', function(){
		assert.deepEqual(["bar", "foo"], keys.wrest('foo foo bar bar bar'))
	})
})

describe('wrest(string, {limit:2})', function(){
	it('Should limit result', function(){
		assert.deepEqual(["bar", "foo"], keys.wrest('foo foo foo bar bar bar bar baz baz', {limit : 2}))
	})
})

describe('wrest(string, {frequency:true})', function(){
	it('Should allow for showing word frequency', function(){
		assert.deepEqual([{foo:3},{bar:2}], keys.wrest('foo bar foo bar foo', {frequency : true}))
	})
})

describe('wrest(string,[])', function(){
	it('Should not count stop words', function(){
		assert.deepEqual(["foo","bar"], keys.wrest('foo bar bar and foo foo'))
	})
})

describe('wrest(string, {stopWords:[]})', function(){
	it('Should allow added stop words', function(){
		assert.deepEqual(["foo","bar","baz"], keys.wrest('foo foo foo foo bar bar bar bar baz baz baz coffee coffee coffee coffee toffee toffee', {stopWords:["coffee","toffee"]}))
	})
})

describe('wrest(string, {min:int})', function(){
	it('Should return only words with the minimum occurances', function(){
		assert.deepEqual(["foo", "bar"], keys.wrest('foo foo foo foo foo bar bar bar bar baz baz baz', {min:4}))
	})
})

describe('wrest(string, {nwords:2})', function(){
	it('Should return words in groups if nwords specified', function(){
		assert.deepEqual(["foo bar", "other stuff"], keys.wrest('foo bar other stuff foo bar other stuff foo bar', {nWords:2}))
	})
})

describe('wrest(string, {limit:2})', function(){
	it('Should return results stripped of punctuation, except hyphen, space, and underscore', function(){
		assert.deepEqual(["foo", "bar", "foo-bar", "bar_foo"], keys.wrest('foo, bar. foo. bar. foo-bar foo-bar. bar_foo bar_foo?', {limit:4}))
	})
})

describe('wrest(string, {limit:2})', function(){
	it('Should return case-insensitive results', function(){
		assert.deepEqual(["foo", "bar"], keys.wrest('Foo bar. Bar Foo foo', {limit:2}))
	})
})