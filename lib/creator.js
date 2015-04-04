/*!
 * bewbem
 * Copyright(c) 2015 VovanR <mail@vovanr.com>
 * MIT Licensed
 */

var parser = require('./parser.js');
var _ = require('lodash');
var fs = require('fs');

var DS = '/';

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

        path = path.join(DS);

        return path;
    },

    /**
     * @param {String} input
     * @return {Object}
     */
    getFilePaths: function (input) {
        var parsed = parser.parse(input);

        // Fish
        var files = {
            block: {
                file: '',
                mod: {
                    file: ''
                }
            },
            elem: {
                file: '',
                mod: {
                    file: ''
                }
            }
        };

        // Cache parsed vars
        var block = parsed.block.name;
        var blockModName = parsed.block.mod.name;
        var blockModVal = parsed.block.mod.value;
        var elem = parsed.elem.name;
        var elemModName = parsed.elem.mod.name;
        var elemModVal = parsed.elem.mod.value;

        var blockFile = [];
        var blockModFile = [];
        var elemFile = [];
        var elemModFile = [];

        // Block
        if (block) {
            blockFile.push(block);
            blockFile.push(block);
            files.block.file = blockFile.join(DS);
        }

        // Block Modifier
        if (blockModName) {
            blockModFile.push(block);
            blockModFile.push('_' + blockModName);

            if (blockModVal) {
                blockModName += ('_' + blockModVal);
            }

            blockModFile.push(block + '_' + blockModName);

            files.block.mod.file = blockModFile.join(DS);
        }

        // Element
        if (elem) {
            elemFile.push(block);
            elemFile.push('__' + elem);
            elemFile.push(block + '__' + elem);

            files.elem.file = elemFile.join(DS);
        }

        // Element Modifier
        if (elemModName) {
            elemModFile.push(block);
            elemModFile.push('__' + elem);
            elemModFile.push('_' + elemModName);

            if (elemModVal) {
                elemModName += ('_' + elemModVal);
            }

            elemModFile.push(block + '__' + elem + '_' + elemModName);

            files.elem.mod.file = elemModFile.join(DS);
        }

        // Merge result
        _.merge(parsed, files);

        return parsed;
    },
};
