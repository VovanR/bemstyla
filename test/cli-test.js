/* global describe it */

var assert = require('chai').assert;
var fs = require('fs');
var path = require('path');
var tempfile = require('tempfile');
var execa = require('execa');

function exists(pathName) {
	try {
		fs.statSync(pathName);
		return true;
	} catch (err) {
		return false;
	}
}

var FN = path.join(process.cwd(), 'bin', 'bemstyla.js');
var TEMP_DIR = tempfile();
fs.mkdirSync(TEMP_DIR);

describe('cli', function () {
	it('should show help', function (done) {
		execa(FN)
			.then(function (result) {
				assert.isTrue(/Usage:/.test(result.stdout));
				done();
			});
	});

	it('should show version', function (done) {
		execa(FN, ['-V'])
			.then(function (result) {
				assert.equal(result.stdout, '1.3.1');
				done();
			});
	});

	it('should create folder and file', function (done) {
		assert.isFalse(exists(path.join(TEMP_DIR, 'foo')));
		var p = path.join(TEMP_DIR, 'foo');
		execa(FN, ['foo'], {cwd: TEMP_DIR})
			.then(function () {
				assert.isTrue(exists(p));
				assert.isTrue(exists(path.join(TEMP_DIR, 'foo', 'foo.styl')));
				done();
			});
	});

	it('should create file with custom extension', function (done) {
		var p = path.join(TEMP_DIR, 'foo', 'foo.css');
		assert.isFalse(exists(p));
		execa(FN, ['-t', 'css', 'foo'], {cwd: TEMP_DIR})
			.then(function () {
				assert.isTrue(exists(p));
				done();
			});
	});

	it('should create file with custom format', function (done) {
		var p = path.join(TEMP_DIR, 'bar', 'bar.styl');
		assert.isFalse(exists(p));
		execa(FN, ['-f', 'css', 'bar'], {cwd: TEMP_DIR})
			.then(function () {
				assert.isTrue(exists(p));
				assert.equal(fs.readFileSync(p).toString(), '.bar {\n}');
				done();
			});
	});

	it('should create file with content, based on extension', function (done) {
		var p = path.join(TEMP_DIR, 'baz', 'baz.css');
		assert.isFalse(exists(p));
		execa(FN, ['-t', 'css', 'baz'], {cwd: TEMP_DIR})
			.then(function () {
				assert.isTrue(exists(p));
				assert.equal(fs.readFileSync(p).toString(), '.baz {\n}');
				done();
			});
	});

	it('should create file with custom extension and content', function (done) {
		var p = path.join(TEMP_DIR, 'qux', 'qux.css');
		assert.isFalse(exists(p));
		execa(FN, ['-t', 'css', '-f', 'styl', 'qux'], {cwd: TEMP_DIR})
			.then(function () {
				assert.isTrue(exists(p));
				assert.equal(fs.readFileSync(p).toString(), '.qux\n    {}');
				done();
			});
	});

	it('should create file in custom dir', function (done) {
		var c = path.join(TEMP_DIR, 'custom');
		fs.mkdirSync(c);
		var p = path.join(c, 'foo');
		assert.isFalse(exists(p));
		execa(FN, ['-d', 'custom', 'foo'], {cwd: TEMP_DIR})
			.then(function () {
				assert.isTrue(exists(p));
				done();
			});
	});
});
