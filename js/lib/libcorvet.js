'use strict';

var libcorvet = function(svg) {
  
  this.svg = svg;
  
  
  // extract shapes and attributes
  
  this.rects = [];
  this.circles = [];
  this.paths = [];
  
  this.countRects = function() {
    return(document.querySelectorAll(this.svg + ' rect').length);
  }

  this.countCircles = function() {
    return(document.querySelectorAll(this.svg + ' circle').length);
  }
  
  this.countPaths = function() {
    return(document.querySelectorAll(this.svg + ' path').length);
  }
  
  this.shapeArray = function(total, shape, array) {
    for(var i=0; i<total; i++) {
      var add = this.shapeAttributes(document.querySelectorAll(this.svg + ' ' +shape)[i]);
      array[i] = add;
    }
  }
  
  this.getShapes = function() {
    this.shapeArray(this.countRects(), 'rect', this.rects);
    this.shapeArray(this.countCircles(), 'circle', this.circles);
    this.shapeArray(this.countPaths(), 'path', this.paths);
  }
  
  this.shapeAttributes = function(shape) {
    var attr = {};
    // rect attributes
    attr.width            = shape.getAttribute('width');
    attr.height           = shape.getAttribute('height');
    attr.x                = shape.getAttribute('x');
    attr.y                = shape.getAttribute('y');
    // circle attributes
    attr.cx               = shape.getAttribute('cx');
    attr.cy               = shape.getAttribute('cy');
    attr.r                = shape.getAttribute('r');
    // path attributes
    attr.d                = shape.getAttribute('d');
    // generic attributes
    attr.transform        = shape.getAttribute('transform');
    attr.fill             = shape.style.fill;
    attr.fillopacity      = shape.style.fillOpacity;
    attr.stroke           = shape.style.stroke;
    attr.strokeopacity    = shape.style.strokeOpacity;
    attr.strokewidth      = shape.style.strokeWidth;
    attr.strokelinecap    = shape.style.strokeLinecap;
    attr.strokelinejoin   = shape.style.strokeLinejoin;
    attr.strokemiterlimit = shape.style.strokeMiterlimit;
    attr.strokedasharray  = shape.style.strokeDasharray;
    return attr;
  }
  
  
  // comparison functions
  
  this.rgbToArray = function(rgb) {
    var pattern = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/;
    rgb = pattern.exec(rgb);
    rgb.shift();
    rgb = rgb.map(Number);
    return rgb;
  }
  
  this.compareColor = function(color1, color2) {
    color1 = this.rgbToArray(color1);
    color2 = this.rgbToArray(color2);
    
    var result = DeltaE.getDeltaE00(
      {L: color1[0], A: color1[1], B: color1[2]},
      {L: color2[0], A: color2[1], B: color2[2]}
    );
    return result;
  }
  
  this.comparePosition = function(x1, y1, x2, y2) {
    return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
  }
  
  this.compareSize = function(a1, a2) {
    return Math.abs((a1 - a2));
  }
  
}
