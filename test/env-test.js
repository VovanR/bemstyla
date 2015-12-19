/* global describe it */

var assert = require('chai').assert;
var ENV = require('../lib/env');

describe('ENV', function () {
	it('should be `Object`', function () {
		assert.isObject(ENV);
	});

	describe('TERMS', function () {
		it('should be `Array`', function () {
			assert.isArray(ENV.TERMS);
		});
	});

	describe('DS', function () {
		it('should be `String`', function () {
			assert.isString(ENV.DS);
		});
	});

	describe('FORMATS', function () {
		it('should be `Object`', function () {
			assert.isObject(ENV.FORMATS);
		});
	});

	describe('DEFAULT_FORMAT', function () {
		it('should be `String`', function () {
			assert.isString(ENV.DEFAULT_FORMAT);
		});
	});
});
