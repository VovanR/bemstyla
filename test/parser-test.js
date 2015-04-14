var assert = require('chai').assert;
var parser = require('../lib/parser');
var _ = require('lodash');
var yaml = require('js-yaml');
var fs = require('fs');

var testData = yaml.safeLoad(fs.readFileSync('./test/parser-test-cases.yml', 'utf8'));

describe('parser', function () {
    it('should be `Object`', function () {
        assert.isObject(parser);
    });

    describe('#getBlockName', function () {
        it('should return block name', function () {
            _.forEach(testData, function (data) {
                assert.equal(
                    parser.getBlockName(data.data),
                    data.block.name
                );
            });
        });
    });

    describe('#getElemName', function () {
        it('should return element name', function () {
            _.forEach(testData, function (data) {
                assert.equal(
                    parser.getElemName(data.data),
                    data.elem.name
                );
            });
        });
    });

    describe('#getBlockModName', function () {
        it('should return block modifier name', function () {
            _.forEach(testData, function (data) {
                assert.equal(
                    parser.getBlockModName(data.data),
                    data.block.mod.name
                );
            });
        });
    });

    describe('#getBlockModValue', function () {
        it('should return block modifier value', function () {
            _.forEach(testData, function (data) {
                assert.equal(
                    parser.getBlockModValue(data.data),
                    data.block.mod.value
                );
            });
        });
    });

    describe('#getElemModName', function () {
        it('should return element modifier name', function () {
            _.forEach(testData, function (data) {
                assert.equal(
                    parser.getElemModName(data.data),
                    data.elem.mod.name
                );
            });
        });
    });

    describe('#getElemModValue', function () {
        it('should return element modifier value', function () {
            _.forEach(testData, function (data) {
                assert.equal(
                    parser.getElemModValue(data.data),
                    data.elem.mod.value
                );
            });
        });
    });

    describe('#parse', function () {
        it('should return parsed JSON object', function () {
            _.forEach(testData, function (data) {
                assert.deepEqual(
                    parser.parse(data.data),
                    {
                        block: data.block,
                        elem: data.elem,
                    }
                );
            });
        });
    });
});
