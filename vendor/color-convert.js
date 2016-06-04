// COLOR_CONVERT v0.5.3
// STRIPPED REQUIRE FEATURE AND CONVERTED TO SINGLE FILE

/*
Copyright (c) 2011 Heather Arthur <fayearthur@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var colorcovert;
window.colorcovert = colorcovert;

/* MIT license */
(function() {

  // FORMER CONVERSIONS.JS CODE:
  
  var conversions = {
    rgb2hsl: rgb2hsl,
    rgb2hsv: rgb2hsv,
    rgb2hwb: rgb2hwb,
    rgb2cmyk: rgb2cmyk,
    rgb2keyword: rgb2keyword,
    rgb2xyz: rgb2xyz,
    rgb2lab: rgb2lab,
    rgb2lch: rgb2lch,
    rgb2ansi16: rgb2ansi16,
    rgb2ansi: rgb2ansi,
  
    hsl2rgb: hsl2rgb,
    hsl2hsv: hsl2hsv,
    hsl2hwb: hsl2hwb,
    hsl2cmyk: hsl2cmyk,
    hsl2keyword: hsl2keyword,
    hsl2ansi16: hsl2ansi16,
    hsl2ansi: hsl2ansi,
  
    hsv2rgb: hsv2rgb,
    hsv2hsl: hsv2hsl,
    hsv2hwb: hsv2hwb,
    hsv2cmyk: hsv2cmyk,
    hsv2keyword: hsv2keyword,
    hsv2ansi16: hsv2ansi16,
    hsv2ansi: hsv2ansi,
  
    hwb2rgb: hwb2rgb,
    hwb2hsl: hwb2hsl,
    hwb2hsv: hwb2hsv,
    hwb2cmyk: hwb2cmyk,
    hwb2keyword: hwb2keyword,
    hwb2ansi16: hwb2ansi16,
    hwb2ansi: hwb2ansi,
  
    cmyk2rgb: cmyk2rgb,
    cmyk2hsl: cmyk2hsl,
    cmyk2hsv: cmyk2hsv,
    cmyk2hwb: cmyk2hwb,
    cmyk2keyword: cmyk2keyword,
    cmyk2ansi16: cmyk2ansi16,
    cmyk2ansi: cmyk2ansi,
  
    keyword2rgb: keyword2rgb,
    keyword2hsl: keyword2hsl,
    keyword2hsv: keyword2hsv,
    keyword2hwb: keyword2hwb,
    keyword2cmyk: keyword2cmyk,
    keyword2lab: keyword2lab,
    keyword2xyz: keyword2xyz,
    keyword2ansi16: keyword2ansi16,
    keyword2ansi: keyword2ansi,
  
    xyz2rgb: xyz2rgb,
    xyz2lab: xyz2lab,
    xyz2lch: xyz2lch,
  
    lab2xyz: lab2xyz,
    lab2rgb: lab2rgb,
    lab2lch: lab2lch,
  
    lch2lab: lch2lab,
    lch2xyz: lch2xyz,
    lch2rgb: lch2rgb,
  
    ansi162rgb: ansi162rgb,
    ansi162hsl: ansi162hsl,
    ansi162hsv: ansi162hsv,
    ansi162hwb: ansi162hwb,
    ansi162cmyk: ansi162cmyk,
    ansi162keyword: ansi162keyword,
  
    ansi2rgb: ansi2rgb,
    ansi2hsl: ansi2hsl,
    ansi2hsv: ansi2hsv,
    ansi2hwb: ansi2hwb,
    ansi2cmyk: ansi2cmyk,
    ansi2keyword: ansi2keyword,
  }
  
  function rgb2hsl(rgb) {
    var r = rgb[0]/255,
        g = rgb[1]/255,
        b = rgb[2]/255,
        min = Math.min(r, g, b),
        max = Math.max(r, g, b),
        delta = max - min,
        h, s, l;
  
    if (max == min)
      h = 0;
    else if (r == max)
      h = (g - b) / delta;
    else if (g == max)
      h = 2 + (b - r) / delta;
    else if (b == max)
      h = 4 + (r - g)/ delta;
  
    h = Math.min(h * 60, 360);
  
    if (h < 0)
      h += 360;
  
    l = (min + max) / 2;
  
    if (max == min)
      s = 0;
    else if (l <= 0.5)
      s = delta / (max + min);
    else
      s = delta / (2 - max - min);
  
    return [h, s * 100, l * 100];
  }
  
  function rgb2hsv(rgb) {
    var r = rgb[0],
        g = rgb[1],
        b = rgb[2],
        min = Math.min(r, g, b),
        max = Math.max(r, g, b),
        delta = max - min,
        h, s, v;
  
    if (max == 0)
      s = 0;
    else
      s = (delta/max * 1000)/10;
  
    if (max == min)
      h = 0;
    else if (r == max)
      h = (g - b) / delta;
    else if (g == max)
      h = 2 + (b - r) / delta;
    else if (b == max)
      h = 4 + (r - g) / delta;
  
    h = Math.min(h * 60, 360);
  
    if (h < 0)
      h += 360;
  
    v = ((max / 255) * 1000) / 10;
  
    return [h, s, v];
  }
  
  function rgb2hwb(rgb) {
    var r = rgb[0],
        g = rgb[1],
        b = rgb[2],
        h = rgb2hsl(rgb)[0],
        w = 1/255 * Math.min(r, Math.min(g, b)),
        b = 1 - 1/255 * Math.max(r, Math.max(g, b));
  
    return [h, w * 100, b * 100];
  }
  
  function rgb2cmyk(rgb) {
    var r = rgb[0] / 255,
        g = rgb[1] / 255,
        b = rgb[2] / 255,
        c, m, y, k;
  
    k = Math.min(1 - r, 1 - g, 1 - b);
    c = (1 - r - k) / (1 - k) || 0;
    m = (1 - g - k) / (1 - k) || 0;
    y = (1 - b - k) / (1 - k) || 0;
    return [c * 100, m * 100, y * 100, k * 100];
  }
  
  function rgb2keyword(rgb) {
    return reverseKeywords[JSON.stringify(rgb)];
  }
  
  function rgb2xyz(rgb) {
    var r = rgb[0] / 255,
        g = rgb[1] / 255,
        b = rgb[2] / 255;
  
    // assume sRGB
    r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
    g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
    b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);
  
    var x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
    var y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
    var z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);
  
    return [x * 100, y *100, z * 100];
  }
  
  function rgb2lab(rgb) {
    var xyz = rgb2xyz(rgb),
          x = xyz[0],
          y = xyz[1],
          z = xyz[2],
          l, a, b;
  
    x /= 95.047;
    y /= 100;
    z /= 108.883;
  
    x = x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x) + (16 / 116);
    y = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y) + (16 / 116);
    z = z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z) + (16 / 116);
  
    l = (116 * y) - 16;
    a = 500 * (x - y);
    b = 200 * (y - z);
  
    return [l, a, b];
  }
  
  function rgb2lch(args) {
    return lab2lch(rgb2lab(args));
  }
  
  function hsl2rgb(hsl) {
    var h = hsl[0] / 360,
        s = hsl[1] / 100,
        l = hsl[2] / 100,
        t1, t2, t3, rgb, val;
  
    if (s == 0) {
      val = l * 255;
      return [val, val, val];
    }
  
    if (l < 0.5)
      t2 = l * (1 + s);
    else
      t2 = l + s - l * s;
    t1 = 2 * l - t2;
  
    rgb = [0, 0, 0];
    for (var i = 0; i < 3; i++) {
      t3 = h + 1 / 3 * - (i - 1);
      t3 < 0 && t3++;
      t3 > 1 && t3--;
  
      if (6 * t3 < 1)
        val = t1 + (t2 - t1) * 6 * t3;
      else if (2 * t3 < 1)
        val = t2;
      else if (3 * t3 < 2)
        val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
      else
        val = t1;
  
      rgb[i] = val * 255;
    }
  
    return rgb;
  }
  
  function hsl2hsv(hsl) {
    var h = hsl[0],
        s = hsl[1] / 100,
        l = hsl[2] / 100,
        sv, v;
  
    if (l === 0) {
        // no need to do calc on black
        // also avoids divide by 0 error
        return [0, 0, 0];
    }
  
    l *= 2;
    s *= (l <= 1) ? l : 2 - l;
    v = (l + s) / 2;
    sv = (2 * s) / (l + s);
    return [h, sv * 100, v * 100];
  }
  
  function hsl2hwb(args) {
    return rgb2hwb(hsl2rgb(args));
  }
  
  function hsl2cmyk(args) {
    return rgb2cmyk(hsl2rgb(args));
  }
  
  function hsl2keyword(args) {
    return rgb2keyword(hsl2rgb(args));
  }
  
  
  function hsv2rgb(hsv) {
    var h = hsv[0] / 60,
        s = hsv[1] / 100,
        v = hsv[2] / 100,
        hi = Math.floor(h) % 6;
  
    var f = h - Math.floor(h),
        p = 255 * v * (1 - s),
        q = 255 * v * (1 - (s * f)),
        t = 255 * v * (1 - (s * (1 - f))),
        v = 255 * v;
  
    switch (hi) {
      case 0:
        return [v, t, p];
      case 1:
        return [q, v, p];
      case 2:
        return [p, v, t];
      case 3:
        return [p, q, v];
      case 4:
        return [t, p, v];
      case 5:
        return [v, p, q];
    }
  }
  
  function hsv2hsl(hsv) {
    var h = hsv[0],
        s = hsv[1] / 100,
        v = hsv[2] / 100,
        sl, l;
  
    l = (2 - s) * v;
    sl = s * v;
    sl /= (l <= 1) ? l : 2 - l;
    sl = sl || 0;
    l /= 2;
    return [h, sl * 100, l * 100];
  }
  
  function hsv2hwb(args) {
    return rgb2hwb(hsv2rgb(args))
  }
  
  function hsv2cmyk(args) {
    return rgb2cmyk(hsv2rgb(args));
  }
  
  function hsv2keyword(args) {
    return rgb2keyword(hsv2rgb(args));
  }
  
  // http://dev.w3.org/csswg/css-color/#hwb-to-rgb
  function hwb2rgb(hwb) {
    var h = hwb[0] / 360,
        wh = hwb[1] / 100,
        bl = hwb[2] / 100,
        ratio = wh + bl,
        i, v, f, n;
  
    // wh + bl cant be > 1
    if (ratio > 1) {
      wh /= ratio;
      bl /= ratio;
    }
  
    i = Math.floor(6 * h);
    v = 1 - bl;
    f = 6 * h - i;
    if ((i & 0x01) != 0) {
      f = 1 - f;
    }
    n = wh + f * (v - wh);  // linear interpolation
  
    switch (i) {
      default:
      case 6:
      case 0: r = v; g = n; b = wh; break;
      case 1: r = n; g = v; b = wh; break;
      case 2: r = wh; g = v; b = n; break;
      case 3: r = wh; g = n; b = v; break;
      case 4: r = n; g = wh; b = v; break;
      case 5: r = v; g = wh; b = n; break;
    }
  
    return [r * 255, g * 255, b * 255];
  }
  
  function hwb2hsl(args) {
    return rgb2hsl(hwb2rgb(args));
  }
  
  function hwb2hsv(args) {
    return rgb2hsv(hwb2rgb(args));
  }
  
  function hwb2cmyk(args) {
    return rgb2cmyk(hwb2rgb(args));
  }
  
  function hwb2keyword(args) {
    return rgb2keyword(hwb2rgb(args));
  }
  
  function cmyk2rgb(cmyk) {
    var c = cmyk[0] / 100,
        m = cmyk[1] / 100,
        y = cmyk[2] / 100,
        k = cmyk[3] / 100,
        r, g, b;
  
    r = 1 - Math.min(1, c * (1 - k) + k);
    g = 1 - Math.min(1, m * (1 - k) + k);
    b = 1 - Math.min(1, y * (1 - k) + k);
    return [r * 255, g * 255, b * 255];
  }
  
  function cmyk2hsl(args) {
    return rgb2hsl(cmyk2rgb(args));
  }
  
  function cmyk2hsv(args) {
    return rgb2hsv(cmyk2rgb(args));
  }
  
  function cmyk2hwb(args) {
    return rgb2hwb(cmyk2rgb(args));
  }
  
  function cmyk2keyword(args) {
    return rgb2keyword(cmyk2rgb(args));
  }
  
  
  function xyz2rgb(xyz) {
    var x = xyz[0] / 100,
        y = xyz[1] / 100,
        z = xyz[2] / 100,
        r, g, b;
  
    r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
    g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
    b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);
  
    // assume sRGB
    r = r > 0.0031308 ? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055)
      : r = (r * 12.92);
  
    g = g > 0.0031308 ? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055)
      : g = (g * 12.92);
  
    b = b > 0.0031308 ? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055)
      : b = (b * 12.92);
  
    r = Math.min(Math.max(0, r), 1);
    g = Math.min(Math.max(0, g), 1);
    b = Math.min(Math.max(0, b), 1);
  
    return [r * 255, g * 255, b * 255];
  }
  
  function xyz2lab(xyz) {
    var x = xyz[0],
        y = xyz[1],
        z = xyz[2],
        l, a, b;
  
    x /= 95.047;
    y /= 100;
    z /= 108.883;
  
    x = x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x) + (16 / 116);
    y = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y) + (16 / 116);
    z = z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z) + (16 / 116);
  
    l = (116 * y) - 16;
    a = 500 * (x - y);
    b = 200 * (y - z);
  
    return [l, a, b];
  }
  
  function xyz2lch(args) {
    return lab2lch(xyz2lab(args));
  }
  
  function lab2xyz(lab) {
    var l = lab[0],
        a = lab[1],
        b = lab[2],
        x, y, z, y2;
  
    if (l <= 8) {
      y = (l * 100) / 903.3;
      y2 = (7.787 * (y / 100)) + (16 / 116);
    } else {
      y = 100 * Math.pow((l + 16) / 116, 3);
      y2 = Math.pow(y / 100, 1/3);
    }
  
    x = x / 95.047 <= 0.008856 ? x = (95.047 * ((a / 500) + y2 - (16 / 116))) / 7.787 : 95.047 * Math.pow((a / 500) + y2, 3);
  
    z = z / 108.883 <= 0.008859 ? z = (108.883 * (y2 - (b / 200) - (16 / 116))) / 7.787 : 108.883 * Math.pow(y2 - (b / 200), 3);
  
    return [x, y, z];
  }
  
  function lab2lch(lab) {
    var l = lab[0],
        a = lab[1],
        b = lab[2],
        hr, h, c;
  
    hr = Math.atan2(b, a);
    h = hr * 360 / 2 / Math.PI;
    if (h < 0) {
      h += 360;
    }
    c = Math.sqrt(a * a + b * b);
    return [l, c, h];
  }
  
  function lab2rgb(args) {
    return xyz2rgb(lab2xyz(args));
  }
  
  function lch2lab(lch) {
    var l = lch[0],
        c = lch[1],
        h = lch[2],
        a, b, hr;
  
    hr = h / 360 * 2 * Math.PI;
    a = c * Math.cos(hr);
    b = c * Math.sin(hr);
    return [l, a, b];
  }
  
  function lch2xyz(args) {
    return lab2xyz(lch2lab(args));
  }
  
  function lch2rgb(args) {
    return lab2rgb(lch2lab(args));
  }
  
  function keyword2rgb(keyword) {
    return cssKeywords[keyword];
  }
  
  function keyword2hsl(args) {
    return rgb2hsl(keyword2rgb(args));
  }
  
  function keyword2hsv(args) {
    return rgb2hsv(keyword2rgb(args));
  }
  
  function keyword2hwb(args) {
    return rgb2hwb(keyword2rgb(args));
  }
  
  function keyword2cmyk(args) {
    return rgb2cmyk(keyword2rgb(args));
  }
  
  function keyword2lab(args) {
    return rgb2lab(keyword2rgb(args));
  }
  
  function keyword2xyz(args) {
    return rgb2xyz(keyword2rgb(args));
  }
  
  function rgb2ansi16(args) {
    var r = args[0],
        g = args[1],
        b = args[2],
        value = arguments[1] || rgb2hsv(args)[2]; // hsv2ansi16 optimization
  
    value = Math.round(value / 50);
    if (value === 0)
      return 30;
  
    var ansi = 30 +
      ((Math.round(b / 255) << 2) |
      (Math.round(g / 255) << 1) |
      Math.round(r / 255));
  
    if (value === 2)
      ansi += 60;
  
    return ansi;
  }
  
  function rgb2ansi(args) {
    var r = args[0],
        g = args[1],
        b = args[2];
  
    // we use the extended greyscale palette here, with the exception of
    // black and white. normal palette only has 4 greyscale shades.
    if (r === g && g === b) {
      if (r < 8)
        return 16;
      if (r > 248)
        return 231;
      return Math.round(((r - 8) / 247) * 24) + 232;
    }
  
    var ansi = 16 +
      (36 * Math.round(r / 255 * 5)) +
      (6 * Math.round(g / 255 * 5)) +
      Math.round(b / 255 * 5);
  
    return ansi;
  }
  
  function hsl2ansi16(args) {
    return rgb2ansi16(hsl2rgb(args));
  }
  
  function hsl2ansi(args) {
    return rgb2ansi(hsl2rgb(args));
  }
  
  function hsv2ansi16(args) {
    return rgb2ansi16(hsv2rgb(args), args[2]);
  }
  
  function hsv2ansi(args) {
    return rgb2ansi(hsv2rgb(args));
  }
  
  function hwb2ansi16(args) {
    return rgb2ansi16(hwb2rgb(args));
  }
  
  function hwb2ansi(args) {
    return rgb2ansi(hwb2rgb(args));
  }
  
  function cmyk2ansi16(args) {
    return rgb2ansi16(cmyk2rgb(args));
  }
  
  function cmyk2ansi(args) {
    return rgb2ansi(cmyk2rgb(args));
  }
  
  function keyword2ansi16(args) {
    return rgb2ansi16(keyword2rgb(args));
  }
  
  function keyword2ansi(args) {
    return rgb2ansi(keyword2rgb(args));
  }
  
  function ansi162rgb(args) {
    var color = args % 10;
  
    // handle greyscale
    if (color === 0 || color === 7) {
      if (args > 50)
        color += 3.5;
      color = color / 10.5 * 255;
      return [color, color, color];
    }
  
    var mult = (~~(args > 50) + 1) * 0.5,
        r = ((color & 1) * mult) * 255,
        g = (((color >> 1) & 1) * mult) * 255,
        b = (((color >> 2) & 1) * mult) * 255;
  
    return [r, g, b];
  }
  
  function ansi162hsl(args) {
    return rgb2hsl(ansi162rgb(args));
  }
  
  function ansi162hsv(args) {
    return rgb2hsv(ansi162rgb(args));
  }
  
  function ansi162hwb(args) {
    return rgb2hwb(ansi162rgb(args));
  }
  
  function ansi162cmyk(args) {
    return rgb2cmyk(ansi162rgb(args));
  }
  
  function ansi162keyword(args) {
    return rgb2keyword(ansi162rgb(args));
  }
  
  function ansi2rgb(args) {
    // handle greyscale
    if (args >= 232) {
      var c = (args - 232) * 10 + 8;
      return [c, c, c];
    }
  
    args -= 16;
  
    var rem,
        r = Math.floor(args / 36) / 5 * 255,
        g = Math.floor((rem = args % 36) / 6) / 5 * 255,
        b = (rem % 6) / 5 * 255;
  
    return [r, g, b];
  }
  
  function ansi2hsl(args) {
    return rgb2hsl(ansi2rgb(args));
  }
  
  function ansi2hsv(args) {
    return rgb2hsv(ansi2rgb(args));
  }
  
  function ansi2hwb(args) {
    return rgb2hwb(ansi2rgb(args));
  }
  
  function ansi2cmyk(args) {
    return rgb2cmyk(ansi2rgb(args));
  }
  
  function ansi2keyword(args) {
    return rgb2keyword(ansi2rgb(args));
  }
  
  var cssKeywords = {
    aliceblue:  [240,248,255],
    antiquewhite: [250,235,215],
    aqua: [0,255,255],
    aquamarine: [127,255,212],
    azure:  [240,255,255],
    beige:  [245,245,220],
    bisque: [255,228,196],
    black:  [0,0,0],
    blanchedalmond: [255,235,205],
    blue: [0,0,255],
    blueviolet: [138,43,226],
    brown:  [165,42,42],
    burlywood:  [222,184,135],
    cadetblue:  [95,158,160],
    chartreuse: [127,255,0],
    chocolate:  [210,105,30],
    coral:  [255,127,80],
    cornflowerblue: [100,149,237],
    cornsilk: [255,248,220],
    crimson:  [220,20,60],
    cyan: [0,255,255],
    darkblue: [0,0,139],
    darkcyan: [0,139,139],
    darkgoldenrod:  [184,134,11],
    darkgray: [169,169,169],
    darkgreen:  [0,100,0],
    darkgrey: [169,169,169],
    darkkhaki:  [189,183,107],
    darkmagenta:  [139,0,139],
    darkolivegreen: [85,107,47],
    darkorange: [255,140,0],
    darkorchid: [153,50,204],
    darkred:  [139,0,0],
    darksalmon: [233,150,122],
    darkseagreen: [143,188,143],
    darkslateblue:  [72,61,139],
    darkslategray:  [47,79,79],
    darkslategrey:  [47,79,79],
    darkturquoise:  [0,206,209],
    darkviolet: [148,0,211],
    deeppink: [255,20,147],
    deepskyblue:  [0,191,255],
    dimgray:  [105,105,105],
    dimgrey:  [105,105,105],
    dodgerblue: [30,144,255],
    firebrick:  [178,34,34],
    floralwhite:  [255,250,240],
    forestgreen:  [34,139,34],
    fuchsia:  [255,0,255],
    gainsboro:  [220,220,220],
    ghostwhite: [248,248,255],
    gold: [255,215,0],
    goldenrod:  [218,165,32],
    gray: [128,128,128],
    green:  [0,128,0],
    greenyellow:  [173,255,47],
    grey: [128,128,128],
    honeydew: [240,255,240],
    hotpink:  [255,105,180],
    indianred:  [205,92,92],
    indigo: [75,0,130],
    ivory:  [255,255,240],
    khaki:  [240,230,140],
    lavender: [230,230,250],
    lavenderblush:  [255,240,245],
    lawngreen:  [124,252,0],
    lemonchiffon: [255,250,205],
    lightblue:  [173,216,230],
    lightcoral: [240,128,128],
    lightcyan:  [224,255,255],
    lightgoldenrodyellow: [250,250,210],
    lightgray:  [211,211,211],
    lightgreen: [144,238,144],
    lightgrey:  [211,211,211],
    lightpink:  [255,182,193],
    lightsalmon:  [255,160,122],
    lightseagreen:  [32,178,170],
    lightskyblue: [135,206,250],
    lightslategray: [119,136,153],
    lightslategrey: [119,136,153],
    lightsteelblue: [176,196,222],
    lightyellow:  [255,255,224],
    lime: [0,255,0],
    limegreen:  [50,205,50],
    linen:  [250,240,230],
    magenta:  [255,0,255],
    maroon: [128,0,0],
    mediumaquamarine: [102,205,170],
    mediumblue: [0,0,205],
    mediumorchid: [186,85,211],
    mediumpurple: [147,112,219],
    mediumseagreen: [60,179,113],
    mediumslateblue:  [123,104,238],
    mediumspringgreen:  [0,250,154],
    mediumturquoise:  [72,209,204],
    mediumvioletred:  [199,21,133],
    midnightblue: [25,25,112],
    mintcream:  [245,255,250],
    mistyrose:  [255,228,225],
    moccasin: [255,228,181],
    navajowhite:  [255,222,173],
    navy: [0,0,128],
    oldlace:  [253,245,230],
    olive:  [128,128,0],
    olivedrab:  [107,142,35],
    orange: [255,165,0],
    orangered:  [255,69,0],
    orchid: [218,112,214],
    palegoldenrod:  [238,232,170],
    palegreen:  [152,251,152],
    paleturquoise:  [175,238,238],
    palevioletred:  [219,112,147],
    papayawhip: [255,239,213],
    peachpuff:  [255,218,185],
    peru: [205,133,63],
    pink: [255,192,203],
    plum: [221,160,221],
    powderblue: [176,224,230],
    purple: [128,0,128],
    rebeccapurple: [102, 51, 153],
    red:  [255,0,0],
    rosybrown:  [188,143,143],
    royalblue:  [65,105,225],
    saddlebrown:  [139,69,19],
    salmon: [250,128,114],
    sandybrown: [244,164,96],
    seagreen: [46,139,87],
    seashell: [255,245,238],
    sienna: [160,82,45],
    silver: [192,192,192],
    skyblue:  [135,206,235],
    slateblue:  [106,90,205],
    slategray:  [112,128,144],
    slategrey:  [112,128,144],
    snow: [255,250,250],
    springgreen:  [0,255,127],
    steelblue:  [70,130,180],
    tan:  [210,180,140],
    teal: [0,128,128],
    thistle:  [216,191,216],
    tomato: [255,99,71],
    turquoise:  [64,224,208],
    violet: [238,130,238],
    wheat:  [245,222,179],
    white:  [255,255,255],
    whitesmoke: [245,245,245],
    yellow: [255,255,0],
    yellowgreen:  [154,205,50]
  };
  
  var reverseKeywords = {};
  for (var key in cssKeywords) {
    reverseKeywords[JSON.stringify(cssKeywords[key])] = key;
  }
  
  // FORMER INDEX.JS CODE:
  
  var convert = function() {
     return new Converter();
  }
  
  for (var func in conversions) {
    // export Raw versions
    convert[func + "Raw"] =  (function(func) {
      // accept array or plain args
      return function(arg) {
        if (typeof arg == "number")
          arg = Array.prototype.slice.call(arguments);
        return conversions[func](arg);
      }
    })(func);
  
    var pair = /(\w+)2(\w+)/.exec(func),
        from = pair[1],
        to = pair[2];
  
    // export rgb2hsl and ["rgb"]["hsl"]
    convert[from] = convert[from] || {};
  
    convert[from][to] = convert[func] = (function(func) { 
      return function(arg) {
        if (typeof arg == "number")
          arg = Array.prototype.slice.call(arguments);
        
        var val = conversions[func](arg);
        if (typeof val == "string" || val === undefined)
          return val; // keyword
  
        for (var i = 0; i < val.length; i++)
          val[i] = Math.round(val[i]);
        return val;
      }
    })(func);
  }
  
  
  /* Converter does lazy conversion and caching */
  var Converter = function() {
     this.convs = {};
  };
  
  /* Either get the values for a space or
    set the values for a space, depending on args */
  Converter.prototype.routeSpace = function(space, args) {
     var values = args[0];
     if (values === undefined) {
        // color.rgb()
        return this.getValues(space);
     }
     // color.rgb(10, 10, 10)
     if (typeof values == "number") {
        values = Array.prototype.slice.call(args);
     }
  
     return this.setValues(space, values);
  };
    
  /* Set the values for a space, invalidating cache */
  Converter.prototype.setValues = function(space, values) {
     this.space = space;
     this.convs = {};
     this.convs[space] = values;
     return this;
  };
  
  /* Get the values for a space. If there's already
    a conversion for the space, fetch it, otherwise
    compute it */
  Converter.prototype.getValues = function(space) {
     var vals = this.convs[space];
     if (!vals) {
        var fspace = this.space,
            from = this.convs[fspace];
        vals = convert[fspace][space](from);
  
        this.convs[space] = vals;
     }
    return vals;
  };
  
  ["rgb", "hsl", "hsv", "cmyk", "keyword"].forEach(function(space) {
     Converter.prototype[space] = function(vals) {
        return this.routeSpace(space, arguments);
     }
  });
  
  colorconvert = convert;
  
})();
