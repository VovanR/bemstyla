/*!
 * bewbem
 * Copyright(c) 2015 VovanR <mail@vovanr.com>
 * MIT Licensed
 */
'use strict';

var parser = require('./parser.js');

var DS = '/';

module.exports = {
    /**
     * @param {String} name
     * @return {String}
     */
    getBlockDir: function (name) {
        var result = parser.parse(name).block.name;

        return result;
    },

    /**
     * @param {String} name
     * @return {String}
     */
    getBlockModDir: function (name) {
        var result = '';
        var dir = [];
        var parsed = parser.parse(name);

        if (parsed.bmod.name) {
            dir.push(parsed.block.name);
            dir.push('_' + parsed.bmod.name);
            result = dir.join(DS);
        }

        return result;
    },

    /**
     * @param {String} name
     * @return {String}
     */
    getElemDir: function (name) {
        var result = '';
        var dir = [];
        var parsed = parser.parse(name);

        if (parsed.block.name && parsed.elem.name) {
            dir.push(parsed.block.name);
            dir.push('__' + parsed.elem.name);
            result = dir.join(DS);
        }

        return result;
    },

    /**
     * @param {String} name
     * @return {String}
     */
    getElemModDir: function (name) {
        var result = '';
        var dir = [];
        var parsed = parser.parse(name);

        if (
            parsed.block.name &&
            parsed.elem.name &&
            parsed.emod.name
        ) {
            dir.push(parsed.block.name);
            dir.push('__' + parsed.elem.name);
            dir.push('_' + parsed.emod.name);
            result = dir.join(DS);
        }

        return result;
    },
};
