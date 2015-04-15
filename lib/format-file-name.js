/*!
 * bewbem
 * Copyright(c) 2015 VovanR <mail@vovanr.com>
 * MIT Licensed
 */

var parser = require('./parser.js');

module.exports = {
    /**
     * @param {String} source
     * @return {String}
     * @private
     */
    _getBlockName: function (source) {
        var result = parser.parse(source).block.name;

        return result;
    },

    /**
     * @param {String} source
     * @return {String}
     * @private
     */
    _getBlockModName: function (source) {
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
     * @param {String} source
     * @return {String}
     * @private
     */
    _getElemName: function (source) {
        var result = '';
        var parsed = parser.parse(source);

        if (parsed.block.name && parsed.elem.name) {
            result = parsed.block.name + '__' + parsed.elem.name;
        }

        return result;
    },

    /**
     * @param {String} source
     * @return {String}
     * @private
     */
    _getElemModName: function (source) {
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

    /**
     * @param {String} source
     * @return {Object}
     */
    format: function (source) {
        return {
            block: {
                file: {
                    name: this._getBlockName(source)
                }
            },
            bmod: {
                file: {
                    name: this._getBlockModName(source)
                }
            },
            elem: {
                file: {
                    name: this._getElemName(source)
                }
            },
            emod: {
                file: {
                    name: this._getElemModName(source)
                }
            },
        };
    },
};
