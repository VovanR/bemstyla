var assert = require('chai').assert;
var formatFile = require('../lib/format-file');
var _ = require('lodash');

describe('parser', function () {
    it('should be `Object`', function () {
        assert.isObject(formatFile);
    });

    describe('#format', function () {
        it('should return mixed JSON object', function () {
            var res = {
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

            assert.deepEqual(formatFile.format(), res);
        });
    });
});
