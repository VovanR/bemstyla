/* global describe it */

var assert = require('chai').assert;
var formatFileContent = require('../lib/format-file-content');
var _ = require('lodash');
var yaml = require('js-yaml');
var fs = require('fs');

var testData = yaml.safeLoad(fs.readFileSync('./test/fixtures/format-file-content-test-cases.yml', 'utf8'));

describe('formatFileContent', function () {
	it('should be `Object`', function () {
		assert.isObject(formatFileContent);
	});

	describe('#format', function () {
		it('should format file content object', function (done) {
			_.forEach(testData, function (data) {
				var result;
				if (data.format) {
					result = formatFileContent.format(data.input, data.format);
				} else {
					result = formatFileContent.format(data.input);
				}
				assert.deepEqual(
					result,
					{
						block: {
							file: {
								content: data.output.block.file.content
							}
						},
						bmod: {
							file: {
								content: data.output.bmod.file.content
							}
						},
						elem: {
							file: {
								content: data.output.elem.file.content
							}
						},
						emod: {
							file: {
								content: data.output.emod.file.content
							}
						}
					}
				);
			});
			done();
		});
	});
});
