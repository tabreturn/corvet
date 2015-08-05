'use strict';

var libcorvet = function(svg) {
  
  this.svg = svg;
  
  this.countRects = function() {
    var a = document.querySelectorAll(this.svg + ' rect');
    console.log(a.length);
  }
  
  this.countCircles = function() {
    var a = document.querySelectorAll(this.svg + ' circle');
    console.log(a.length);
  }
  
  this.countPaths = function() {
    var a = document.querySelectorAll(this.svg + ' path');
    console.log(a.length);
  }
  
}
