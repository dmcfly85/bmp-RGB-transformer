# bmp-RGB-transformer

Rewrite .bmp file with adjusted RGB values (supports type 'BM' and color depths of 8, 16 or 24 bits)

Usage: `node index.js input.bmp [red multiplier] [green multiplier] [blue multiplier] output.bmp`

Example: `node index.js input.bmp 1 1 1 output.bmp`

Use to multiplers to increase or decrese presence of given color.  

`node index.js input.bmp 255 0 0 output.bmp` Would remove all green and blue from image and set all red to max value
