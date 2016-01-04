/*
 * bemstyla
 * Copyright(c) 2015 Vladimir Rodkin <mail@vovanr.com>
 * MIT Licensed
 */

var parser = require('bem-classname-parser');
var _ = require('lodash');
var TERMS = require('./env').TERMS;

var parsers = {
	/**
	* Block file name
	* `block__elem` -> `block`
	*
	* @param {String} source
	* @return {String}
	*/
	block: function (source) {
		var result = parser.parse(source).name;

		return result;
	},

	/**
	* Block mod file name
	* `block_mod-name_mod-val` -> `block_mod-name_mod-val`
	* `block--mod-name` -> `block--mod-name`
	*
	* @param {String} source
	* @return {String}
	*/
	bmod: function (source) {
		var result = '';
		var parsed = parser.parse(source);

		if (parsed.name && parsed.mod.name) {
			result = parsed.name + parsed.mod.sep + parsed.mod.name;

			if (parsed.mod.val) {
				result += ('_' + parsed.mod.val);
			}
		}

		return result;
	},

	/**
	* Elem file name
	* `block__elem` -> `block__elem`
	*
	* @param {String} source
	* @return {String}
	*/
	elem: function (source) {
		var result = '';
		var parsed = parser.parse(source);

		if (parsed.name && parsed.elem.name) {
			result = parsed.name + '__' + parsed.elem.name;
		}

		return result;
	},

	/**
	* Elem mod file name
	* `block__elem_mod-name_mod-val` -> `block__elem_mod-name_mod-val`
	* `block__elem--mod-name` -> `block__elem--mod-name`
	*
	* @param {String} source
	* @return {String}
	*/
	emod: function (source) {
		var result = '';
		var parsed = parser.parse(source);

		if (
			parsed.name &&
			parsed.elem.name &&
			parsed.elem.mod.name
		) {
			result = parsed.name + '__' + parsed.elem.name;
			result += (parsed.elem.mod.sep + parsed.elem.mod.name);

			if (parsed.elem.mod.val) {
				result += ('_' + parsed.elem.mod.val);
			}
		}

		return result;
	}
};

module.exports = {
	/**
	* File names data
	*
	* @param {String} source
	* @return {Object}
	*/
	format: function (source) {
		var result = {};

		_.forEach(TERMS, function (term) {
			result[term] = {
				file: {
					name: (parsers[term])(source)
				}
			};
		});

		return result;
	}
};
