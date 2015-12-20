/* global describe it */

var assert = require('chai').assert;
var parser = require('../lib/parser');
var _ = require('lodash');
var yaml = require('js-yaml');
var fs = require('fs');

var testData = yaml.safeLoad(fs.readFileSync('./test/fixtures/parser-test-cases.yml', 'utf8'));

describe('parser', function () {
	it('should be `Object`', function () {
		assert.isObject(parser);
	});

	describe('#parse', function () {
		it('should return parsed JSON object', function () {
			_.forEach(testData, function (data) {
				assert.deepEqual(
					parser.parse(data.data),
					{
						block: data.block,
						bmod: data.bmod,
						elem: data.elem,
						emod: data.emod
					},
					data.data
				);
			});
		});
	});
});
