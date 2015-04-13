var assert = require('chai').assert;
var creator = require('../lib/creator');
var _ = require('lodash');
var yaml = require('js-yaml');
var fs = require('fs');
var path = require('path');
var exists = fs.existsSync || path.existsSync;
var rmdir = require('rimraf').sync;

var testData = yaml.safeLoad(fs.readFileSync('./test/format-file-test-cases.yml', 'utf8'));

describe('creator', function () {
    it('should be `Object`', function () {
        assert.isObject(creator);
    });

    describe('#mkdir', function () {
        if (!exists('/tmp/newbem')) {
            fs.mkdirSync('/tmp/newbem');
        }

        it('should add dir', function () {
            _.forEach(testData, function (data) {
                var _dir = data.output.block.file.dir;
                var dir = '/tmp/newbem/' + _dir;

                if (_dir !== '') {
                    rmdir(dir);
                    assert.notOk(exists(dir), 'rm ' + _dir);
                }

                creator.mkdir(dir);
                assert.ok(exists(dir), 'mk ' + _dir);
            });
        });
    });

    describe('#touch', function () {
        it('should add file', function () {
                var fileData = {
                    dir: '/tmp/newbem/block',
                    name: 'block',
                    ext: 'styl',
                };
                creator.touch(fileData);

                var filePath = path.join(fileData.dir, fileData.name + '.' + fileData.ext)
                assert.equal(filePath, '/tmp/newbem/block/block.styl');

                assert.isTrue(fs.statSync(filePath).isFile());


            _.forEach(testData, function (data) {
                var file = data.output.block.file;

                if (!file.dir || !file.name) {
                    return;
                }

                var fileData = {
                    dir: path.join('/tmp/newbem/', file.dir),
                    name: file.name,
                    ext: file.ext,
                };
                creator.touch(fileData);

                var filePath = path.join(fileData.dir, fileData.name + '.' + fileData.ext)

                assert.isTrue(fs.statSync(filePath).isFile());
            });
        });
    });

    /*
    + make dir
        + not if exists
    + touch file
        + not if exists
    write to file
        not if exists
     */

    // describe('#touchFiles', function () {
    //     it('should create `styl` files', function (done) {
            // mkdirp.sync('/tmp/' + creator.getPath('block__elem_mod-name_mod-val'));
            // exists('/tmp/block/__elem/_mod-name', function (ex) {
            //     assert.ok(ex, 'Dir created');
            // });
            // var paths = creator.getFilePaths('block__elem_mod-name_mod-val');
            // var stream = fs.createWriteStream('/tmp/' + paths.block.file + '.styl');
            // stream.once('open', function(fd) {
            //     stream.write('.' + paths.block.name + '\n    {}\n');
            //     stream.end();
            //     done();
            // });
            // fs.accessSync('temp', fs.W_OK, function (err) {
            //     assert.isFalse(err);
            //     done();
            // });
    //     });
    // });
});
