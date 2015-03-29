var assert = require('chai').assert;
var newbem = require('../index');
var _ = require('lodash');

var testData = [
    {
        data: '',
        block: {
            name: '',
            mod: {
                name: '',
                value: '',
            },
        },
        elem: {
            name: '',
            mod: {
                name: '',
                value: '',
            },
        },
    },
    {
        data: 'block',
        block: {
            name: 'block',
            mod: {
                name: '',
                value: '',
            },
        },
        elem: {
            name: '',
            mod: {
                name: '',
                value: '',
            },
        },
    },
    {
        data: 'block_mod',
        block: {
            name: 'block',
            mod: {
                name: 'mod',
                value: '',
            },
        },
        elem: {
            name: '',
            mod: {
                name: '',
                value: '',
            },
        },
    },
    {
        data: 'block_mod-name_mod-val',
        block: {
            name: 'block',
            mod: {
                name: 'mod-name',
                value: 'mod-val',
            },
        },
        elem: {
            name: '',
            mod: {
                name: '',
                value: '',
            },
        },
    },
    {
        data: 'block__elem',
        block: {
            name: 'block',
            mod: {
                name: '',
                value: '',
            },
        },
        elem: {
            name: 'elem',
            mod: {
                name: '',
                value: '',
            },
        },
    },
    {
        data: 'block__elem_mod',
        block: {
            name: 'block',
            mod: {
                name: '',
                value: '',
            },
        },
        elem: {
            name: 'elem',
            mod: {
                name: 'mod',
                value: '',
            },
        },
    },
    {
        data: 'block__elem_mod-name_mod-val',
        block: {
            name: 'block',
            mod: {
                name: '',
                value: '',
            },
        },
        elem: {
            name: 'elem',
            mod: {
                name: 'mod-name',
                value: 'mod-val',
            },
        },
    },
];

describe('newbem', function () {
    it('should be `Object`', function () {
        assert.isObject(newbem);
    });

    describe('#getBlockName', function () {
        it('should return block name', function () {
            _.forEach(testData, function (data) {
                assert.equal(
                    newbem.getBlockName(data.data),
                    data.block.name
                );
            });
        });
    });

    describe('#getElementName', function () {
        it('should return element name', function () {
            _.forEach(testData, function (data) {
                assert.equal(
                    newbem.getElementName(data.data),
                    data.elem.name
                );
            });
        });
    });

    describe('#getBlockModifierName', function () {
        it('should return block modifier name', function () {
            _.forEach(testData, function (data) {
                assert.equal(
                    newbem.getBlockModifierName(data.data),
                    data.block.mod.name
                );
            });
        });
    });

    describe('#getBlockModifierValue', function () {
        it('should return block modifier value', function () {
            _.forEach(testData, function (data) {
                assert.equal(
                    newbem.getBlockModifierValue(data.data),
                    data.block.mod.value
                );
            });
        });
    });
});
