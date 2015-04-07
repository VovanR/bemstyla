var assert = require('chai').assert;
var creator = require('../lib/creator');
var _ = require('lodash');
var yaml = require('js-yaml');
var fs = require('fs');
var path = require('path');
var exists = fs.exists || path.exists;
var mkdirp = require('mkdirp');

var testData = yaml.safeLoad(fs.readFileSync('./test/format-file-test-cases.yml', 'utf8'));

describe('creator', function () {
    it('should be `Object`', function () {
        assert.isObject(creator);
    });

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
