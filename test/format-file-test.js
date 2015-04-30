var assert = require('chai').assert;
var formatFile = require('../lib/format-file');
var _ = require('lodash');

describe('formatFile', function () {
    it('should be `Object`', function () {
        assert.isObject(formatFile);
    });

    describe('#format', function () {
        var testResult = {
            block: {
                file: {
                    name: '',
                    dir: '',
                    ext: 'styl'
                }
            },
            bmod: {
                file: {
                    name: '',
                    dir: '',
                    ext: 'styl'
                }
            },
            elem: {
                file: {
                    name: '',
                    dir: '',
                    ext: 'styl'
                }
            },
            emod: {
                file: {
                    name: '',
                    dir: '',
                    ext: 'styl'
                }
            }
        };

        it('should return mixed JSON object', function () {
            var res = _.clone(testResult);

            assert.deepEqual(formatFile.format(), res);
        });

        it('should not assign objects', function () {
            var res = _.clone(testResult);

            var formatted = formatFile.format();
            assert.deepEqual(formatted, res);
            formatted.block.file.dir = 'foo';
            res.block.file.dir = 'foo';
            assert.deepEqual(formatted, res);
        });
    });
});
