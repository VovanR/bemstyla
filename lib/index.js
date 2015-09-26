/*!
 * bemstyla
 * Copyright(c) 2015 Vladimir Rodkin <mail@vovanr.com>
 * MIT Licensed
 */

var _ = require('lodash');
var Promise = require('bluebird');
var parser = require('./parser');
var parserJade = require('./parser-jade');
var parserHTML = require('./parser-html');
var formatFile = require('./format-file');
var formatFileDir = require('./format-file-dir');
var formatFileName = require('./format-file-name');
var creator = require('./creator');

/**
 * @param {String} source
 */
var maker = function (source) {
    var parsed = _.cloneDeep(parser.parse(source));

    _.merge(parsed, formatFile.format());
    _.merge(parsed, formatFileDir.format(source));
    _.merge(parsed, formatFileName.format(source));

    _.forEach(parsed, function (item) {
        creator.touch(item.file)
            .catch(function () {});
    });
};

/**
 * @param {String} source
 * @return {Promise}
 */
module.exports = function (source) {
    var promise;

    if (/\.jade$/.test(source)) {
        promise = parserJade.parseFile(source);
    } else if (/\.html$/.test(source)) {
        promise = parserHTML.parseFile(source);
    } else {
        promise = new Promise(function (resolve, reject) {
            resolve(source);
        });
    }

    return promise.then(function (data) {
        if (_.isArray(data)) {
            _.forEach(data, function (item) {
                maker(item);
            });
        } else {
            maker(data);
        }
    });
};
