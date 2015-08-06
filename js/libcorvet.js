'use strict';

var libcorvet = function(svg) {
  
  this.svg = svg;
  
  this.countRects = function() {
    return(document.querySelectorAll(this.svg + ' rect').length);
  }
  
  this.countCircles = function() {
    return(document.querySelectorAll(this.svg + ' circle').length);
  }
  
  this.countPaths = function() {
    return(document.querySelectorAll(this.svg + ' path').length);
  }
  
}
