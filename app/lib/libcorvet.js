/**
 * SVG auto-marker library
 * @constructor
 * @param {string} svg - SVG element to be assessed
 */

export default {
  
  Libcorvet: function(answer, submission) {
    
    this.tolerance = {
      points: 5,          // total % of difference between polygon points
      deltae: 10,         // color difference in fills & stokes
      strokeopacity: 0.2, // stroke opacity ranges between 0 and 1
      strokewidth: 5,     // % of difference in width
      corner: 2,          // disregard corners under this value (degrees)
      rectdetect: 5       // the degrees any path/poly to rect corner can be out
    };
    
    // extract shapes and attributes
    
    this.countShapes = function(svgselector, shape) {
      return document.querySelectorAll(svgselector + ' ' + shape).length;
    };
    
    this.setShapeAttributes = function(svgselector, total, type, array) {
      for (let i=0; i<total; i++) {
        let shape = this.getShapeAttributes(
          document.querySelectorAll(svgselector + ' ' +type)[i], type
        );
        array.push(shape);
      }
    };
    
    this.relativeToAbsolute = function(shapesarray) {
      for (let i=0; i<shapesarray.length; i++) {
        if (shapesarray[i].x) {
          shapesarray[i].x =
            parseFloat(shapesarray[i].x) + parseFloat(shapesarray[i].transform.x);
          shapesarray[i].y =
            parseFloat(shapesarray[i].y) + parseFloat(shapesarray[i].transform.y);
        }
        
        if (shapesarray[i].points) {
          let points = shapesarray[i].points.split(' ');
          let p = '';
          
          for (let j=0; j<points.length; j++) {
            let xy = points[j].split(',');
            p += (parseFloat(xy[0]) + parseFloat(shapesarray[i].transform.x));
            p += ',';
            p += (parseFloat(xy[1]) + parseFloat(shapesarray[i].transform.y));
            
            if (j < points.length-1) {
              p += ' ';
            }
          }
          shapesarray[i].points = p;
        }
      }
      
      return shapesarray;
    };
    
    this.SvgShapes = function() {
      this.circles = [];
      this.ellipses = [];
      this.paths = [];
      this.polygons = [];
      this.polylines = [];
      this.rects = [];
    };
    
    this.getShapes = function(svgselector) {
      let sel = svgselector;
      let shapes = new this.SvgShapes();
      
      this.setShapeAttributes(
        sel,
        this.countShapes(sel, 'circle'),
        'circle', shapes.circles
      );
      shapes.circles = this.relativeToAbsolute(shapes.circles);
      
      this.setShapeAttributes(
        sel,
        this.countShapes(sel, 'ellipse'),
        'ellipse', shapes.ellipses
      );
      shapes.ellipses = this.relativeToAbsolute(shapes.ellipses);
      
      this.setShapeAttributes(
        sel,
        this.countShapes(sel, 'rect'),
        'rect',
        shapes.rects
      );
      shapes.rects = this.relativeToAbsolute(shapes.rects);
      
      // path/polygon/polyline all as polygons:
      this.setShapeAttributes(
        sel, this.countShapes(sel, 'path'),
        'path',
        shapes.paths
      );
      this.setShapeAttributes(
        sel,
        this.countShapes(sel, 'polygon'),
        'polygon',
        shapes.polygons
      );
      this.setShapeAttributes(
        sel,
        this.countShapes(sel, 'polyline'),
        'polyline',
        shapes.polylines
      );
      
      shapes.polygons = this.pathsToPolygons(shapes.paths, shapes.polygons);
      
      for (let i=0; i<shapes.polygons.length; i++) {
        this.checkIfPolygonIsRect(shapes.polygons[i]);
      }
      
      shapes.polygons = shapes.polygons.concat(shapes.polylines);
      this.relativeToAbsolute(shapes.polygons);
      
      return shapes;
    };
    
    this.checkIfPolygonIsRect = function(polygon) {
      let corners = this.findCorners(
                      polygon.points,
                      this.tolerance.corner
                    ).length/2;
      
      if (corners === 4) {
        let pp = this.pointsToArray(polygon.points);
        let pcs = []
        
        let pcs[0] = this.findAngle(pp[0], pp[1], pp[2], pp[3]);
        let pcs[1] = this.findAngle(pp[2], pp[3], pp[4], pp[5]);
        let pcs[2] = this.findAngle(pp[4], pp[5], pp[6], pp[7]);
        let pcs[3] = this.findAngle(pp[6], pp[7], pp[0], pp[1]);
console.log(pcs);
      }
    };
    
    this.dToPoints = function(d) {
      if (d) {
          let points = d.replace(/[a-zA-Z]/g, '');
          points = points.trim();
          return points;
      }
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
    
    this.pointsToArray = function(points) {
      let p = points.replace(/,/g , " ");
      p = p.split(" ");
      p = p.map(parseFloat);
      
      return p;
    };
    
    this.getPointsShapeCentre = function(points) {
      points = this.pointsToArray(points);
      
      let xmin, xmax, ymin, ymax;
      
      for (let i=0; i<points.length; i+=2) {
        
        if (points[i]<xmin || xmin===undefined) {
          xmin = points[i];
        }
        if (points[i]>xmax || xmax===undefined) {
          xmax = points[i];
        }
        if (points[i-1]<ymin || ymin===undefined) {
          ymin = points[i-1];
        }
        if (points[i-1]>ymax || ymax===undefined) {
          ymax = points[i-1];
        }
      }
      
      let midpoints = { x: xmin+xmax/2, y: ymin+ymax/2 };
      return midpoints;
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
          let dToP          = this.dToPoints(attr.d);
          attr.x            = this.getPointsShapeCentre(dToP).x;
          attr.y            = this.getPointsShapeCentre(dToP).y;
          break;
        case 'polygon':
        case 'polyline':
          attr.points       = shape.getAttribute('points').trim();
          attr.x            = this.getPointsShapeCentre(attr.points).x;
          attr.y            = this.getPointsShapeCentre(attr.points).y;
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
    
    this.arrayMinIndex = function(array) {
      let index = 0;
      let value = array[0];
      
      for (let i=1; i<array.length; i++) {
        if (array[i] < value) {
          value = array[i];
          index = i;
        }
      }
      
      return index;
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
    
    this.findCorners = function(points, tolerance) {
      points = this.pointsToArray(points);
      let corners = [];
      
      let lastangle = this.findAngle(
                        points[points.length-2], points[points.length-1],
                        points[0], points[1]
                      );
      
      for (let i=2; i<=points.length; i+=2) {
        let angle;
        
        angle = this.findAngle(
                  points[i-2], points[i-1], points[i], points[i+1]
                );
        
        if (i >= points.length) {
          angle = this.findAngle(
                    points[0], points[1],
                    points[points.length-2], points[points.length-1]
                  );
        }
        
        if (Math.abs(angle-lastangle) > tolerance) {
          corners.push(points[i-2], points[i-1]);
        }
        
        lastangle = angle;
      }
      
      return corners;
    };
    
    this.getHausdorffDistance = function(points1, points2) {
      let h = 0;
      
      for (let i=0; i<points1.length; i++) {
        let d = this.compareDistance(
                  points1[i], points1[i+1],
                  points2[i], points2[i+1]
                );
        
        if (d > h) {
          h = d;
        }
      }
      
      return h;
    };
    
    this.alignPolygonPoints = function(points1, points2) {
      let p2 = points2;
      let offsets = [];
      
      function shiftPairs(points) {
        points.splice(0, 0, points[points.length-1]); points.pop();
        points.splice(0, 0, points[points.length-1]); points.pop();
      }
      
      for (let i=0; i<points1.length; i+=2) {
        let sumofd = 0;
        
        for (let ii=0; ii<p2.length; ii+=2) {
          let d = this.compareDistance(
                    p2[ii], p2[ii+1], points1[ii], points1[ii+1]
                  );
          sumofd += d;
        }
        
        offsets.push(sumofd);
        shiftPairs(p2);
      }
      
      var offest = this.arrayMinIndex(offsets);
      p2 = points2;
      
      for (let i=0; i<offest; i++) {
        shiftPairs(p2);
      }
      
      return p2;
    };
    
    this.comparePolygon = function(p1, p2) {
      if (p1 && p2) {
        p1 = this.findCorners(p1, this.tolerance.corner);
        p2 = this.findCorners(p2, this.tolerance.corner);
        
        if (p1.length !== p2.length) {
          return `${p2.length/2} corners found (should be ${p1.length/2})`;
        }
        else {
          p2 = this.alignPolygonPoints(p1, p2);
          return this.getHausdorffDistance(p1, p2);
        }
      }
    };
    
    this.compareShape = function(shape1, shape2) {
      let comparisons = {
        
        // common
        position         : this.compareDistance(
                             shape1.x, shape1.y, shape2.x, shape2.y),
        area             : this.compareProportional(
                             shape1.area, shape2.area),
        fill             : this.compareColor(
                             shape1.fill, shape2.fill),
        fillopacity      : this.compareNumber(
                             shape1.fillopacity, shape2.fillopacity),
        stroke           : this.compareColor(
                             shape1.stroke, shape2.stroke),
        strokeopacity    : this.compareNumber(
                             shape1.strokeopacity, shape2.strokeopacity),
        strokewidth      : this.compareProportional(
                             shape1.strokewidth, shape2.strokewidth),
        strokemiterlimit : this.compareProportional(
                             shape1.strokemiterlimit, shape2.strokemiterlimit),
        
        strokelinecap    : shape1.strokelinecap === shape2.strokelinecap,
        strokelinejoin   : shape1.strokelinejoin === shape2.strokelinejoin,
        strokedasharray  : shape1.strokedasharray === shape2.strokedasharray,
        
        // ellipses
        rx               : this.compareProportional(shape1.rx, shape2.rx),
        ry               : this.compareProportional(shape1.rx, shape2.rx),
        
        //polygons (and paths)
        points           : this.comparePolygon(shape1.points, shape2.points)
      };
      
      return comparisons;
    };
    
    this.getMostSimilarShapes = function(comparisonresults, criterion) {
      let r = {};
      
      for (let shape in comparisonresults) {
        r[shape] = [];
        let ansid = 0;
        
        for (let i=0; i<comparisonresults[shape].length; i++) {
          
          if (comparisonresults[shape][i].id.ans >= ansid) {
            r[shape].push([]);
            ansid ++;
          }
          
          for (let ii=0; ii<comparisonresults[shape].length; ii++) {
            if (comparisonresults[shape][i].id.ans === ii) {
              r[shape][ii].push(comparisonresults[shape][i]);
            }
          }
        }
        
        let indv = [];
        
        for (let i=0; i<r[shape].length; i++) {
          let ii = 0;
          
          while (ii < r[shape][i].length) {
            let id =  r[shape][i][ii].id.ans;
            
            if (indv[id] === undefined ||
                r[shape][i][ii][criterion] < indv[id][criterion]) {
              indv[id] = r[shape][i][ii];
            }
            
            ii ++;
          }
        }
        
        r[shape] = indv;
      }
      
      return r;
    };
    
    // marker functions
    
    this.compareAllShapes = function(ansshapes, subshapes) {
      let shapes = [];
      let candidates = {};
      
      for (let k in ansshapes) {
        shapes.push(k);
        candidates[k] = [];
      }
      
      for (let i=0; i<shapes.length; i++) {
        
        for (let ii=0; ii<ansshapes[shapes[i]].length; ii++) {
          
          for (let iii=0; iii<subshapes[shapes[i]].length; iii++) {
            let r = this.compareShape(
             ansshapes[shapes[i]][ii],
             subshapes[shapes[i]][iii]
            );
            r.id = {ans:ii, sub:iii};
            candidates[shapes[i]].push(r);
          }
        }
      }
      
      return this.getMostSimilarShapes(candidates, 'position');
    };
    
    this.gatherSubmissionAnswer = function() {
      let subshapes = this.getShapes(submission);
      let ansshapes = this.getShapes(answer);
      
      return this.compareAllShapes(ansshapes, subshapes);
    };
    
    this.calculateResult = function() {
      let r = this.gatherSubmissionAnswer();
      
      let calculated = {
        
      };
      /*
      this.tolerances = {
        points: 5,
        deltae: 10,
        strokeopacity: 0.2,
        strokewidth: 5
      };
      */
console.log(r);
      return r;
    };
    
  }
  
};
