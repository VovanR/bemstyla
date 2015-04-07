var assert = require('chai').assert;
var formatFileName = require('../lib/format-file-name');
var _ = require('lodash');
var yaml = require('js-yaml');
var fs = require('fs');

var testData = yaml.safeLoad(fs.readFileSync('./test/format-file-test-cases.yml', 'utf8'));

describe('formatFileName', function () {
    it('should be `Object`', function () {
        assert.isObject(formatFileName);
    });

    describe('#getBlockName', function () {
        it('should format block file name from input string', function () {
            _.forEach(testData, function (data) {
                assert.equal(
                    formatFileName.getBlockName(data.input),
                    data.output.block.file.name
                );
            });
        });
    });

    describe('#getBlockModifierName', function () {
        it('should format block modifier file name from input string', function () {
            _.forEach(testData, function (data) {
                assert.equal(
                    formatFileName.getBlockModifierName(data.input),
                    data.output.block.mod.file.name
                );
            });
        });
    });

    describe('#getElementName', function () {
        it('should format element file name from input string', function () {
            _.forEach(testData, function (data) {
                assert.equal(
                    formatFileName.getElementName(data.input),
                    data.output.elem.file.name
                );
            });
        });
    });

    describe('#getElementModifierName', function () {
        it('should format element modifier file name from input string', function () {
            _.forEach(testData, function (data) {
                assert.equal(
                    formatFileName.getElementModifierName(data.input),
                    data.output.elem.mod.file.name
                );
            });
        });
    });
});
