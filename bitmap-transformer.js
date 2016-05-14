const fs = require('fs');
filename = __dirname + "/" +process.argv[2];
r_delta = process.argv[3];
g_delta = process.argv[4];
b_delta = process.argv[5];
//filename = __dirname + '/reindeer.jpg.bmp'
//filename = __dirname + '/dude.bmp'



const file = fs.readFileSync(filename);
const headers = {};
const image= {};

headers.type = file.toString('ascii', 0, 2);
headers.size = file.readUInt32LE(2)
headers.pixelStart = file.readUInt32LE(10);

if (headers.type == "BM") {
  image.width = file.readUInt32LE(18);
  image.height = file.readUInt32LE(22);
  image.colorDepth = file.readUInt16LE(28);
  image.compression = file.readUInt32LE(30);
}



reader = function(byte, file) {
  if (image.colorDepth == 16) return file.readUInt16LE(byte)
  if (image.colorDepth == 32) return file.readUInt32LE(byte)
}

// checkCompatibility = fucntion{}
// reader = readerType(image.colorDepth);
// //console.log(reader);

zp = function(n,c) {
    var s = String(n);
    if (s.length< c) { return zp("0" + n,c) }
    else { return s } };

getRGB = function(bytes) {
  binary = zp(bytes.toString(2), 16);
  ba = binary.split("");
  red = parseInt(ba[0].concat(ba[1],ba[2],ba[3],ba[4]), 2);
  green = parseInt(ba[5].concat(ba[6],ba[7],ba[8],ba[9]), 2);
  blue = parseInt(ba[10].concat(ba[11],ba[12],ba[13],ba[14]),2) //,ba[15]),2);
  return [red, green, blue];
}

mashRGBtoDec = function(rgb) {
  red = zp(rgb[0].toString(2), 5)
  green = zp(rgb[1].toString(2), 5)
  blue = zp(rgb[2].toString(2), 5)
  binary = red + green + blue
  return parseInt(binary, 2)
}

adjustColor= function (original, factor) {
  value = original * factor
  if (value > 31) {
    value = 31
  }
  return Math.round(value)
}


transform = function(r,g,b){
var wstream = fs.createWriteStream('myOutput.bmp');
var bytemarker = 0

for (;bytemarker < file.length;) {
 data = reader(bytemarker, file)
//     if (bytemarker >= headers.pixelStart) {
//     rgb = getRGB(data)
//     newrgb = [adjustColor(rgb[0],r), adjustColor(rgb[1],g), adjustColor(rgb[2],b)]
//     data = mashRGBtoDec(newrgb)
//     }

 bytemarker = bytemarker + 2

  var buf = new Buffer(2);
  //console.log(data);
  buf.writeUInt16LE(data, 0);

  wstream.write(buf);
}
wstream.end();
}

transform(1,1,1)

console.log(headers, image);
