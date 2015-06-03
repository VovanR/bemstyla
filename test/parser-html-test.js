var assert = require('chai').assert;
var mockfs = require('mock-fs');
var parserHTML = require('../lib/parser-html');
var _ = require('lodash');
var yaml = require('js-yaml');
var fs = require('fs');
var path = require('path');

var testData = yaml.safeLoad(fs.readFileSync('./test/fixtures/parser-html-test-cases.yml', 'utf8'));

var TEMP_DIR = '/tmp/bemstyla';

describe('parserHTML', function () {
    it('should be `Object`', function () {
        assert.isObject(parserHTML);
    });

    describe('#parseString', function () {
        it('should return an `Array`', function () {
            assert.isArray(parserHTML.parseString());
        });

        it('should parse class names from html text', function () {
            _.forEach(testData, function (data) {
                assert.deepEqual(
                    parserHTML.parseString(data.input),
                    data.output,
                    'tested: ' + data.input
                );
            });
        });
    });

    describe('#parseFile', function () {
        it('should return an empty array if file does not exists', function () {
            assert.isArray(parserHTML.parseFile());
        });

        it('should parse HTML file', function () {
            var mockData = {};

            var filePath = path.join(TEMP_DIR, 'foo.html');
            var fileText = '<em class="foo bar"></em>';
            mockData[filePath] = fileText;
            mockfs(mockData);

            assert.deepEqual(fs.readFileSync(filePath).toString(), fileText);
            assert.deepEqual(parserHTML.parseFile(filePath), ['foo', 'bar']);

            mockfs.restore();
        });
    });
});
