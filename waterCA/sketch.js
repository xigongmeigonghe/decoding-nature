//theory: http://neilwallis.com/projects/java/water/index.php
//practice: http://jsfiddle.net/esteewhy/5Ht3b/6/

var img,
  centerX,
  centerY,
  mSize,
  delay = 30,
  oldind,
  newind,
  riprad = 3,
  ripplemap = [],
  ripple,
  tex;

function preload() {
  img = loadImage("moon.jpg");
}

function setup() {
  // Sets the pixel scaling for high pixel density displays.
  // By default pixel density is set to match display density, call pixelDensity(1) to turn this off.
  // Calling pixelDensity() with no arguments returns the current pixel density of the sketch.
  pixelDensity(1);
  createCanvas(800, 600);
  image(img, 0, 0);

  //left shift by 1 divides by half
  centerX = width >> 1;
  centerY = height >> 1;

  //flip flop data each frame
  //one array holds both old and new information
  //with different indices to reach the two different arrays in one
  mSize = width * (height + 2) * 2;
  oldind = width;
  newind = width * (height + 3);

  //get the canvas pixel data
  tex = this.drawingContext.getImageData(0, 0, width, height);
  ripple = this.drawingContext.getImageData(0, 0, width, height);

  //set everything to start out at 0
  //ripplemap hold the heights of the waves at each pixel location
  for (var i = 0; i < mSize; i++) {
    ripplemap[i] = 0;
  }
}

function draw() {
  newframe();
  this.drawingContext.putImageData(ripple, 0, 0);
  disturb(random(centerX*2), random(centerY*2))
}

function mouseMoved() {
  disturb(mouseX, mouseY);
}

/**
 * Disturb water at specified point
 */
function disturb(dx, dy) {
  //left shift just makes it an int
  dx <<= 0;
  dy <<= 0;
  //within the ripple radius, adjust wave height += 128
  for (var j = dy - riprad; j < dy + riprad; j++) {
    for (var k = dx - riprad; k < dx + riprad; k++) {
      ripplemap[oldind + (j * width) + k] += 128;
    }
  }
}

/**
 * Generates new ripples
 */
function newframe() {
  var a, b, data, cur_pixel, new_pixel, old_data;
  //flipflop
  var t = oldind;//oldind into temporary variable
  oldind = newind;//newind into oldind
  newind = t;//temporary into newind
  // we will write into newind
  // but will still base our calculations on the two prvious frames
  // newind holds two frames ago
  // oldind holds prev frame

  var i = 0;

  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      //start from our newind, but don't change that actual index
      var _newind = newind + i,//two frames ago
        mapind = oldind + i;//prev frame
      // 1 2 3 mapind - width gets spot above
      // 4 5 6
      // 7 8 9
      data = ( //get the 4 directions, add together, and divide by 2
        ripplemap[mapind - width] +
        ripplemap[mapind + width] +
        ripplemap[mapind - 1] +
        ripplemap[mapind + 1]) >> 1;
      //get the velocity of the wave using verlet integration: vel = pos - prevPos
      //says newind, but remember, we flip floped above so data is prevfrmae and _newind is 2 frames ago
      data -= ripplemap[_newind];
      //damping, same as saying *=.97 (100>>5=3, 100-3=97)
      data -= data >> 5;
      //now set the new ripplemap information
      ripplemap[_newind] = data;

      //where data=0 then still, where data>0 then wave
      //for whatever reason data seems to be mostly in the range of 1024
      data = 1024 - data;

      //offsets
      //will refract the original image, move pixels scaled by
      //distance from center scaled, then add distance from center
      a = (((x - centerX) * data / 1024) << 0) + centerX;
      b = (((y - centerY) * data / 1024) << 0) + centerY;

      //bounds check
      if (a >= width) a = width - 1;
      if (a < 0) a = 0;
      if (b >= height) b = height - 1;
      if (b < 0) b = 0;

      //x+y*width get the location of the pixel we want to move in order to refract
      new_pixel = (a + (b * width)) * 4;
      //i*4 becasue rgba
      cur_pixel = i * 4;
      //get the newpixel  in our original texture
      //set the the current pixel of what we'll draw to that pixel
      ripple.data[cur_pixel] = tex.data[new_pixel];
      ripple.data[cur_pixel + 1] = tex.data[new_pixel + 1];
      ripple.data[cur_pixel + 2] = tex.data[new_pixel + 2];

      ++i;
    }
  }
}
