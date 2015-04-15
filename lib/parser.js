/*!
 * bewbem
 * Copyright(c) 2015 VovanR <mail@vovanr.com>
 * MIT Licensed
 */

// For Parser memoization
var parsedCache = {};

module.exports = {
    /**
     * @param {String} source
     * @return {String}
     * @private
     */
    _getBlockName: function (source) {
        var result = source.split('_')[0];

        return result;
    },

    /**
     * @param {String} source
     * @return {String}
     * @private
     */
    _getElemName: function (source) {
        var result = '';

        if (/__/.test(source)) {
            result = source.split('__')[1].split('_')[0];
        }

        return result;
    },

    /**
     * @param {String} source
     * @return {String}
     * @private
     */
    _getBlockModName: function (source) {
        var result = '';

        if (/_/.test(source)) {
            if (!/__/.test(source)) {
                result = source.split('_')[1];
            }
        }

        return result;
    },

    /**
     * @param {String} source
     * @return {String}
     * @private
     */
    _getBlockModValue: function (source) {
        var result = '';

        if (/_/.test(source)) {
            if (!/__/.test(source)) {
                result = source.split('_')[2] || '';
            }
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

        if (/__/.test(source)) {
            source = source.split('__')[1];

            if (/_/.test(source)) {
                result = source.split('_')[1];
            }
        }

        return result;
    },

    /**
     * @param {String} source
     * @return {String}
     * @private
     */
    _getElemModValue: function (source) {
        var result = '';

        if (/__/.test(source)) {
            source = source.split('__')[1];

            if (/_/.test(source)) {
                result = source.split('_')[2] || '';
            }
        }

        return result;
    },

    /**
     * @param {String} source
     * @return {Object}
     */
    parse: function (source) {
        if (!parsedCache.hasOwnProperty(source)) {
            parsedCache[source] = {
                block: {
                    name: this._getBlockName(source)
                },
                bmod: {
                    name: this._getBlockModName(source),
                    value: this._getBlockModValue(source)
                },
                elem: {
                    name: this._getElemName(source)
                },
                emod: {
                    name: this._getElemModName(source),
                    value: this._getElemModValue(source)
                }
            };
        }

        return parsedCache[source];
    },
};
