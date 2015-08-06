'use strict';

corvet.controller('svgUpload', function($scope, messages, CONFIG) {
  $scope.submit = function() {
    var file = document.querySelector('#upload').files[0];
    var submission = '#submission';
    
    var reader = new FileReader();
    reader.onload = function() {
      document.querySelector(submission).innerHTML = reader.result;
      
      var assess = new libcorvet(submission + ' svg');
      assess.getShapes();
      
      if(CONFIG.DEBUG) {
        console.log('rects(' + assess.countRects()+'):');
        console.log(assess.rects);
        console.log('circles(' + assess.countCircles()+'):');
        console.log(assess.circles);
        console.log('paths(' + assess.countPaths()+'):');
        console.log(assess.paths);
        console.log("file name: " + file.name);
        console.log("file size: " + file.size);
        console.log("file type: " + file.type);
        console.log("file date: " + file.lastModified);
      }
    }
    reader.readAsText(file);
  }
});

corvet.controller('messageDisplay', function($scope, messages) {
  console.log(messages.test);
});
