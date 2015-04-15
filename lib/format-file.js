/*!
 * bewbem
 * Copyright(c) 2015 VovanR <mail@vovanr.com>
 * MIT Licensed
 */
'use strict';

var _ = require('lodash');

module.exports = {
    format: function () {
        var data = {
            block: {
            },
            bmod: {
            },
            elem: {
            },
            emod: {
            }
        };
        var fileTemplate = {
            file: {
                name: '',
                dir: '',
                ext: 'styl'
            }
        };

        _.merge(data.block, fileTemplate);
        _.merge(data.bmod, fileTemplate);
        _.merge(data.elem, fileTemplate);
        _.merge(data.emod, fileTemplate);

        return data;
    },
};
