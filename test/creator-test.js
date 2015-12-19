/* global describe it */

var assert = require('chai').assert;
var mockfs = require('mock-fs');
var creator = require('../lib/creator');
var _ = require('lodash');
var yaml = require('js-yaml');
var fs = require('fs');
var path = require('path');
var exists = fs.existsSync || path.existsSync;

var testData = yaml.safeLoad(fs.readFileSync('./test/fixtures/format-file-test-cases.yml', 'utf8'));

var TEMP_DIR = '/tmp/bemstyla';
/**
 */
var clearTemp = function () {
	mockfs.restore();
	var mockData = {};
	mockData[TEMP_DIR] = {};
	mockfs(mockData);
};

describe('creator', function () {
	it('should be `Object`', function () {
		assert.isObject(creator);
	});

	describe('_mkdir', function () {
		/**
		* @param {String} term
		* @param {Function} done
		* @param {Number} [index=0]
		*/
		function test(term, done, index) {
			index = index === undefined ? -1 : index;
			if (++index >= testData.length) {
				done();
				return;
			}

			clearTemp();
			var data = testData[index];
			var _dir = data.output[term].file.dir;
			var dir = path.join(TEMP_DIR, _dir);

			if (_dir === '') {
				test(term, done, index);
				return;
			}

			assert.notOk(exists(dir), 'rm ' + _dir);

			creator._mkdir(dir)
				.then(function () {
					assert.ok(exists(dir), 'mk ' + _dir);
				})
				.finally(function () {
					test(term, done, index);
				});
		}

		it('should add block dir', function (done) {
			test('block', done);
		});

		it('should add block mod dir', function (done) {
			test('bmod', done);
		});

		it('should add elem dir', function (done) {
			test('elem', done);
		});

		it('should add elem mod dir', function (done) {
			test('emod', done);
		});

		it('should not reject if directory already exists', function (done) {
			mockfs.restore();

			var dirPath = path.join(TEMP_DIR, 'block');

			var mockData = {};
			mockData[dirPath] = {};
			mockfs(mockData);

			assert.ok(exists(dirPath));
			creator._mkdir(dirPath)
			.then(function () {
				assert.ok(exists(dirPath));
				done();
			})
			.catch(function () {
				assert.ok(false);
			});
		});
	});

	describe('#touch', function () {
		/**
		* @param {String} term
		* @param {Function} done
		* @param {Number} [index=0]
		*/
		function test(term, done, index) {
			index = index === undefined ? -1 : index;
			if (++index >= testData.length) {
				done();
				return;
			}

			clearTemp();
			var data = testData[index];
			var fileData = _.clone(data.output[term].file);

			if (!fileData.dir || !fileData.name) {
				test(term, done, index);
				return;
			}

			_.merge(fileData, {
				dir: path.join(TEMP_DIR, fileData.dir)
			});

			creator.touch(fileData)
				.then(function () {
					var filePath = path.join(fileData.dir, fileData.name + '.' + fileData.ext);
					assert.isTrue(fs.statSync(filePath).isFile());
					assert.equal(fileData.content, fs.readFileSync(filePath).toString());
				})
				.catch(function () {
					assert.ok(false);
				})
				.finally(function () {
					test(term, done, index);
				});
		}

		it('should add block file', function (done) {
			test('block', done);
		});

		it('should add block mod file', function (done) {
			test('bmod', done);
		});

		it('should add elem file', function (done) {
			test('elem', done);
		});

		it('should add elem mod file', function (done) {
			test('emod', done);
		});

		it('should not rewrite exists files', function (done) {
			mockfs.restore();

			var fileData = {
				dir: path.join(TEMP_DIR, 'block'),
				name: 'block',
				ext: 'styl',
				content: '.block\n    {}'
			};
			var filePath = path.join(fileData.dir, fileData.name + '.' + fileData.ext);

			var testText = 'Foo';
			var mockData = {};
			mockData[filePath] = testText;
			mockfs(mockData);

			assert.equal(fs.readFileSync(filePath), testText);
			creator.touch(fileData)
				.finally(function () {
					assert.equal(fs.readFileSync(filePath).toString(), testText);
					done();
				})
				.catch(function () {});
		});

		it('should write correct formatted file content', function (done) {
			clearTemp();

			var fileData = {
				dir: path.join(TEMP_DIR, 'block'),
				name: 'block',
				ext: 'styl',
				content: '.block {\n}'
			};
			var filePath = path.join(fileData.dir, fileData.name + '.' + fileData.ext);
			var testText = '.block {\n}';

			assert.notOk(exists(filePath));
			creator.touch(fileData)
				.finally(function () {
					assert.equal(fs.readFileSync(filePath).toString(), testText);
					done();
				})
				.catch(function () {
					assert.equal(fs.readFileSync(filePath).toString(), testText);
					done();
				});
		});
	});
});
