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
    var parsed = _.clone(parser.parse(source));

    _.merge(parsed, formatFile.format());
    _.merge(parsed, formatFileDir.format(source));
    _.merge(parsed, formatFileName.format(source));

    _.forEach(parsed, function (item) {
        creator.touch(item.file);
    });
};
