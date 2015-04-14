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

    describe('#getBlockModName', function () {
        it('should return block mod name', function () {
            _.forEach(testData, function (data) {
                assert.equal(
                    parser.getBlockModName(data.data),
                    data.bmod.name
                );
            });
        });
    });

    describe('#getBlockModValue', function () {
        it('should return block mod value', function () {
            _.forEach(testData, function (data) {
                assert.equal(
                    parser.getBlockModValue(data.data),
                    data.bmod.value
                );
            });
        });
    });

    describe('#getElemName', function () {
        it('should return elem name', function () {
            _.forEach(testData, function (data) {
                assert.equal(
                    parser.getElemName(data.data),
                    data.elem.name
                );
            });
        });
    });

    describe('#getElemModName', function () {
        it('should return elem mod name', function () {
            _.forEach(testData, function (data) {
                assert.equal(
                    parser.getElemModName(data.data),
                    data.emod.name
                );
            });
        });
    });

    describe('#getElemModValue', function () {
        it('should return elem mod value', function () {
            _.forEach(testData, function (data) {
                assert.equal(
                    parser.getElemModValue(data.data),
                    data.emod.value
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
                        bmod: data.bmod,
                        elem: data.elem,
                        emod: data.emod,
                    }
                );
            });
        });
    });
});
