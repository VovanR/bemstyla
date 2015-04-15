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

        if (parsed.block.name && parsed.bmod.name) {
            result = parsed.block.name + '_' + parsed.bmod.name;

            if (parsed.bmod.value) {
                result += ('_' + parsed.bmod.value);
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
