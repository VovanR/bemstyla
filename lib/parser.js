/*
 * bemstyla
 * Copyright(c) 2015 Vladimir Rodkin <mail@vovanr.com>
 * MIT Licensed
 */

var _ = require('lodash');
var TERMS = require('./env').TERMS;

// For Parser memoization
var parsedCache = {};

var parsers = {
	block: {
		/**
		* Block name
		* `block__elem` -> `block`
		*
		* @param {String} source
		* @return {String}
		*/
		getName: function (source) {
			var result = source;

			if (/_/.test(source)) {
				result = source.split('_')[0];
			} else if (/--/.test(source)) {
				result = source.split('--')[0];
			}

			return result;
		}
	},

	bmod: {
		/**
		* Block mod name
		* `block_mod-name_mod-val` -> `mod-name`
		* `block--mod-name` -> `mod-name`
		*
		* @param {String} source
		* @return {String}
		*/
		getName: function (source) {
			var result = '';

			if (!/__/.test(source)) {
				if (/_/.test(source)) {
					result = source.split('_')[1];
				} else if (/--/.test(source)) {
					result = source.split('--')[1];
				}
			}

			return result;
		},

		/**
		* Block mod separator
		* `block_mod-name` -> `_`
		* `block--mod-name` -> `--`
		*
		* @param {String} source
		* @return {String}
		*/
		getSep: function (source) {
			var result = '';

			if (!/__/.test(source)) {
				if (/_/.test(source)) {
					result = '_';
				} else if (/--/.test(source)) {
					result = '--';
				}
			}

			return result;
		},

		/**
		* Block mod value
		* `block_mod-name_mod-val` -> `mod-val`
		*
		* @param {String} source
		* @return {String}
		*/
		getValue: function (source) {
			var result = '';

			if (/_/.test(source)) {
				if (!/__/.test(source)) {
					result = source.split('_')[2] || '';
				}
			}

			return result;
		}
	},

	elem: {
		/**
		* Elem name
		* `block__elem` -> `elem`
		*
		* @param {String} source
		* @return {String}
		*/
		getName: function (source) {
			var result = '';

			if (/__/.test(source)) {
				result = source.split('__')[1];
			}

			if (/_/.test(result)) {
				result = result.split('_')[0];
			} else if (/--/.test(result)) {
				result = result.split('--')[0];
			}

			return result;
		}
	},

	emod: {
		/**
		* Elem mod name
		* `block__elem_mod-name_mod-val` -> `mod-name`
		* `block__elem--mod-name` -> `mod-name`
		*
		* @param {String} source
		* @return {String}
		*/
		getName: function (source) {
			var result = '';

			if (/__/.test(source)) {
				source = source.split('__')[1];

				if (/_/.test(source)) {
					result = source.split('_')[1];
				} else if (/--/.test(source)) {
					result = source.split('--')[1];
				}
			}

			return result;
		},

		/**
		* Elem mod separator
		* `block__elem_mod-name` -> `_`
		* `block__elem--mod-name` -> `--`
		*
		* @param {String} source
		* @return {String}
		*/
		getSep: function (source) {
			var result = '';

			if (/__/.test(source)) {
				source = source.split('__')[1];

				if (/_/.test(source)) {
					result = '_';
				} else if (/--/.test(source)) {
					result = '--';
				}
			}

			return result;
		},

		/**
		* Elem mod value
		* `block__elem_mod-name_mod-val` -> `mod-val`
		*
		* @param {String} source
		* @return {String}
		*/
		getValue: function (source) {
			var result = '';

			if (/__/.test(source)) {
				source = source.split('__')[1];

				if (/_/.test(source)) {
					result = source.split('_')[2] || '';
				}
			}

			return result;
		}
	}
};

module.exports = {
	/**
	* BEM data
	*
	* @param {String} source
	* @return {Object}
	*/
	parse: function (source) {
		var result;

		if (!parsedCache.hasOwnProperty(source)) {
			result = {};

			_.forEach(TERMS, function (term) {
				var parse = parsers[term];
				result[term] = {
					name: parse.getName(source)
				};

				if (_.isFunction(parse.getSep)) {
					result[term].sep = parse.getSep(source);
				}

				if (_.isFunction(parse.getValue)) {
					result[term].value = parse.getValue(source);
				}
			});

			parsedCache[source] = result;
		}

		return parsedCache[source];
	}
};
