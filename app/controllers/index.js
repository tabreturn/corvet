// app/controllers/index.js
import Ember from 'ember';

/* ember fixtures do not work

export default Ember.Route.extend({
  model() {
    return this.store.findAll('test');
  }
});
*/

export default Ember.Controller.extend({
  
  isDisabled: true,

  emailAddressChanged: Ember.observer('emailAddress', function() {
    console.log(this.target);
    console.log(this.get('emailAddress'));
    
    //var file = document.querySelector('#upload').files[0];
    //var submission = '#submission';
    console.log(document.querySelector('#upload').files[0]);
    var reader = new FileReader();
    reader.onload = function() {
      console.log('loaded');
    };
    
    this.set('isDisabled', false);
  }),
  
  actions: {
    
    postResult() {
      var user = 'tim' + Math.random();
      var task = 1;
      var result = 22;
      Ember.$.post( "/api/results", { user:user, task:task, score:result })
        .done(function( data ) {
          alert( "Data Loaded: " + data );
        });
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
