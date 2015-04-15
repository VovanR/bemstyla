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
         * @param {String} source
         * @return {String}
         * @private
         */
        getName: function (source) {
            var result = source.split('_')[0];

            return result;
        },
    },

    bmod: {
        /**
         * @param {String} source
         * @return {String}
         * @private
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
         * @param {String} source
         * @return {String}
         * @private
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
         * @param {String} source
         * @return {String}
         * @private
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
         * @param {String} source
         * @return {String}
         * @private
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
         * @param {String} source
         * @return {String}
         * @private
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
