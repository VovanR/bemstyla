var assert = require('chai').assert;
var newbem = require('../index');
var _ = require('lodash');
var jf = require('jsonfile');

var testData = jf.readFile('./test-cases.json', function () {});

describe('newbem', function () {
    it('should be `Object`', function () {
        assert.isObject(newbem);
    });

    describe('#getBlockName', function () {
        it('should return block name', function () {
            _.forEach(testData, function (data) {
                assert.equal(
                    newbem.getBlockName(data.data),
                    data.block.name
                );
            });
        });
    });

    describe('#getElementName', function () {
        it('should return element name', function () {
            _.forEach(testData, function (data) {
                assert.equal(
                    newbem.getElementName(data.data),
                    data.elem.name
                );
            });
        });
    });

    describe('#getBlockModifierName', function () {
        it('should return block modifier name', function () {
            _.forEach(testData, function (data) {
                assert.equal(
                    newbem.getBlockModifierName(data.data),
                    data.block.mod.name
                );
            });
        });
    });

    describe('#getBlockModifierValue', function () {
        it('should return block modifier value', function () {
            _.forEach(testData, function (data) {
                assert.equal(
                    newbem.getBlockModifierValue(data.data),
                    data.block.mod.value
                );
            });
        });
    });

    describe('#getElementModifierName', function () {
        it('should return element modifier name', function () {
            _.forEach(testData, function (data) {
                assert.equal(
                    newbem.getElementModifierName(data.data),
                    data.elem.mod.name
                );
            });
        });
    });

    describe('#getElementModifierValue', function () {
        it('should return element modifier value', function () {
            _.forEach(testData, function (data) {
                assert.equal(
                    newbem.getElementModifierValue(data.data),
                    data.elem.mod.value
                );
            });
        });
    });
});
