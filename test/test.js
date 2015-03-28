var assert = require('chai').assert;
var newbem = require('../index');
var _ = require('lodash');

var testData = [
    {
        data: '',
        block: '',
        elem: '',
        modName: '',
        modValue: '',
    },
    {
        data: 'block',
        block: 'block',
        elem: '',
        modName: '',
        modValue: '',
    },
    {
        data: 'block_mod',
        block: 'block',
        elem: '',
        modName: 'mod',
        modValue: '',
    },
    {
        data: 'block_mod-name_mod-val',
        block: 'block',
        elem: '',
        modName: 'mod-name',
        modValue: 'mod-val',
    },
    {
        data: 'block__elem',
        block: 'block',
        elem: 'elem',
        modName: '',
        modValue: '',
    },
    {
        data: 'block__elem_mod',
        block: 'block',
        elem: 'elem',
        modName: 'mod',
        modValue: '',
    },
    {
        data: 'block__elem_mod-name_mod-val',
        block: 'block',
        elem: 'elem',
        modName: 'mod-name',
        modValue: 'mod-val',
    },
];

describe('newbem', function () {
    it('should be `Object`', function () {
        assert.isObject(newbem);
    });

    it('should return `true`', function () {
        assert.isTrue(newbem.getTrue());
    });

    describe('#getBlockName', function () {
        it('should return block name', function () {
            _.forEach(testData, function (data) {
                assert.equal(
                    newbem.getBlockName(data.data),
                    data.block
                );
            });
        });
    });

    describe('#getElementName', function () {
        it('should return element name', function () {
            _.forEach(testData, function (data) {
                assert.equal(
                    newbem.getElementName(data.data),
                    data.elem
                );
            });
        });
    });
});
