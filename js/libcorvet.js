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
  
  
}
