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
        attr.cx               = shape.getAttribute('cx');
        attr.cy               = shape.getAttribute('cy');
        attr.r                = shape.getAttribute('r');
        attr.area             = attr.r*attr.r * Math.PI;
        break;
      case 'ellipse':
        attr.cx               = shape.getAttribute('cx');
        attr.cy               = shape.getAttribute('cy');
        attr.rx               = shape.getAttribute('rx');
        attr.ry               = shape.getAttribute('ry');
        attr.area             = attr.rx*attr.ry * Math.PI;
        break;
      case 'path':
        attr.d                = shape.getAttribute('d');
        break;
      case 'rect':
        attr.width            = shape.getAttribute('width');
        attr.height           = shape.getAttribute('height');
        attr.x                = shape.getAttribute('x');
        attr.y                = shape.getAttribute('y');
        attr.area             = attr.width * attr.height;
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
    rgb.shift();
    rgb = rgb.map(Number);
    return rgb;
  }
  
  this.compareDistance = function(x1, y1, x2, y2) {
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
    
    return DeltaE.getDeltaE00(
      {L: color1[0], A: color1[1], B: color1[2]},
      {L: color2[0], A: color2[1], B: color2[2]}
    );
  }
  
  this.compareCircle = function(c1, c2) {
    
  }
  
  this.compareEllipse = function(e1, e2) {
    
  }
  
  this.comparePath = function(p1, p2) {
    
  }
  
  this.compareRect = function(r1, r2) {
    return {
      position: this.compareDistance(r1.x, r2.x, r2.y, r2.y),
      area: this.compareProportional(r1.area, r2.area)
    }
  }
  
}
