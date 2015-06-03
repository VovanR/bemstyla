/*!
 * bemstyla
 * Copyright(c) 2015 VovanR <mail@vovanr.com>
 * MIT Licensed
 */

var _ = require('lodash');

var TERMS = ['block', 'bmod', 'elem', 'emod'];

module.exports = {
    /**
     * File fish data
     *
     * @return {Object}
     */
    format: function () {
        var result = {};

        _.forEach(TERMS, function (term) {
            result[term] = {
                file: {
                    name: '',
                    dir: '',
                    ext: 'styl'
                }
            };
        });

        return result;
    },
};
