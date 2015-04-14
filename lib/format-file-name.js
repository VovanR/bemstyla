/*!
 * bewbem
 * Copyright(c) 2015 VovanR <mail@vovanr.com>
 * MIT Licensed
 */
'use strict';

var parser = require('./parser.js');

module.exports = {
    /**
     * @param {String} name
     * @return {String}
     */
    getBlockName: function (name) {
        var result = parser.getBlockName(name);

        return result;
    },

    /**
     * @param {String} name
     * @return {String}
     */
    getBlockModName: function (name) {
        var result = '';
        var parsed = parser.parse(name);

        if (parsed.block.name && parsed.block.mod.name) {
            result = parsed.block.name + '_' + parsed.block.mod.name;

            if (parsed.block.mod.value) {
                result += ('_' + parsed.block.mod.value);
            }
        }

        return result;
    },

    /**
     * @param {String} name
     * @return {String}
     */
    getElemName: function (name) {
        var result = '';
        var parsed = parser.parse(name);

        if (parsed.block.name && parsed.elem.name) {
            result = parsed.block.name + '__' + parsed.elem.name;
        }

        return result;
    },

    /**
     * @param {String} name
     * @return {String}
     */
    getElemModName: function (name) {
        var result = '';
        var parsed = parser.parse(name);

        if (
            parsed.block.name &&
            parsed.elem.name &&
            parsed.elem.mod.name
        ) {
            result = parsed.block.name + '__' + parsed.elem.name;
            result += ('_' + parsed.elem.mod.name);

            if (parsed.elem.mod.value) {
                result += ('_' + parsed.elem.mod.value);
            }
        }

        return result;
    },
};
