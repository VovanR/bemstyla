/*
 * bemstyla
 * Copyright(c) 2015 Vladimir Rodkin <mail@vovanr.com>
 * MIT Licensed
 */

var parser = require('bem-classname-parser');
var path = require('path');
var _ = require('lodash');
var ENV = require('./env');
var TERMS = ENV.TERMS;
var DS = ENV.DS;

var parsers = {
	/**
	* Block dir path
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
	* Block mod dir path
	* `block_mod-name_mod-val` -> `block/_mod-name`
	* `block--mod-name` -> `block`
	*
	* @param {String} source
	* @return {String}
	*/
	bmod: function (source) {
		var result = '';
		var dir = [];
		var block = parser.parse(source).block;

		if (
			block &&
			block.mod && block.mod.name
		) {
			if (block.mod.sep === '_') {
				dir.push(block.name);
				dir.push('_' + block.mod.name);
			} else {
				dir.push(block.name);
			}
			result = dir.join(DS);
			result = path.normalize(result);
		}

		return result;
	},

	/**
	* Elem dir path
	* `block__elem` -> `block/__elem`
	*
	* @param {String} source
	* @return {String}
	*/
	elem: function (source) {
		var result = '';
		var dir = [];
		var parsed = parser.parse(source);
		var block = parsed.block;
		var elem = parsed.elem;

		if (
			block && block.name &&
			elem && elem.name
		) {
			dir.push(block.name);
			dir.push('__' + elem.name);
			result = dir.join(DS);
			result = path.normalize(result);
		}

		return result;
	},

	/**
	* Elem mod dir path
	* `block__elem_mod-name_mod-val` -> `block/__elem/_mod-name`
	* `block__elem--mod-name` -> `block/__elem`
	*
	* @param {String} source
	* @return {String}
	*/
	emod: function (source) {
		var result = '';
		var dir = [];
		var parsed = parser.parse(source);
		var block = parsed.block;
		var elem = parsed.elem;

		if (
			block && block.name &&
			elem && elem.name &&
			elem.mod && elem.mod.name
		) {
			dir.push(block.name);
			dir.push('__' + elem.name);
			if (elem.mod.sep === '_') {
				dir.push(elem.mod.sep + elem.mod.name);
			}
			result = dir.join(DS);
			result = path.normalize(result);
		}

		return result;
	}
};

module.exports = {
	/**
	* File dirs data
	*
	* @param {String} source
	* @param {String} [baseDir]
	* @return {Object}
	*/
	format: function (source, baseDir) {
		var result = {};

		_.forEach(TERMS, function (term) {
			var dir = (parsers[term])(source);
			if (dir && baseDir) {
				dir = path.join(baseDir, dir);
			}
			result[term] = {
				file: {
					dir: dir
				}
			};
		});

		return result;
	}
};
