var keys = require('../'),
	assert = require("assert");

describe('wrest()', function(){
  it('Should return empty set', function(){
    assert.equal('', keys.wrest());
  })
})

describe('wrest(num,[])', function(){
	it('Should return results toString()', function(){
		assert.equal('3', keys.wrest(3));
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
		assert.deepEqual(["foo","bar","baz"], keys.wrest('foo foo foo foo bar bar bar bar baz coffee coffee coffee coffee toffee toffee', {stopWords:["coffee","toffee"]}))
	})
})