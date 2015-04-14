/*!
 * bewbem
 * Copyright(c) 2015 VovanR <mail@vovanr.com>
 * MIT Licensed
 */

var parser = require('./parser.js');
var _ = require('lodash');
var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');
var exists = fs.existsSync || path.existsSync;

var DS = '/';

module.exports = {
    /**
     * @param {String} dir
     */
    mkdir: function (dir) {
        if (!exists(dir)) {
            mkdirp.sync(dir);
        }
    },

    /**
     * @param {String} file
     */
    touch: function (file) {
        if (!file.dir || !file.name) {
            return;
        }

        this.mkdir(file.dir);

        var filePath = path.join(file.dir, file.name + '.' + file.ext);
        var text = '.block' + '\n    {}\n';
        fs.writeFileSync(filePath, text);
    },
};
