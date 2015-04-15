var assert = require('chai').assert;
var creator = require('../lib/creator');
var _ = require('lodash');
var yaml = require('js-yaml');
var fs = require('fs');
var path = require('path');
var exists = fs.existsSync || path.existsSync;
var mkdirp = require('mkdirp');
var rmdir = require('rimraf').sync;

var testData = yaml.safeLoad(fs.readFileSync('./test/format-file-test-cases.yml', 'utf8'));

// var TEMP_DIR = '/tmp/bemstyla';
var TEMP_DIR = '/media/vovanr/DDE4-DF16/tmp/bemstyla';
var clearTemp = function () {
    if (exists(TEMP_DIR)) {
        rmdir(TEMP_DIR);
    }

    mkdirp.sync(TEMP_DIR);
};

describe('creator', function () {
    it('should be `Object`', function () {
        assert.isObject(creator);
    });

    describe('_mkdir', function () {
        it('should add block dir', function (done) {
            _.forEach(testData, function (data) {
                clearTemp();
                var _dir = data.output.block.file.dir;
                var dir = path.join(TEMP_DIR, _dir);

                if (_dir !== '') {
                    assert.notOk(exists(dir), 'rm ' + _dir);
                }

                creator._mkdir(dir);
                assert.ok(exists(dir), 'mk ' + _dir);
            });

            done();
        });

        it('should add block mod dir', function (done) {
            _.forEach(testData, function (data) {
                clearTemp();
                var _dir = data.output.bmod.file.dir;
                var dir = path.join(TEMP_DIR, _dir);

                if (_dir !== '') {
                    assert.notOk(exists(dir), 'rm ' + _dir);
                }

                creator._mkdir(dir);
                assert.ok(exists(dir), 'mk ' + _dir);
            });

            done();
        });

        it('should add elem dir', function (done) {
            _.forEach(testData, function (data) {
                clearTemp();
                var _dir = data.output.elem.file.dir;
                var dir = path.join(TEMP_DIR, _dir);

                if (_dir !== '') {
                    assert.notOk(exists(dir), 'rm ' + _dir);
                }

                creator._mkdir(dir);
                assert.ok(exists(dir), 'mk ' + _dir);
            });

            done();
        });

        it('should add elem mod dir', function (done) {
            _.forEach(testData, function (data) {
                clearTemp();
                var _dir = data.output.emod.file.dir;
                var dir = path.join(TEMP_DIR, _dir);

                if (_dir !== '') {
                    assert.notOk(exists(dir), 'rm ' + _dir);
                }

                creator._mkdir(dir);
                assert.ok(exists(dir), 'mk ' + _dir);
            });

            done();
        });
    });

    describe('#touch', function () {
        it('should add block file', function (done) {
            var fileData = {
                dir: path.join(TEMP_DIR, 'block'),
                name: 'block',
                ext: 'styl',
            };
            creator.touch(fileData);

            var filePath = path.join(fileData.dir, fileData.name + '.' + fileData.ext);
            assert.equal(filePath, path.join(TEMP_DIR, 'block/block.styl'));

            assert.isTrue(fs.statSync(filePath).isFile());
            var text = '.block\n    {}\n';
            assert.equal(text, fs.readFileSync(filePath));


            _.forEach(testData, function (data) {
                clearTemp();
                var fileData = _.clone(data.output.block.file);

                if (!fileData.dir || !fileData.name) {
                    return;
                }

                _.assign(fileData, {
                    dir: path.join(TEMP_DIR, fileData.dir),
                });
                creator.touch(fileData);

                var filePath = path.join(fileData.dir, fileData.name + '.' + fileData.ext)
                assert.isTrue(fs.statSync(filePath).isFile());
                var text = '.' + fileData.name + '\n    {}\n';
                assert.equal(text, fs.readFileSync(filePath));
            });

            done();
        });

        it('should add block mod file', function (done) {
            _.forEach(testData, function (data) {
                clearTemp();
                var fileData = _.clone(data.output.bmod.file);

                if (!fileData.dir || !fileData.name) {
                    return;
                }

                _.assign(fileData, {
                    dir: path.join(TEMP_DIR, fileData.dir),
                });
                creator.touch(fileData);

                var filePath = path.join(fileData.dir, fileData.name + '.' + fileData.ext)
                assert.isTrue(fs.statSync(filePath).isFile());
                var text = '.' + fileData.name + '\n    {}\n';
                assert.equal(text, fs.readFileSync(filePath));
            });

            done();
        });

        it('should add elem file', function (done) {
            _.forEach(testData, function (data) {
                clearTemp();
                var fileData = _.clone(data.output.elem.file);

                if (!fileData.dir || !fileData.name) {
                    return;
                }

                _.assign(fileData, {
                    dir: path.join(TEMP_DIR, fileData.dir),
                });
                creator.touch(fileData);

                var filePath = path.join(fileData.dir, fileData.name + '.' + fileData.ext)
                assert.isTrue(fs.statSync(filePath).isFile());
                var text = '.' + fileData.name + '\n    {}\n';
                assert.equal(text, fs.readFileSync(filePath));
            });

            done();
        });

        it('should add elem mod file', function (done) {
            _.forEach(testData, function (data) {
                clearTemp();
                var fileData = _.clone(data.output.emod.file);

                if (!fileData.dir || !fileData.name) {
                    return;
                }

                _.assign(fileData, {
                    dir: path.join(TEMP_DIR, fileData.dir),
                });
                creator.touch(fileData);

                var filePath = path.join(fileData.dir, fileData.name + '.' + fileData.ext)
                assert.isTrue(fs.statSync(filePath).isFile());
                var text = '.' + fileData.name + '\n    {}\n';
                assert.equal(text, fs.readFileSync(filePath));
            });

            done();
        });

        it('should not rewrite exists files', function () {
            assert.isTrue(false);
        });
    });
});
