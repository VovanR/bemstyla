/*!
 * bewbem
 * Copyright(c) 2015 VovanR <mail@vovanr.com>
 * MIT Licensed
 */

var _ = require('lodash');
var parser = require('./parser');
var parserJade = require('../lib/parser-jade');
var parserHTML = require('../lib/parser-html');
var formatFile = require('./format-file');
var formatFileDir = require('./format-file-dir');
var formatFileName = require('./format-file-name');
var creator = require('./creator');

/**
 * @param {String} source
 */
var maker = function (source) {
    var parsed = _.clone(parser.parse(source));

    _.merge(parsed, formatFile.format());
    _.merge(parsed, formatFileDir.format(source));
    _.merge(parsed, formatFileName.format(source));

    _.forEach(parsed, function (item) {
        creator.touch(item.file);
    });
};

/**
 * @param {String} source
 */
module.exports = function (source) {
    if (/\.jade$/.test(source)) {
        source = parserJade.parseFile(source);
    } else if (/\.html$/.test(source)) {
        source = parserHTML.parseFile(source);
    }

    if (_.isArray(source)) {
        _.forEach(source, function (item) {
            maker(item);
        });
    } else {
        maker(source);
    }
};
