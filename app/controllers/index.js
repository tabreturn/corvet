// app/controllers/index.js
import Ember from 'ember';

/* ember fixtures do not work,

export default Ember.Route.extend({
  model() {
    return this.store.findAll('test');
  }
});

// so global properties have been used to replace the model
*/

const tests = [
  { id:1, src:'assets/images/tests/01-star.png' },
  { id:2, src:'assets/images/tests/02-triangle.png' },
  { id:3, src:'assets/images/tests/03-zigzag.png' },
  { id:4, src:'assets/images/tests/04-smiley.png' },
  { id:5, src:'assets/images/tests/05-text.png' },
  { id:6, src:'assets/images/tests/06-grid.png' }
];

var task = 0;
var taskimg = tests[task].src;

export default Ember.Controller.extend({
  
  nextdisabled: true,
  tests: tests,
  imgsrc: taskimg,
  
  actions: {
    
    assessFile() {
      this.set('nextdisabled', false);
    },
    
    postResult() {
      Ember.$.post( '/api/results', { user:'tim'+Math.random(), task:1, score:22 })
        .done(function(data) {
          alert( 'Data Loaded: ' + data );
          task +=2;
          console.log(this.nextdisabled);
          //this.set('taskimg', tests[task].src);
          //this.transitionToRoute(`task${task}`);
        }
        .bind(this));
    }
  }
  
});


/*

  $scope.submit = function() {
    var file = document.querySelector('#upload').files[0];
    var submission = '#submission';
    
    var reader = new FileReader();
    reader.onload = function() {
      document.querySelector(submission).innerHTML = reader.result;
      
      var assess = new libcorvet(submission + ' svg');
      assess.getShapes();
      
      if (CONFIG.DEBUG) {
        
        //console.log('circles(' + assess.countShapes('circle') + '):');
        //console.log(assess.circles);
        //console.log('ellipse(' + assess.countShapes('ellipse') + '):');
        //console.log(assess.ellipses);
        console.log('paths(' + assess.countShapes('path') + '):');
        console.log(assess.paths);
        //console.log('rects(' + assess.countShapes('rect') + '):');
        //console.log(assess.rects);
        
        assess.findCorners();
        
        //console.log('file name: ' + file.name);
        //console.log('file size: ' + file.size);
        //console.log('file type: ' + file.type);
        //console.log('file date: ' + file.lastModified);
        
        //console.log('compare first two circles:');
        //console.log(assess.compareShape(assess.circles[0], assess.circles[1]));
        //console.log('compare first two rects:');
        //console.log(assess.compareShape(assess.rects[0], assess.rects[1]));
      }
    }
    reader.readAsText(file);
  }


corvet.controller('messageDisplay', function($scope, messages) {
  console.log(messages.test);
});
*/
