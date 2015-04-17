/*!
 * bewbem
 * Copyright(c) 2015 VovanR <mail@vovanr.com>
 * MIT Licensed
 */

var parser = require('./parser');
var path = require('path');
var _ = require('lodash');

var TERMS = ['block', 'bmod', 'elem', 'emod'];
var DS = '/';

var parsers = {
    /**
     * Block dit path
     * `block__elem` -> `block`
     *
     * @param {String} source
     * @return {String}
     */
    block: function (source) {
        var result = parser.parse(source).block.name;

        return result;
    },

    /**
     * Block mod dit path
     * `block_mod-name_mod-val` -> `block/_mod-name`
     *
     * @param {String} source
     * @return {String}
     */
    bmod: function (source) {
        var result = '';
        var dir = [];
        var parsed = parser.parse(source);

        if (parsed.bmod.name) {
            dir.push(parsed.block.name);
            dir.push('_' + parsed.bmod.name);
            result = dir.join(DS);
            result = path.normalize(result);
        }

        return result;
    },

    /**
     * Elem dit path
     * `block__elem` -> `block/__elem`
     *
     * @param {String} source
     * @return {String}
     */
    elem: function (source) {
        var result = '';
        var dir = [];
        var parsed = parser.parse(source);

        if (parsed.block.name && parsed.elem.name) {
            dir.push(parsed.block.name);
            dir.push('__' + parsed.elem.name);
            result = dir.join(DS);
            result = path.normalize(result);
        }

        return result;
    },

    /**
     * Elem mod dit path
     * `block__elem_mod-name_mod-val` -> `block/__elem/_mod-name`
     *
     * @param {String} source
     * @return {String}
     */
    emod: function (source) {
        var result = '';
        var dir = [];
        var parsed = parser.parse(source);

        if (
            parsed.block.name &&
            parsed.elem.name &&
            parsed.emod.name
        ) {
            dir.push(parsed.block.name);
            dir.push('__' + parsed.elem.name);
            dir.push('_' + parsed.emod.name);
            result = dir.join(DS);
            result = path.normalize(result);
        }

        return result;
    },
};

module.exports = {
    /**
     * File dirs data
     *
     * @param {String} source
     * @return {Object}
     */
    format: function (source) {
        var result = {};

        _.forEach(TERMS, function (term) {
            result[term] = {
                file: {
                    dir: (parsers[term])(source)
                }
            };
        });

        return result;
    },
};
