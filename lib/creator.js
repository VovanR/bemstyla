/*!
 * bewbem
 * Copyright(c) 2015 VovanR <mail@vovanr.com>
 * MIT Licensed
 */

var parser = require('./parser');
var fs = require('fs');
var mkdirp = require('mkdirp').sync;
var path = require('path');
var exists = fs.existsSync || path.existsSync;

module.exports = {
    /**
     * @param {String} dir
     * @private
     */
    _mkdir: function (dir) {
        if (!exists(dir)) {
            mkdirp(dir);
        }
    },

    /**
     * @param {Object} file
     */
    touch: function (file) {
        if (!file.dir || !file.name) {
            return;
        }

        this._mkdir(file.dir);

        var filePath = path.join(file.dir, file.name + '.' + file.ext);

        if (exists(filePath)) {
            return;
        }

        var text = '.' + file.name + '\n    {}\n';
        fs.writeFileSync(filePath, text);
    },
};
