var assert = require('chai').assert;
var formatFileDir = require('../lib/format-file-dir');
var _ = require('lodash');
var yaml = require('js-yaml');
var fs = require('fs');

var testData = yaml.safeLoad(fs.readFileSync('./test/format-file-test-cases.yml', 'utf8'));

describe('formatFileDir', function () {
    it('should be `Object`', function () {
        assert.isObject(formatFileDir);
    });

    describe('#getBlockDir', function () {
        it('should format block dir name from input string', function () {
            _.forEach(testData, function (data) {
                assert.equal(
                    formatFileDir.getBlockDir(data.input),
                    data.output.block.file.dir
                );
            });
        });
    });

    describe('#getBlockModifierDir', function () {
        it('should format block modifier dir name from input string', function () {
            _.forEach(testData, function (data) {
                assert.equal(
                    formatFileDir.getBlockModifierDir(data.input),
                    data.output.block.mod.file.dir
                );
            });
        });
    });

    describe('#getElementDir', function () {
        it('should format element dir name from input string', function () {
            _.forEach(testData, function (data) {
                assert.equal(
                    formatFileDir.getElementDir(data.input),
                    data.output.elem.file.dir
                );
            });
        });
    });

    describe('#getElementModifierDir', function () {
        it('should format element modifier dir name from input string', function () {
            _.forEach(testData, function (data) {
                assert.equal(
                    formatFileDir.getElementModifierDir(data.input),
                    data.output.elem.mod.file.dir
                );
            });
        });
    });
});
