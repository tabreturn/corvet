import Ember from 'ember';

export default Ember.TextField.extend({
  tagName: 'input',
  type: 'file',
  disabled: true,
  
  propertyObserver: Ember.observer('browsedisabled', function() {
    Ember.$('.list-group-item [type=file]').val('');
    this.set('disabled', this.get('browsedisabled'));
  }),
  
  change: function(e) {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = function(e) {
      document.querySelector('#submission').innerHTML = reader.result;
    };
    this.sendAction();
    reader.readAsText(file);
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
