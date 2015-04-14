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

        _.assign(data.block, fileTemplate);
        _.assign(data.bmod, fileTemplate);
        _.assign(data.elem, fileTemplate);
        _.assign(data.emod, fileTemplate);

        return data;
    },
};
