'use strict';

corvet.controller('svgUpload', function($scope, messages, CONFIG) {
  $scope.submit = function() {
    var file = document.querySelector('#upload').files[0];
    var submission = '#submission';
    var assess = new libcorvet(submission + ' svg');
    
    var reader = new FileReader();
    reader.onload = function() {
      document.querySelector(submission).innerHTML = reader.result;
      
      if(CONFIG.DEBUG) {
        console.log('rects:' + assess.countRects());
        console.log('circles:' + assess.countCircles());
        console.log('paths:' + assess.countPaths());
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
