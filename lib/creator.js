/*
 * bemstyla
 * Copyright(c) 2016 Vladimir Rodkin <mail@vovanr.com>
 * MIT Licensed
 */

var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');

/**
 * Makes dirs recursively
 *
 * @param {String} dir
 * @return {Promise}
 * @private
 */
function _mkdir(dir) {
	return new Promise(function (resolve, reject) {
		fs.stat(dir, function (err, stats) {
			if (!err || (stats && stats.isDirectory())) {
				// already exists
				return resolve();
			}

			mkdirp(dir, function (err) {
				if (err) {
					return reject();
				}

				return resolve();
			});
		});
	});
}

/**
 * Touches files and writes file data
 *
 * @param {Object} file
 * @return {Promise}
 */
function touch(file) {
	return new Promise(function (resolve, reject) {
		if (!file.dir || !file.name) {
			return reject();
		}

		_mkdir(file.dir)
			.then(function () {
				var filePath = path.join(file.dir, file.name + '.' + file.ext);

				fs.stat(filePath, function (err, stats) {
					if (!err || (stats && stats.isFile())) {
						return reject();
					}

					fs.writeFile(filePath, file.content, function (err) {
						if (err) {
							return reject();
						}

						resolve();
					});
				});
			})
			.catch(reject);
	});
}

module.exports = {
	_mkdir: _mkdir,
	touch: touch
};
