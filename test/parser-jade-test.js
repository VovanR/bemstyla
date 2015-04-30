var assert = require('chai').assert;
var parserJade = require('../lib/parser-jade');
var _ = require('lodash');
var yaml = require('js-yaml');
var fs = require('fs');

var testData = yaml.safeLoad(fs.readFileSync('./test/parser-jade-test-cases.yml', 'utf8'));

describe('parserJade', function () {
    it('should be `Object`', function () {
        assert.isObject(parserJade);
    });

    describe('#parse', function () {
        it('should return an `Array`', function () {
            assert.isArray(parserJade.parse());
        });

        it('should parse class names from jade text', function () {
            _.forEach(testData, function (data) {
                assert.deepEqual(
                    parserJade.parse(data.input),
                    data.output
                );
            });
        });
    });
});
