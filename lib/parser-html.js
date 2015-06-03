/*!
 * bemstyla
 * Copyright(c) 2015 VovanR <mail@vovanr.com>
 * MIT Licensed
 */

var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var exists = fs.existsSync || path.existsSync;

module.exports = {
    /**
     * HTML source parser
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

        if (!/\sclass=/.test(source)) {
            return result;
        }

        var re = /class=(?:"|')([\w\s-]+?)(?:"|')/g;

        var parsed = [];
        source.replace(
            re,
            function (match, p) {
                p = p.split(' ');
                _.forEach(p, function (r) {
                    r = r.trim();
                    if (r !== '') {
                        parsed.push(r);
                    }
                });
            }
        );

        parsed = _.uniq(parsed);

        if (parsed.length > 0) {
            result = parsed;
        }

        return result;
    },

    /**
     * HTML file parser
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
