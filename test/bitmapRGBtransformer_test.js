const chai = require('chai');
const expect = chai.expect;
const bmp = require('../bitmapRGBtransformer.js')


describe('Testing your new friend', () => {
  it('Your friend uses your name', () => {
    expect(bmp.checkArgs()).to.eql(true);
  })
})
