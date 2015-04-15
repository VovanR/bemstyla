/*!
 * bewbem
 * Copyright(c) 2015 VovanR <mail@vovanr.com>
 * MIT Licensed
 */

var _ = require('lodash');
var parser = require('./parser');
var formatFile = require('./format-file');
var formatFileDir = require('./format-file-dir');
var formatFileName = require('./format-file-name');
var creator = require('./creator');

/**
 * @param {String} source
 */
module.exports = function (source) {
    var parsed = _.clone(parser.parse(source));

    _.merge(parsed, formatFile.format());
    _.merge(parsed, formatFileDir.format(source));
    _.merge(parsed, formatFileName.format(source));

    _.forEach(parsed, function (item) {
        creator.touch(item.file);
    });
};
