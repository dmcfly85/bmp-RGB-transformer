const bmp = require('./bmpRGBtransformer.js')


  filename = __dirname + "/" + process.argv[2];

  if (process.argv[6]) {
    output = __dirname + "/" + process.argv[6]
  } else {
    output = __dirname + "/bmp-trasformed.bmp"
  }

  rgb = [process.argv[3] || 1, process.argv[4] || 1, process.argv[5] || 1]

bmp.bmpRGBtransformer(filename, output, rgb)
