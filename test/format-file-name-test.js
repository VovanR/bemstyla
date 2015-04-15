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

    describe('#getBlockModName', function () {
        it('should format block mod file name from input string', function () {
            _.forEach(testData, function (data) {
                assert.equal(
                    formatFileName.getBlockModName(data.input),
                    data.output.bmod.file.name
                );
            });
        });
    });

    describe('#getElemName', function () {
        it('should format elem file name from input string', function () {
            _.forEach(testData, function (data) {
                assert.equal(
                    formatFileName.getElemName(data.input),
                    data.output.elem.file.name
                );
            });
        });
    });

    describe('#getElemModName', function () {
        it('should format elem mod file name from input string', function () {
            _.forEach(testData, function (data) {
                assert.equal(
                    formatFileName.getElemModName(data.input),
                    data.output.emod.file.name
                );
            });
        });
    });
});
