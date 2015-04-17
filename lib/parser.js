/*!
 * bewbem
 * Copyright(c) 2015 VovanR <mail@vovanr.com>
 * MIT Licensed
 */

var _ = require('lodash');

var TERMS = ['block', 'bmod', 'elem', 'emod'];

// For Parser memoization
var parsedCache = {};

var parsers = {
    block: {
        /**
         * Block name
         * `block__elem` -> `block`
         *
         * @param {String} source
         * @return {String}
         */
        getName: function (source) {
            var result = source.split('_')[0];

            return result;
        },
    },

    bmod: {
        /**
         * Block mod name
         * `block_mod-name_mod-val` -> `mod-name`
         *
         * @param {String} source
         * @return {String}
         */
        getName: function (source) {
            var result = '';

            if (/_/.test(source)) {
                if (!/__/.test(source)) {
                    result = source.split('_')[1];
                }
            }

            return result;
        },

        /**
         * Block mod value
         * `block_mod-name_mod-val` -> `mod-val`
         *
         * @param {String} source
         * @return {String}
         */
        getValue: function (source) {
            var result = '';

            if (/_/.test(source)) {
                if (!/__/.test(source)) {
                    result = source.split('_')[2] || '';
                }
            }

            return result;
        },
    },

    elem: {
        /**
         * Elem name
         * `block__elem` -> `elem`
         *
         * @param {String} source
         * @return {String}
         */
        getName: function (source) {
            var result = '';

            if (/__/.test(source)) {
                result = source.split('__')[1].split('_')[0];
            }

            return result;
        },
    },

    emod: {
        /**
         * Elem mod name
         * `block__elem_mod-name_mod-val` -> `mod-name`
         *
         * @param {String} source
         * @return {String}
         */
        getName: function (source) {
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
         * Elem mod value
         * `block__elem_mod-name_mod-val` -> `mod-val`
         *
         * @param {String} source
         * @return {String}
         */
        getValue: function (source) {
            var result = '';

            if (/__/.test(source)) {
                source = source.split('__')[1];

                if (/_/.test(source)) {
                    result = source.split('_')[2] || '';
                }
            }

            return result;
        },
    },
};

module.exports = {
    /**
     * BEM data
     *
     * @param {String} source
     * @return {Object}
     */
    parse: function (source) {
        var result;

        if (!parsedCache.hasOwnProperty(source)) {
            result = {};

            _.forEach(TERMS, function (term) {
                var parse = parsers[term];
                result[term] = {
                    name: parse.getName(source),
                };

                if (_.isFunction(parse.getValue)) {
                    result[term].value = parse.getValue(source);
                }
            });

            parsedCache[source] = result;
        }

        return parsedCache[source];
    },
};
