/*
 * bemstyla
 * Copyright(c) 2015 Vladimir Rodkin <mail@vovanr.com>
 * MIT Licensed
 */

var _ = require('lodash');
var Promise = require('bluebird');
var fs = require('fs');

/**
 * HTML source parser
 *
 * @param {String} source
 * @return {Array}
 */
function parseString(source) {
	var result = [];

	if (_.isUndefined(source)) {
		return result;
	}

	source = String(source);

	if (!/\sclass=/.test(source)) {
		return result;
	}

	var re = /class=(?:"|')([\w\s-]+?)(?:"|')/g;

	var parsed = [];
	source.replace(
		re,
		function (match, p) {
			p = p.split(' ');
			_.forEach(p, function (r) {
				r = r.trim();
				if (r !== '') {
					parsed.push(r);
				}
			});
		}
	);

	parsed = _.uniq(parsed);

	if (parsed.length > 0) {
		result = parsed;
	}

	return result;
}

/**
 * HTML file parser
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
