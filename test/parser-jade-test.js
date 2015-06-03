var assert = require('chai').assert;
var mockfs = require('mock-fs');
var parserJade = require('../lib/parser-jade');
var _ = require('lodash');
var yaml = require('js-yaml');
var fs = require('fs');
var path = require('path');

var testData = yaml.safeLoad(fs.readFileSync('./test/fixtures/parser-jade-test-cases.yml', 'utf8'));

var TEMP_DIR = '/tmp/bemstyla';

describe('parserJade', function () {
    it('should be `Object`', function () {
        assert.isObject(parserJade);
    });

    describe('#parseString', function () {
        it('should return an `Array`', function () {
            assert.isArray(parserJade.parseString());
        });

        it('should parse class names from jade text', function () {
            _.forEach(testData, function (data) {
                assert.deepEqual(
                    parserJade.parseString(data.input),
                    data.output
                );
            });
        });
    });

    describe('#parseFile', function () {
        it('should return an empty array if file does not exists', function () {
            assert.isArray(parserJade.parseFile());
        });

        it('should parse Jade file', function () {
            var mockData = {};

            var filePath = path.join(TEMP_DIR, 'foo.jade');
            var fileText = '.foo.bar';
            mockData[filePath] = fileText;
            mockfs(mockData);

            assert.deepEqual(fs.readFileSync(filePath).toString(), fileText);
            assert.deepEqual(parserJade.parseFile(filePath), ['foo', 'bar']);

            mockfs.restore();
        });
    });
});
