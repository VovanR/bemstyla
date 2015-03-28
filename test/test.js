var assert = require('chai').assert;
var newbem = require('../index');
var _ = require('lodash');

var testData = [
    {
        data: '',
        block: '',
        element: '',
        modName: '',
        modValue: '',
    },
    {
        data: 'block',
        block: 'block',
        element: '',
        modName: '',
        modValue: '',
    },
    {
        data: 'block_mod',
        block: 'block',
        element: '',
        modName: 'mod',
        modValue: '',
    },
    {
        data: 'block_mod-name_mod-val',
        block: 'block',
        element: '',
        modName: 'mod-name',
        modValue: 'mod-val',
    },
    {
        data: 'block__elem',
        block: 'block',
        element: 'elem',
        modName: '',
        modValue: '',
    },
    {
        data: 'block__elem_mod',
        block: 'block',
        element: 'elem',
        modName: 'mod',
        modValue: '',
    },
    {
        data: 'block__elem_mod-name_mod-val',
        block: 'block',
        element: 'elem',
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

        it('should return block name', function () {
            assert.equal(
                newbem.getBlockName('block__element'),
                'block'
            );
        });
    });

    describe('#getElementName', function () {
        it('should return element name', function () {
            assert.equal(
                newbem.getElementName(''),
                ''
            );
        });
    });
});
