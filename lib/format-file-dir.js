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
		var result = parser.parse(source).name;

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
		var parsed = parser.parse(source);

		if (parsed.mod.name) {
			if (parsed.mod.sep === '_') {
				dir.push(parsed.name);
				dir.push('_' + parsed.mod.name);
			} else {
				dir.push(parsed.name);
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

		if (parsed.name && parsed.elem.name) {
			dir.push(parsed.name);
			dir.push('__' + parsed.elem.name);
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

		if (
			parsed.name &&
			parsed.elem.name &&
			parsed.elem.mod.name
		) {
			dir.push(parsed.name);
			dir.push('__' + parsed.elem.name);
			if (parsed.elem.mod.sep === '_') {
				dir.push(parsed.elem.mod.sep + parsed.elem.mod.name);
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
