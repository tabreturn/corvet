var app = angular.module('corvet', []);

app.controller('svgUpload', function($scope) {
  $scope.svgImage = 'hello';
  $scope.submit = function() {
    var file = document.getElementById('upload').files[0];
    var reader = new FileReader();
    reader.onload = function() {
      
      document.getElementById('result').innerHTML = reader.result;
      
      console.log(file);
      console.log("name : " + file.name);
      console.log("size : " + file.size);
      console.log("type : " + file.type);
      console.log("date : " + file.lastModified);
    }
    reader.readAsText(file);
    
    var svg = document.getElementById('result');
    console.log(svg);
    
  }
});
