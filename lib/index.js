/*!
 * bewbem
 * Copyright(c) 2015 VovanR <mail@vovanr.com>
 * MIT Licensed
 */
'use strict';

var _ = require('lodash');
var parser = require('./parser.js');
var formatFile = require('./format-file.js');
var formatFileDir = require('./format-file-dir.js');
var formatFileName = require('./format-file-name.js');
var creator = require('./creator.js');

module.exports = function (source) {
    var parsed = parser.parse(name);
    _.assign(parsed, formatFile.fromat());
    _.forEach(parsed, function (item) {
        item.file.dir = formatFileDir(source);
        item.file.name = formatFileName(source);
        creator.touch(item.file);
    });
};
