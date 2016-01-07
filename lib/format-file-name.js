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
		var result = '';
		var block = parser.parse(source).block;

		if (block && block.name) {
			result = block.name;
		}

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
		var block = parser.parse(source).block;

		if (
			block && block.name &&
			block.mod && block.mod.name
		) {
			result = block.name + block.mod.sep + block.mod.name;

			if (block.mod.val) {
				result += ('_' + block.mod.val);
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
		var block = parsed.block;
		var elem = parsed.elem;

		if (
			block && block.name &&
			elem && elem.name
		) {
			result = block.name + '__' + elem.name;
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
		var block = parsed.block;
		var elem = parsed.elem;

		if (
			block && block.name &&
			elem && elem.name &&
			elem.mod && elem.mod.name
		) {
			result = block.name + '__' + elem.name;
			result += (elem.mod.sep + elem.mod.name);

			if (elem.mod.val) {
				result += ('_' + elem.mod.val);
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
