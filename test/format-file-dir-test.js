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

    describe('_getBlockDir', function () {
        it('should format block dir name from input string', function () {
            _.forEach(testData, function (data) {
                assert.equal(
                    formatFileDir._getBlockDir(data.input),
                    data.output.block.file.dir
                );
            });
        });
    });

    describe('_getBlockModDir', function () {
        it('should format block mod dir name from input string', function () {
            _.forEach(testData, function (data) {
                assert.equal(
                    formatFileDir._getBlockModDir(data.input),
                    data.output.bmod.file.dir
                );
            });
        });
    });

    describe('_getElemDir', function () {
        it('should format elem dir name from input string', function () {
            _.forEach(testData, function (data) {
                assert.equal(
                    formatFileDir._getElemDir(data.input),
                    data.output.elem.file.dir
                );
            });
        });
    });

    describe('_getElemtModDir', function () {
        it('should format elem mod dir name from input string', function () {
            _.forEach(testData, function (data) {
                assert.equal(
                    formatFileDir._getElemModDir(data.input),
                    data.output.emod.file.dir
                );
            });
        });
    });

    describe('#format', function () {
        it('should format file dirs object', function () {
            _.forEach(testData, function (data) {
                assert.deepEqual(
                    formatFileDir.format(data.input),
                    {
                        block: {
                            file: {
                                dir: data.output.block.file.dir
                            }
                        },
                        bmod: {
                            file: {
                                dir: data.output.bmod.file.dir
                            }
                        },
                        elem: {
                            file: {
                                dir: data.output.elem.file.dir
                            }
                        },
                        emod: {
                            file: {
                                dir: data.output.emod.file.dir
                            }
                        },
                    }
                );
            });
        });
    });
});
