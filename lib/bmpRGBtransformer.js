module.exports.bmpRGBtransformer = function (filename, output, rgb, cb) {

const fs = require('fs');
const headers = {};
const bmpInfo = {};
var byteMakerAdvancer;
var rgbScheme = {}


checkBMP = function () {
  if (bmpInfo.type == "BM" && bmpInfo.colorDepth <= 24) {} else {
    console.log("Bitmap with colorDepth of " + bmpInfo.colorDepth + ' and type ' + bmpInfo.type + " detected")
    throw "Invalid .BMP, please submit .BMP with type BM and color depth of 8, 16 or 24 bits";
  }
  console.log("Bitmap with colorDepth of " + bmpInfo.colorDepth + " detected");
}

getBMPinfo = function (file) {
  bmpInfo.type = file.toString('ascii', 0, 2);
  bmpInfo.size = file.readUInt32LE(2)
  bmpInfo.pixelStart = file.readUInt32LE(10);
  bmpInfo.width = file.readUInt32LE(18);
  bmpInfo.height = file.readUInt32LE(22);
  bmpInfo.colorDepth = file.readUInt16LE(28);
  bmpInfo.compression = file.readUInt32LE(30);
  bmpInfo.subheadersize = file.readUInt32LE(14)
}

// pixel schemes for colorDepths
setColorScheme = function () {
  if (bmpInfo.colorDepth == 8) rgbScheme = {
    pixelDepth: 1,
    red: [0, 2],
    redMax: 3,
    green: [3, 5],
    greenMax: 7,
    blue: [6, 7],
    BlueMax: 7
  }
  if (bmpInfo.colorDepth == 16) rgbScheme = {
    pixelDepth: 2,
    red: [0, 4, 5],
    redMax: 31,
    green: [5, 10, 6],
    greenMax: 63,
    blue: [11, 15, 5],
    blueMax: 31
  }
  if (bmpInfo.colorDepth == 24) rgbScheme = {
    pixelDepth: 4,
    red:  [0,7,8],
    green:  [8,15,8],
    blue:    [16,23, 8],
    redMax: 255,
    greenMax: 255,
    blueMax: 255,
  }
}

//zero padding
zp = function (n, c) {
  var s = String(n);
  if (s.length < c) {
    return zp("0" + n, c)
  } else {
    return s
  }
};


Pixel = function (dec) {
  this.dec = dec;
  this.binary = zp(dec.toString(2), rgbScheme.pixelDepth * 8)
  this.red = this.getDecColor('red')
  this.green = this.getDecColor('green')
  this.blue = this.getDecColor('blue');
  if (rgbScheme.hasOwnProperty('alpha')) this.alpha = this.getDecColor('alpha')
}


//calculates decimal value from binary based on rgb color depth schemes
Pixel.prototype.getDecColor = function (color) {
  binary = ""
  for (var i = rgbScheme[color][0]; i <= rgbScheme[color][1]; i++) {
    binary = binary + this.binary[i]
  }
  return parseInt(binary, 2);
}

Pixel.prototype.adjustRGB = function (rgb) {
  var red = this.red * rgb[0];
  if (red > rgbScheme.redMax) red = rgbScheme.redMax;
  var green = this.green * rgb[1];
  if (green > rgbScheme.greenMax) green = rgbScheme.greenMax;
  var blue = this.blue * rgb[2];
  if (blue > rgbScheme.blueMax) blue = rgbScheme.blueMax;
  return parseInt(zp(red.toString(2), rgbScheme['red'][2]) + zp(green.toString(2), rgbScheme['green'][2]) + zp(blue.toString(2), rgbScheme['blue'][2]), 2);
};

readBMP = function (filename, callback, callback_options) {
  fs.readFile(filename, function (err, data) {
    if (err) {
      return console.log(err);
    }
    getBMPinfo(data)
    checkBMP(data)
    setColorScheme()
    callback(data, callback_options);
  })
}

RGBTransform = function (file, rgb) {
  var wstream = fs.createWriteStream(output);
  var bytemarker = 0
  for (bytemarker = 0; bytemarker < file.length; bytemarker += rgbScheme.pixelDepth) {
    var data = file.readUIntLE(bytemarker, rgbScheme.pixelDepth);
    if (bytemarker >= bmpInfo.pixelStart) {
      data = new Pixel(data).adjustRGB(rgb)
    }
    var buf = new Buffer(rgbScheme.pixelDepth);
    buf.writeUIntLE(data, 0, rgbScheme.pixelDepth)
    wstream.write(buf);
  }
  wstream.end();
  //console.log(bmpInfo);
  if (cb) {
    cb();
  }
}

//checkArgs();
readBMP(filename, RGBTransform, rgb )
}
