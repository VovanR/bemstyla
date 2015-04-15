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

    describe('_getBlockName', function () {
        it('should format block file name from input string', function () {
            _.forEach(testData, function (data) {
                assert.equal(
                    formatFileName._getBlockName(data.input),
                    data.output.block.file.name
                );
            });
        });
    });

    describe('_getBlockModName', function () {
        it('should format block mod file name from input string', function () {
            _.forEach(testData, function (data) {
                assert.equal(
                    formatFileName._getBlockModName(data.input),
                    data.output.bmod.file.name
                );
            });
        });
    });

    describe('_getElemName', function () {
        it('should format elem file name from input string', function () {
            _.forEach(testData, function (data) {
                assert.equal(
                    formatFileName._getElemName(data.input),
                    data.output.elem.file.name
                );
            });
        });
    });

    describe('_getElemModName', function () {
        it('should format elem mod file name from input string', function () {
            _.forEach(testData, function (data) {
                assert.equal(
                    formatFileName._getElemModName(data.input),
                    data.output.emod.file.name
                );
            });
        });
    });

    describe('#format', function () {
        it('should format file names object', function () {
            _.forEach(testData, function (data) {
                assert.deepEqual(
                    formatFileName.format(data.input),
                    {
                        block: {
                            file: {
                                name: data.output.block.file.name
                            }
                        },
                        bmod: {
                            file: {
                                name: data.output.bmod.file.name
                            }
                        },
                        elem: {
                            file: {
                                name: data.output.elem.file.name
                            }
                        },
                        emod: {
                            file: {
                                name: data.output.emod.file.name
                            }
                        }
                    }
                );
            });
        });
    });
});
