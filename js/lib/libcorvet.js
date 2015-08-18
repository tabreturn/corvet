'use strict';

var libcorvet = function(selector) {
  
  var svg = selector;
  this.circles = [];
  this.ellipses = [];
  this.paths = [];
  this.rects = [];
  
  // extract shapes and attributes
  
  this.countShapes = function(shape) {
    return document.querySelectorAll(svg + ' ' + shape).length;
  }
  
  this.setShapeAttributes = function(total, type, array) {
    for (var i=0; i<total; i++) {
      var shape = this.getShapeAttributes(document.querySelectorAll(svg + ' ' +type)[i], type);
      array.push(shape);
    }
  }
  
  this.getShapes = function() {
    this.setShapeAttributes(this.countShapes('circle'), 'circle', this.circles);
    this.setShapeAttributes(this.countShapes('ellipse'), 'ellipse', this.ellipses);
    this.setShapeAttributes(this.countShapes('path'), 'path', this.paths);
    this.setShapeAttributes(this.countShapes('rect'), 'rect', this.rects);
  }
  
  this.getShapeAttributes = function(shape, type) {
    var attr = {};
    attr.type = type;
    
    switch (attr.type) {
      case 'circle':
        attr.x            = shape.getAttribute('cx');
        attr.y            = shape.getAttribute('cy');
        attr.r            = shape.getAttribute('r');
        attr.area         = attr.r*attr.r * Math.PI;
        break;
      case 'ellipse':
        attr.x            = shape.getAttribute('cx');
        attr.y            = shape.getAttribute('cy');
        attr.rx           = shape.getAttribute('rx');
        attr.ry           = shape.getAttribute('ry');
        attr.area         = attr.rx*attr.ry * Math.PI;
        break;
      case 'path':
        attr.d            = shape.getAttribute('d');
        break;
      case 'rect':
        attr.width        = shape.getAttribute('width');
        attr.height       = shape.getAttribute('height');
        attr.x            = shape.getAttribute('x');
        attr.y            = shape.getAttribute('y');
        attr.area         = attr.width * attr.height;
        break;
    }
    attr.fill             = shape.style.fill;
    attr.fillopacity      = shape.style.fillOpacity;
    attr.stroke           = shape.style.stroke;
    attr.strokeopacity    = shape.style.strokeOpacity;
    attr.strokewidth      = shape.style.strokeWidth;
    attr.strokelinecap    = shape.style.strokeLinecap;
    attr.strokelinejoin   = shape.style.strokeLinejoin;
    attr.strokemiterlimit = shape.style.strokeMiterlimit;
    attr.strokedasharray  = shape.style.strokeDasharray;
    attr.transform        = shape.getAttribute('transform');
    
    return attr;
  }
  
  // comparison helper functions
  
  this.rgbToArray = function(rgb) {
    var pattern = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/;
    rgb = pattern.exec(rgb);
    if (rgb) {
      rgb.shift();
      rgb = rgb.map(Number);
      return rgb;
    }
  }
  
  this.findAngle = function(ax, ay, bx, by) {
    var cy = by - ay;
    var cx = bx - ax;
    var theta = Math.atan2(cy, cx);
    theta *= 180/Math.PI;
    return theta;
  }
  
  this.findCorners = function(corners, tolerance) {
    // find corners and ignore angles under a given obstuse angle
  }
  
  this.compareDistance = function(x1, x2, y1, y2) {
    return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
  }
  
  this.compareNumber = function(i1, i2) {
    return Math.abs(i1 - i2);
  }
  
  this.compareProportional = function(i1, i2) {
    i1 = Math.abs(i1);
    i2 = Math.abs(i2);
    
    if (i1 < i2) {
      return i1 / i2;
    }
    else if (i2 < i1) {
      return i2 / i1;
    }
    else {
      return 1
    }
  }
  
  // comparison functions
  
  this.compareColor = function(color1, color2) {
    color1 = this.rgbToArray(color1);
    color2 = this.rgbToArray(color2);
    
    if (color1 != undefined && color2 != undefined) {
      return DeltaE.getDeltaE00(
        {L: color1[0], A: color1[1], B: color1[2]},
        {L: color2[0], A: color2[1], B: color2[2]}
      );
    }
  }
  
  this.compareShape = function(shape1, shape2) {
    return {
      position         : this.compareDistance(shape1.x, shape2.x, shape1.y, shape2.y),
      area             : this.compareProportional(shape1.area, shape2.area),
      fill             : this.compareColor(shape1.fill, shape2.fill),
      fillopacity      : this.compareNumber(shape1.fillopacity, shape2.fillopacity),
      stroke           : this.compareColor(shape1.stroke, shape2.stroke),
      strokeopacity    : this.compareNumber(shape1.strokeopacity, shape2.strokeopacity),
      strokewidth      : this.compareProportional(shape1.strokewidth, shape2.strokewidth),
      strokelinecap    : shape1.strokelinecap==shape2.strokelinecap,
      strokelinejoin   : shape1.strokelinejoin==shape2.strokelinejoin,
      strokemiterlimit : this.compareProportional(shape1.strokemiterlimit, shape2.strokemiterlimit)
      //strokedasharray  : shape.style.strokeDasharray,
      //transform        : shape.getAttribute('transform')
    }
  }
  
  this.comparePath = function(p1, p2) {
    
  }
  
}
