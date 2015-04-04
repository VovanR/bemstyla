var assert = require('chai').assert;
var creator = require('../lib/creator');
var _ = require('lodash');
var yaml = require('js-yaml');
var fs = require('fs');

var testData = yaml.safeLoad(fs.readFileSync('./test/creator-test-cases.yml', 'utf8'));
var getFilePathsTestData = yaml.safeLoad(fs.readFileSync('./test/creator-getFilePaths-test-cases.yml', 'utf8'));

describe('creator', function () {
    it('should be `Object`', function () {
        assert.isObject(creator);
    });

    describe('#getPath', function () {
        it('should format path from input string', function () {
            _.forEach(testData, function (data) {
                assert.equal(
                    creator.getPath(data.data),
                    data.path
                );
            });
        });
    });

    describe('#getFilePaths', function () {
        it('should parse input to file names and paths', function () {
            _.forEach(getFilePathsTestData, function (data) {
                assert.deepEqual(
                    creator.getFilePaths(data.input),
                    data.output
                );
            });
        });
    });
});
