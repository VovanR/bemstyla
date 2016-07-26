/* global describe it */

var fs = require('fs');
var yaml = require('js-yaml');
var assert = require('chai').assert;
var formatFileDir = require('../lib/format-file-dir');

var testData = yaml.safeLoad(fs.readFileSync('./test/fixtures/format-file-test-cases.yml', 'utf8'));

describe('formatFileDir', function () {
	it('should be `Object`', function () {
		assert.isObject(formatFileDir);
	});

	describe('#format', function () {
		it('should format file dirs object', function () {
			testData.forEach(function (data) {
				assert.deepEqual(
					formatFileDir.format(data.input),
					{
						block: {
							file: {
								dir: data.output.block.file.dir
							}
						},
						bmod: {
							file: {
								dir: data.output.bmod.file.dir
							}
						},
						elem: {
							file: {
								dir: data.output.elem.file.dir
							}
						},
						emod: {
							file: {
								dir: data.output.emod.file.dir
							}
						}
					},
					data.input
				);
			});
		});

		it('should resolve base dir path', function () {
			assert.deepEqual(
				formatFileDir.format('foo__bar_baz', '/tmp/bemstyla'),
				{
					block: {
						file: {
							dir: '/tmp/bemstyla/foo'
						}
					},
					bmod: {
						file: {
							dir: ''
						}
					},
					elem: {
						file: {
							dir: '/tmp/bemstyla/foo/__bar'
						}
					},
					emod: {
						file: {
							dir: '/tmp/bemstyla/foo/__bar/_baz'
						}
					}
				}
			);
		});

		it('should normalize base dir path', function () {
			assert.deepEqual(
				formatFileDir.format('foo', '/tmp//bemstyla/').block,
				{
					file: {
						dir: '/tmp/bemstyla/foo'
					}
				}
			);
		});
	});
});
