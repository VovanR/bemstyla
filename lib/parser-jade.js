/*
 * bemstyla
 * Copyright(c) 2016 Vladimir Rodkin <mail@vovanr.com>
 * MIT Licensed
 */

var fs = require('fs');
var uniq = require('array-uniq');

/**
 * Jade source parser
 *
 * @param {String} source
 * @return {Array}
 */
function parseString(source) {
	var result = [];

	if (source === undefined) {
		return result;
	}

	source = String(source);

	if (!/\./.test(source)) {
		return result;
	}

	var re = /\.([^\s\.\(]+)/gm;

	var parsed = source.match(re);
	parsed = parsed.map(function (item) {
		return item.slice(1);
	});

	parsed = uniq(parsed);

	if (parsed.length > 0) {
		result = parsed;
	}

	return result;
}

/**
 * Jade file parser
 *
 * @param {String} filePath
 * @return {Promise}
 */
function parseFile(filePath) {
	var result = [];

	return new Promise(function (resolve) {
		if (!filePath) {
			return resolve(result);
		}

		fs.stat(filePath, function (err, stats) {
			if (err || (stats && !stats.isFile())) {
				return resolve(result);
			}

			fs.readFile(filePath, function (err, data) {
				if (err) {
					return resolve(result);
				}

				var fileText = data.toString();
				result = parseString(fileText);

				resolve(result);
			});
		});
	});
}

module.exports = {
	parseString: parseString,
	parseFile: parseFile
};
