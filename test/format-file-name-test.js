/* global describe it */

var fs = require('fs');
var yaml = require('js-yaml');
var assert = require('chai').assert;
var formatFileName = require('../lib/format-file-name');

var testData = yaml.safeLoad(fs.readFileSync('./test/fixtures/format-file-test-cases.yml', 'utf8'));

describe('formatFileName', function () {
	it('should be `Object`', function () {
		assert.isObject(formatFileName);
	});

	describe('#format', function () {
		it('should format file names object', function () {
			testData.forEach(function (data) {
				assert.deepEqual(
					formatFileName.format(data.input),
					{
						block: {
							file: {
								name: data.output.block.file.name
							}
						},
						bmod: {
							file: {
								name: data.output.bmod.file.name
							}
						},
						elem: {
							file: {
								name: data.output.elem.file.name
							}
						},
						emod: {
							file: {
								name: data.output.emod.file.name
							}
						}
					}
				);
			});
		});
	});
});
