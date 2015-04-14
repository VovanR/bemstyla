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
     */
    getBlockName: function (name) {
        var result = name.split('_')[0];

        return result;
    },

    /**
     * @param {String} name
     * @return {String}
     */
    getElemName: function (name) {
        var result = '';

        if (/__/.test(name)) {
            result = name.split('__')[1].split('_')[0];
        }

        return result;
    },

    /**
     * @param {String} name
     * @return {String}
     */
    getBlockModName: function (name) {
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
     */
    getBlockModValue: function (name) {
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
     */
    getElemModName: function (name) {
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
     */
    getElemModValue: function (name) {
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
                    name: this.getBlockName(name)
                },
                bmod: {
                    name: this.getBlockModName(name),
                    value: this.getBlockModValue(name)
                },
                elem: {
                    name: this.getElemName(name)
                },
                emod: {
                    name: this.getElemModName(name),
                    value: this.getElemModValue(name)
                }
            };
        }

        return parsedCache[name];
    },
};
