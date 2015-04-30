/*!
 * bewbem
 * Copyright(c) 2015 VovanR <mail@vovanr.com>
 * MIT Licensed
 */

var _ = require('lodash');
var fs = require('fs');
var exists = fs.existsSync || path.existsSync;

module.exports = {
    /**
     * Jade source parser
     *
     * @param {String} source
     * @return {Array}
     */
    parseString: function (source) {
        var result = [];

        if (_.isUndefined(source)) {
            return result;
        }

        source = String(source);

        if (!/\./.test(source)) {
            return result;
        }

        var re = /\.([^\s\.]+)/gm;

        var parsed = source.match(re);
        parsed = _.map(parsed, function (item) {
            return item.slice(1);
        });

        parsed = _.uniq(parsed);

        if (parsed.length > 0) {
            result = parsed;
        }

        return result;
    },

    /**
     * Jade file parser
     *
     * @param {String} filePath
     * @return {Array}
     */
    parseFile: function (filePath) {
        var result = [];

        if (!exists(filePath)) {
            return result;
        }

        var fileText = fs.readFileSync(filePath).toString();
        result = this.parseString(fileText);

        return result;
    },
};
