/*!
 * bewbem
 * Copyright(c) 2015 VovanR <mail@vovanr.com>
 * MIT Licensed
 */
'use strict';

var parser = require('./parser.js');
var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');
var exists = fs.existsSync || path.existsSync;

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
        var text = '.' + file.name + '\n    {}\n';
        fs.writeFileSync(filePath, text);
    },
};
