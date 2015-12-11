/* global describe it afterEach */

var assert = require('chai').assert;
var sinon = require('sinon');
var mockfs = require('mock-fs');
var index = require('../lib/index');

var parser = require('../lib/parser');
var parserJade = require('../lib/parser-jade');
var parserHTML = require('../lib/parser-html');
var formatFile = require('../lib/format-file');
var formatFileDir = require('../lib/format-file-dir');
var formatFileName = require('../lib/format-file-name');
var creator = require('../lib/creator');

describe('index', function () {
	afterEach(function () {
		mockfs.restore();
	});

	it('should be `Function`', function () {
		assert.isFunction(index);
	});

	it('should fire Jade parser if source contains `.jade`', function () {
		sinon.stub(parser, 'parse');
		sinon.stub(parserJade, 'parseFile', function () {
			return {
				/**
				*/
				then: function () {}
			};
		});
		sinon.stub(parserHTML, 'parseFile');
		sinon.stub(formatFile, 'format');
		sinon.stub(formatFileDir, 'format');
		sinon.stub(formatFileName, 'format');
		sinon.stub(creator, 'touch');

		index('foo.jade');
		assert.isTrue(parserJade.parseFile.calledOnce);
		assert.equal(parserJade.parseFile.getCall(0).args[0], 'foo.jade');

		parser.parse.restore();
		parserJade.parseFile.restore();
		parserHTML.parseFile.restore();
		formatFile.format.restore();
		formatFileDir.format.restore();
		formatFileName.format.restore();
		creator.touch.restore();
	});

	it('should fire HTML parser if source contains `.html`', function () {
		sinon.stub(parser, 'parse');
		sinon.stub(parserJade, 'parseFile');
		sinon.stub(parserHTML, 'parseFile', function () {
			return {
				/**
				*/
				then: function () {}
			};
		});
		sinon.stub(formatFile, 'format');
		sinon.stub(formatFileDir, 'format');
		sinon.stub(formatFileName, 'format');
		sinon.stub(creator, 'touch');

		index('foo.html');
		assert.isTrue(parserHTML.parseFile.calledOnce);
		assert.equal(parserHTML.parseFile.getCall(0).args[0], 'foo.html');

		parser.parse.restore();
		parserJade.parseFile.restore();
		parserHTML.parseFile.restore();
		formatFile.format.restore();
		formatFileDir.format.restore();
		formatFileName.format.restore();
		creator.touch.restore();
	});

	it('should fire creator if source is simple string', function (done) {
		sinon.stub(creator, 'touch', function () {
			return {
				/**
				*/
				then: function () {},
				/**
				*/
				catch: function () {}
			};
		});

		index('block__elem_mod')
			.then(function () {
				assert.isTrue(creator.touch.called);
				assert.equal(creator.touch.callCount, 4);

				creator.touch.restore();
				done();
			});
	});

	it('should fire creator if source is array of simple strings', function (done) {
		sinon.stub(creator, 'touch', function () {
			return {
				/**
				*/
				then: function () {},
				/**
				*/
				catch: function () {}
			};
		});

		index(['block__elem_mod', 'foo__bar'])
			.then(function () {
				assert.isTrue(creator.touch.called);
				assert.equal(creator.touch.callCount, 8);

				creator.touch.restore();
				done();
			});
	});

	it('should fire formatFile.format with options', function (done) {
		sinon.stub(formatFile, 'format');
		sinon.stub(creator, 'touch', function () {
			return {
				/**
				*/
				then: function () {},
				/**
				*/
				catch: function () {}
			};
		});

		index('block', 'css')
			.then(function () {
				assert.isTrue(formatFile.format.called);
				assert.deepEqual(formatFile.format.getCall(0).args[0], {
					fileType: 'css'
				});

				creator.touch.restore();
				formatFile.format.restore();
				done();
			});
	});
});
