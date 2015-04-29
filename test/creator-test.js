var assert = require('chai').assert;
var mockfs = require('mock-fs');
var creator = require('../lib/creator');
var _ = require('lodash');
var yaml = require('js-yaml');
var fs = require('fs');
var path = require('path');
var exists = fs.existsSync || path.existsSync;

var testData = yaml.safeLoad(fs.readFileSync('./test/format-file-test-cases.yml', 'utf8'));

var TEMP_DIR = '/tmp/bemstyla';
/**
 */
var clearTemp = function () {
    mockfs.restore();
    var mockData = {};
    mockData[TEMP_DIR] = {};
    mockfs(mockData);
};

describe('creator', function () {
    it('should be `Object`', function () {
        assert.isObject(creator);
    });

    describe('_mkdir', function () {
        var testTerm = function (term) {
            _.forEach(testData, function (data) {
                clearTemp();
                var _dir = data.output[term].file.dir;
                var dir = path.join(TEMP_DIR, _dir);

                if (_dir === '') {
                    return;
                }

                assert.notOk(exists(dir), 'rm ' + _dir);
                creator._mkdir(dir);
                assert.ok(exists(dir), 'mk ' + _dir);
            });
        };

        it('should add block dir', function (done) {
            testTerm('block');
            done();
        });

        it('should add block mod dir', function (done) {
            testTerm('bmod');
            done();
        });

        it('should add elem dir', function (done) {
            testTerm('elem');
            done();
        });

        it('should add elem mod dir', function (done) {
            testTerm('emod');
            done();
        });
    });

    describe('#touch', function () {
        var testTerm = function (term) {
            _.forEach(testData, function (data) {
                clearTemp();
                var fileData = _.clone(data.output[term].file);

                if (!fileData.dir || !fileData.name) {
                    return;
                }

                _.merge(fileData, {
                    dir: path.join(TEMP_DIR, fileData.dir),
                });
                creator.touch(fileData);

                var filePath = path.join(fileData.dir, fileData.name + '.' + fileData.ext);
                assert.isTrue(fs.statSync(filePath).isFile());
                var text = '.' + fileData.name + '\n    {}\n';
                assert.equal(text, fs.readFileSync(filePath));
            });
        };

        it('should add block file', function (done) {
            testTerm('block');
            done();
        });

        it('should add block mod file', function (done) {
            testTerm('bmod');
            done();
        });

        it('should add elem file', function (done) {
            testTerm('elem');
            done();
        });

        it('should add elem mod file', function (done) {
            testTerm('emod');
            done();
        });

        it('should not rewrite exists files', function () {
            mockfs.restore();

            var fileData = {
                dir: path.join(TEMP_DIR, 'block'),
                name: 'block',
                ext: 'styl'
            };
            var filePath = path.join(fileData.dir, fileData.name + '.' + fileData.ext);

            var testText = 'Foo';
            var mockData = {};
            mockData[filePath] = testText;
            mockfs(mockData);

            assert.equal(fs.readFileSync(filePath), testText);
            creator.touch(fileData);
            assert.equal(fs.readFileSync(filePath), testText);
        });
    });
});
