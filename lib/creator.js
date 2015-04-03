/*!
 * bewbem
 * Copyright(c) 2015 VovanR <mail@vovanr.com>
 * MIT Licensed
 */

var parser = require('./parser.js');
var _ = require('lodash');
var fs = require('fs');

module.exports = {
    /**
     * Converts input string to path
     *
     * @param {String} input
     * @return {String} path
     */
    getPath: function (input) {
        var block = parser.getBlockName(input);
        var blockModName = parser.getBlockModifierName(input);
        var elem = parser.getElementName(input);
        var elemModName = parser.getElementModifierName(input);

        var path = [];

        if (block === '') {
            return '';
        }
        path.push(block);

        if (blockModName !== '') {
            path.push('_' + blockModName);
        }

        if (elem !== '') {
            path.push('__' + elem);
        }

        if (elemModName !== '') {
            path.push('_' + elemModName);
        }

        path = path.join('/');

        return path;
    },
};
