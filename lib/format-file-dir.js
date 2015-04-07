/*!
 * bewbem
 * Copyright(c) 2015 VovanR <mail@vovanr.com>
 * MIT Licensed
 */

var parser = require('./parser.js');

var DS = '/';

module.exports = {
    /**
     * @param {String} name
     * @return {String}
     */
    getBlockDir: function (name) {
        var result = parser.getBlockName(name);

        return result;
    },

    /**
     * @param {String} name
     * @return {String}
     */
    getBlockModifierDir: function (name) {
        var result = '';
        var dir = [];
        var parsed = parser.parse(name);
        var block = parsed.block;

        if (block.mod.name) {
            dir.push(block.name);
            dir.push('_' + block.mod.name);
            result = dir.join(DS);
        }

        return result;
    },

    /**
     * @param {String} name
     * @return {String}
     */
    getElementDir: function (name) {
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
    getElementModifierDir: function (name) {
        var result = '';
        var dir = [];
        var parsed = parser.parse(name);

        if (
            parsed.block.name &&
            parsed.elem.name &&
            parsed.elem.mod.name
        ) {
            dir.push(parsed.block.name);
            dir.push('__' + parsed.elem.name);
            dir.push('_' + parsed.elem.mod.name);
            result = dir.join(DS);
        }

        return result;
    },
};
