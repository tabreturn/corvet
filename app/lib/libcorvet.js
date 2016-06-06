export default {
  
  Libcorvet: function(selector) {
    
    let svg = selector;
    this.circles = [];
    this.ellipses = [];
    this.paths = [];
    this.polygons = [];
    this.rects = [];
    
    // extract shapes and attributes
    
    this.countShapes = function(shape) {
      return document.querySelectorAll(svg + ' ' + shape).length;
    };
    
    this.setShapeAttributes = function(total, type, array) {
      for (let i=0; i<total; i++) {
        let shape = this.getShapeAttributes(document.querySelectorAll(svg + ' ' +type)[i], type);
        array.push(shape);
      }
    };
    
    this.relativeToAbsolute = function(shapesarray) {
      
      for (let i=0; i<shapesarray.length; i++) {
        if (shapesarray[i].x) {
          shapesarray[i].x = parseFloat(shapesarray[i].x) + parseFloat(shapesarray[i].transform.x);
          shapesarray[i].y = parseFloat(shapesarray[i].y) + parseFloat(shapesarray[i].transform.y);
        }
        
        if (shapesarray[i].points) {
          //code
        }
      }
      
      return shapesarray;
    };
    
    this.getShapes = function() {
      this.setShapeAttributes(this.countShapes('circle'), 'circle', this.circles);
      this.circles = this.relativeToAbsolute(this.circles);
      this.setShapeAttributes(this.countShapes('ellipse'), 'ellipse', this.ellipses);
      this.ellipses = this.relativeToAbsolute(this.ellipses);
      this.setShapeAttributes(this.countShapes('rect'), 'rect', this.rects);
      this.rects = this.relativeToAbsolute(this.rects);
      
      this.setShapeAttributes(this.countShapes('path'), 'path', this.paths);
      this.setShapeAttributes(this.countShapes('polygon'), 'polygon', this.polygons);
      this.polygons = this.pathsToPolygons(this.paths, this.polygons);
      this.relativeToAbsolute(this.polygons);
    };
    
    this.dToPoints = function(d) {
      let points = d.replace(/[a-zA-Z]/g, '');
      return points;
    };
    
    this.pathsToPolygons = function(paths, polygons) {
      let polypaths = polygons;
      
      for (let i=0; i<paths.length; i++) {
        paths[i].points = this.dToPoints(paths[i].d);
        delete paths[i].d;
        polypaths.push(paths[i]);
      }
      
      return polypaths;
    };
    
    this.getTransform = function(shape) {
      try {
        let t = shape.parentElement.getAttribute('transform');
        t = t.replace(/(translate\()|\)/g, '');
        let txy = t.split(",");
        return {x:txy[0], y:txy[1]};
      }
      catch(e) {
        return {x:0, y:0};
      }
    };
    
    this.getShapeAttributes = function(shape, type) {
      let attr = {};
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
        case 'polygon':
          attr.points       = shape.getAttribute('points');
          break;
        case 'rect':
          attr.width        = shape.getAttribute('width');
          attr.height       = shape.getAttribute('height');
          attr.x            = shape.getAttribute('x');
          attr.y            = shape.getAttribute('y');
          attr.area         = attr.width * attr.height;
          break;
      }
      attr.fill             = getComputedStyle(shape, null).fill;
      attr.fillopacity      = getComputedStyle(shape, null).fillOpacity;
      attr.stroke           = getComputedStyle(shape, null).stroke;
      attr.strokeopacity    = getComputedStyle(shape, null).strokeOpacity;
      attr.strokewidth      = getComputedStyle(shape, null).strokeWidth;
      attr.strokelinecap    = getComputedStyle(shape, null).strokeLinecap;
      attr.strokelinejoin   = getComputedStyle(shape, null).strokeLinejoin;
      attr.strokemiterlimit = getComputedStyle(shape, null).strokeMiterlimit;
      attr.strokedasharray  = getComputedStyle(shape, null).strokeDasharray;
      
      attr.transform        = this.getTransform(shape);
      
      return attr;
    };
    
    // comparison helper functions
    
    this.rgbToArray = function(rgb) {
      let pattern = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/;
      rgb = pattern.exec(rgb);
      
      if (rgb) {
        rgb.shift();
        rgb = rgb.map(Number);
        return rgb;
      }
    };
    
    this.findAngle = function(ax, ay, bx, by) {
      let cy = by - ay;
      let cx = bx - ax;
      let theta = Math.atan2(cy, cx);
      theta *= 180/Math.PI;
      return theta;
    };
    
    this.findCorners = function(points, tolerance) {
      let pointslength = points.length;
      let corners = [points[0], points[1]];
      let prevangle;
      
      for (let i=2; i<pointslength; i+=2) {
        let angle = this.findAngle(points[i-2],points[i-1], points[i],points[i+1]);
        
        if (angle <= prevangle+tolerance && angle >= prevangle-tolerance) {
          corners.push(points[i], points[i+1]);
        }
        
        prevangle = angle;
      }
      
      return corners;
    };
    
    this.compareDistance = function(ax, ay, bx, by) {
      return Math.sqrt((ax-bx)*(ax-bx) + (ay-by)*(ay-by));
    };
    
    this.compareNumber = function(i1, i2) {
      return Math.abs(i1 - i2);
    };
    
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
        return 1;
      }
    };
    
    // comparison functions
    
    this.compareColor = function(color1, color2) {
      
      color1 = this.rgbToArray(color1);
      color2 = this.rgbToArray(color2);
      
      if (color1 !== undefined && color2 !== undefined) {
        return window.DeltaE.getDeltaE00(
          {L: color1[0], A: color1[1], B: color1[2]},
          {L: color2[0], A: color2[1], B: color2[2]}
        );
      }
      
    };
    
    this.compareShape = function(shape1, shape2) {
      return {
        position         : this.compareDistance(shape1.x, shape1.y, shape2.x, shape2.y),
        area             : this.compareProportional(shape1.area, shape2.area),
        fill             : this.compareColor(shape1.fill, shape2.fill),
        fillopacity      : this.compareNumber(shape1.fillopacity, shape2.fillopacity),
        stroke           : this.compareColor(shape1.stroke, shape2.stroke),
        strokeopacity    : this.compareNumber(shape1.strokeopacity, shape2.strokeopacity),
        strokewidth      : this.compareProportional(shape1.strokewidth, shape2.strokewidth),
        strokelinecap    : shape1.strokelinecap === shape2.strokelinecap,
        strokelinejoin   : shape1.strokelinejoin === shape2.strokelinejoin,
        strokemiterlimit : this.compareProportional(shape1.strokemiterlimit, shape2.strokemiterlimit)
        //strokedasharray  : shape.style.strokeDasharray
      };
    };
    
    this.comparePath = function(p1, p2) {
      p1 = this.findCorners(p1, 3);
      p2 = this.findCorners(p2);
    };
  
  }
  
};
