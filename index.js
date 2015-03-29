/*!
 * bewbem
 * Copyright(c) 2015 VovanR <mail@vovanr.com>
 * MIT Licensed
 */

module.exports = {
    /**
     * @param {String} name
     * @return {String}
     */
    getBlockName: function (name) {
        var result = name.split('_')[0];

        return result;
    },

    /**
     * @param {String} name
     * @return {String}
     */
    getElementName: function (name) {
        var result = '';

        if (/__/.test(name)) {
            result = name.split('__')[1].split('_')[0];
        }

        return result;
    },

    /**
     * @param {String} name
     * @return {String}
     */
    getBlockModifierName: function (name) {
        var result = '';

        if (/_/.test(name)) {
            if (!/__/.test(name)) {
                result = name.split('_')[1];
            }
        }

        return result;
    },
};
