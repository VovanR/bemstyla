/*
 * bemstyla
 * Copyright(c) 2015 Vladimir Rodkin <mail@vovanr.com>
 * MIT Licensed
 */

var _ = require('lodash');
var parser = require('bem-classname-parser');
var parserJade = require('./parser-jade');
var parserHTML = require('./parser-html');
var formatFile = require('./format-file');
var formatFileDir = require('./format-file-dir');
var formatFileName = require('./format-file-name');
var formatFileContent = require('./format-file-content');
var creator = require('./creator');

/**
 * @param {Object} options
 * @param {String} options.source
 * @param {String} [options.fileType='styl']
 * @param {String} [options.fileFormat='styl']
 * @param {String} [options.baseDir]
 */
var maker = function (options) {
	var source = options.source;
	var parsed = _.cloneDeep(parser.parse(source));
	var block = parsed.block || {name: '', mod: {}};
	var elem = parsed.elem || {name: '', mod: {}};
	parsed = {
		block: {
			name: block.name
		},
		bmod: block.mod,
		elem: {
			name: elem.name
		},
		emod: elem.mod
	};

	_.merge(parsed, formatFile.format({
		fileType: options.fileType
	}));
	_.merge(parsed, formatFileDir.format(source, options.baseDir));
	_.merge(parsed, formatFileName.format(source));
	_.merge(parsed, formatFileContent.format(source, options.fileFormat));

	_.forEach(parsed, function (item) {
		creator.touch(item.file)
			.catch(function () {});
	});
};

/**
 * @param {Object} options
 * @param {String} options.source
 * @param {String} [options.fileType='styl']
 * @param {String} [options.fileFormat='styl']
 * @param {String} [options.baseDir]
 * @return {Promise}
 */
module.exports = function (options) {
	var promise;
	var source = options.source;
	var fileType = options.fileType;
	var fileFormat = options.fileFormat;
	var baseDir = options.baseDir;

	if (/\.jade$/.test(source)) {
		promise = parserJade.parseFile(source);
	} else if (/\.html$/.test(source)) {
		promise = parserHTML.parseFile(source);
	} else {
		promise = new Promise(function (resolve) {
			resolve(source);
		});
	}

	return promise.then(function (data) {
		if (_.isArray(data)) {
			_.forEach(data, function (item) {
				maker({
					source: item,
					fileType: fileType,
					fileFormat: fileFormat,
					baseDir: baseDir
				});
			});
		} else {
			maker({
				source: data,
				fileType: fileType,
				fileFormat: fileFormat,
				baseDir: baseDir
			});
		}
	});
};
