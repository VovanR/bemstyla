/*!
 * bewbem
 * Copyright(c) 2015 VovanR <mail@vovanr.com>
 * MIT Licensed
 */

var parser = require('./parser');
var _ = require('lodash');

var TERMS = ['block', 'bmod', 'elem', 'emod'];

var parsers = {
    /**
     * Block file name
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
     * Block mod file name
     * `block_mod-name_mod-val` -> `block_mod-name_mod-val`
     *
     * @param {String} source
     * @return {String}
     */
    bmod: function (source) {
        var result = '';
        var parsed = parser.parse(source);

        if (parsed.block.name && parsed.bmod.name) {
            result = parsed.block.name + '_' + parsed.bmod.name;

            if (parsed.bmod.value) {
                result += ('_' + parsed.bmod.value);
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

        if (parsed.block.name && parsed.elem.name) {
            result = parsed.block.name + '__' + parsed.elem.name;
        }

        return result;
    },

    /**
     * Elem mod file name
     * `block__elem_mod-name_mod-val` -> `block__elem_mod-name_mod-val`
     *
     * @param {String} source
     * @return {String}
     */
    emod: function (source) {
        var result = '';
        var parsed = parser.parse(source);

        if (
            parsed.block.name &&
            parsed.elem.name &&
            parsed.emod.name
        ) {
            result = parsed.block.name + '__' + parsed.elem.name;
            result += ('_' + parsed.emod.name);

            if (parsed.emod.value) {
                result += ('_' + parsed.emod.value);
            }
        }

        return result;
    },
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
    },
};
