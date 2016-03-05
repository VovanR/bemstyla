/* global describe it */

var assert = require('chai').assert;
var formatFile = require('../lib/format-file');
var clone = require('clone');

describe('formatFile', function () {
	it('should be `Object`', function () {
		assert.isObject(formatFile);
	});

	describe('#format', function () {
		var testResult = {
			block: {
				file: {
					name: '',
					dir: '',
					ext: 'styl'
				}
			},
			bmod: {
				file: {
					name: '',
					dir: '',
					ext: 'styl'
				}
			},
			elem: {
				file: {
					name: '',
					dir: '',
					ext: 'styl'
				}
			},
			emod: {
				file: {
					name: '',
					dir: '',
					ext: 'styl'
				}
			}
		};

		it('should return mixed JSON object', function () {
			var res = clone(testResult);

			assert.deepEqual(formatFile.format(), res);
		});

		it('should not assign objects', function () {
			var res = clone(testResult);

			var formatted = formatFile.format();
			assert.deepEqual(formatted, res);
			formatted.block.file.dir = 'foo';
			res.block.file.dir = 'foo';
			assert.deepEqual(formatted, res);
		});

		it('should set filetype', function () {
			var res = clone(testResult);
			for (var r in res) {
				if (res.hasOwnProperty(r)) {
					res[r].file.ext = 'css';
				}
			}

			var formatted = formatFile.format({
				fileType: 'css'
			});
			assert.deepEqual(formatted, res);
		});
	});
});
