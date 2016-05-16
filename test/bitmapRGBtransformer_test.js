const chai = require('chai');
const expect = chai.expect;
const bmp = require('../bmpRGBtransformer.js')
const fs = require('fs');
var fileExists = require('file-exists');

describe('Testing 8 bit transform with out arguments', () => {
  var testbmp = __dirname + '/testimages/dude-8bit.bmp'
  var bmpoutput = __dirname + '/testimages/test-dude-8bit.bmp'
  var rgb = [1, 1, 1]

  before((done) => {
    bmp.bmpRGBtransformer(testbmp, bmpoutput, rgb, done)
  });

  it('should return a new file', function () {
    expect(fileExists(bmpoutput)).to.eql(true)
  });

  it('should be an exact copy of orignal file', function () {
    a = fs.readFileSync(testbmp)
    b = fs.readFileSync(bmpoutput)
    expect(a).to.eql(a)
  });
});

describe('Testing 16 bit transform with out arguments', () => {
  var testbmp = __dirname + '/testimages/dude-16bit.bmp'
  var bmpoutput = __dirname + '/testimages/test-dude-16bit.bmp'
  var rgb = [1, 1, 1]

  before((done) => {
    bmp.bmpRGBtransformer(testbmp, bmpoutput, rgb, done)
  });

  it('should return a new file', function () {
    expect(fileExists(bmpoutput)).to.eql(true)
  });

  it('should be an exact copy of orignal file', function () {
    a = fs.readFileSync(testbmp)
    b = fs.readFileSync(bmpoutput)
    expect(a).to.eql(a)
  });
});

describe('Testing 24 bit transform with out arguments', () => {
  var testbmp = __dirname + '/testimages/dude-24bit.bmp'
  var bmpoutput = __dirname + '/testimages/test-dude-24bit.bmp'
  var rgb = [1, 1, 1]

  before((done) => {
    bmp.bmpRGBtransformer(testbmp, bmpoutput, rgb, done)
  });

  it('should return a new file', function () {
    expect(fileExists(bmpoutput)).to.eql(true)
  });

  it('should be an exact copy of orignal file', function () {
    a = fs.readFileSync(testbmp)
    b = fs.readFileSync(bmpoutput)
    expect(a).to.eql(a)
  });
});
