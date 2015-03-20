var assert = require('chai').assert;
var newbem = require('../index');

describe('newbem', function () {
    it('should be `Object`', function () {
        assert.isObject(newbem);
    });

    it('should return `true`', function () {
        assert.isTrue(newbem.getTrue());
    });

    describe('#getBlockName', function () {
        it('should return block name', function () {
            assert.equal(
                newbem.getBlockName(''),
                ''
            );
            assert.equal(
                newbem.getBlockName('block'),
                'block'
            );
            assert.equal(
                newbem.getBlockName('newblock'),
                'newblock'
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
