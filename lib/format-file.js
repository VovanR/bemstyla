/*
 * bemstyla
 * Copyright(c) 2015 Vladimir Rodkin <mail@vovanr.com>
 * MIT Licensed
 */

var TERMS = require('./env').TERMS;

module.exports = {
	/**
	* File fish data
	*
	* @param {Object} [options]
	* @param {String} [options.fileType='styl']
	* @return {Object}
	*/
	format: function (options) {
		options = options || {};
		var result = {};

		TERMS.forEach(function (term) {
			result[term] = {
				file: {
					name: '',
					dir: '',
					ext: options.fileType || 'styl'
				}
			};
		});

		return result;
	}
};
