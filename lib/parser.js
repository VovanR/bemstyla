/*!
 * bewbem
 * Copyright(c) 2015 VovanR <mail@vovanr.com>
 * MIT Licensed
 */
'use strict';

// For Parser memoization
var parsedCache = {};

module.exports = {
    /**
     * @param {String} name
     * @return {String}
     * @private
     */
    _getBlockName: function (name) {
        var result = name.split('_')[0];

        return result;
    },

    /**
     * @param {String} name
     * @return {String}
     * @private
     */
    _getElemName: function (name) {
        var result = '';

        if (/__/.test(name)) {
            result = name.split('__')[1].split('_')[0];
        }

        return result;
    },

    /**
     * @param {String} name
     * @return {String}
     * @private
     */
    _getBlockModName: function (name) {
        var result = '';

        if (/_/.test(name)) {
            if (!/__/.test(name)) {
                result = name.split('_')[1];
            }
        }

        return result;
    },

    /**
     * @param {String} name
     * @return {String}
     * @private
     */
    _getBlockModValue: function (name) {
        var result = '';

        if (/_/.test(name)) {
            if (!/__/.test(name)) {
                result = name.split('_')[2] || '';
            }
        }

        return result;
    },

    /**
     * @param {String} name
     * @return {String}
     * @private
     */
    _getElemModName: function (name) {
        var result = '';

        if (/__/.test(name)) {
            name = name.split('__')[1];

            if (/_/.test(name)) {
                result = name.split('_')[1];
            }
        }

        return result;
    },

    /**
     * @param {String} name
     * @return {String}
     * @private
     */
    _getElemModValue: function (name) {
        var result = '';

        if (/__/.test(name)) {
            name = name.split('__')[1];

            if (/_/.test(name)) {
                result = name.split('_')[2] || '';
            }
        }

        return result;
    },

    /**
     * @param {String} name
     * @return {Object}
     */
    parse: function (name) {
        if (!parsedCache.hasOwnProperty(name)) {
            parsedCache[name] = {
                block: {
                    name: this._getBlockName(name)
                },
                bmod: {
                    name: this._getBlockModName(name),
                    value: this._getBlockModValue(name)
                },
                elem: {
                    name: this._getElemName(name)
                },
                emod: {
                    name: this._getElemModName(name),
                    value: this._getElemModValue(name)
                }
            };
        }

        return parsedCache[name];
    },
};
