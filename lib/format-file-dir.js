/*!
 * bewbem
 * Copyright(c) 2015 VovanR <mail@vovanr.com>
 * MIT Licensed
 */

var parser = require('./parser.js');

var DS = '/';

module.exports = {
    /**
     * @param {String} source
     * @return {String}
     * @private
     */
    _getBlockDir: function (source) {
        var result = parser.parse(source).block.name;

        return result;
    },

    /**
     * @param {String} source
     * @return {String}
     * @private
     */
    _getBlockModDir: function (source) {
        var result = '';
        var dir = [];
        var parsed = parser.parse(source);

        if (parsed.bmod.name) {
            dir.push(parsed.block.name);
            dir.push('_' + parsed.bmod.name);
            result = dir.join(DS);
        }

        return result;
    },

    /**
     * @param {String} source
     * @return {String}
     * @private
     */
    _getElemDir: function (source) {
        var result = '';
        var dir = [];
        var parsed = parser.parse(source);

        if (parsed.block.name && parsed.elem.name) {
            dir.push(parsed.block.name);
            dir.push('__' + parsed.elem.name);
            result = dir.join(DS);
        }

        return result;
    },

    /**
     * @param {String} source
     * @return {String}
     * @private
     */
    _getElemModDir: function (source) {
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
        }

        return result;
    },

    /**
     * @param {String} source
     * @return {Object}
     */
    format: function (source) {
        var result = {
            block: {
                file: {
                    dir: this._getBlockDir(source)
                }
            },
            bmod: {
                file: {
                    dir: this._getBlockModDir(source)
                }
            },
            elem: {
                file: {
                    dir: this._getElemDir(source)
                }
            },
            emod: {
                file: {
                    dir: this._getElemModDir(source)
                }
            },
        };

        return result;
    },
};
