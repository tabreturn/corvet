'use strict';

corvet.controller('svgUpload', function($scope, messages) {
  $scope.submit = function() {
    var file = document.querySelector('#upload').files[0];
    var submission = '#submission';
    var assess = new libcorvet(submission + ' svg');
    
    var reader = new FileReader();
    reader.onload = function() {
      document.querySelector(submission).innerHTML = reader.result;
      
      assess.countRects();
      assess.countCircles();
      assess.countPaths();
      
      console.log("name : " + file.name);
      console.log("size : " + file.size);
      console.log("type : " + file.type);
      console.log("date : " + file.lastModified);
    }
    reader.readAsText(file);
  }
});

corvet.controller('messageDisplay', function($scope, messages) {
  console.log(messages.test);
});
