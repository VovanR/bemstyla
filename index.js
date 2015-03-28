/*!
 * bewbem
 * Copyright(c) 2015 VovanR <mail@vovanr.com>
 * MIT Licensed
 */

module.exports = {
    getTrue: function () {
        return true;
    },

    getBlockName: function (name) {
        var result = name.split('_')[0];

        return result;
    },

    getElementName: function (name) {
        var result = '';

        if (/__/.test(name)) {
            result = name.split('__')[1].split('_')[0];
        }

        return result;
    },
};
