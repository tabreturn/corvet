corvet.controller('svgUpload', function($scope, messages) {
  $scope.submit = function() {
    var file = document.getElementById('upload').files[0];
    
    var reader = new FileReader();
    
    reader.onload = function() {
      document.getElementById('result').innerHTML = reader.result;
      /*console.log(file);
      console.log("name : " + file.name);
      console.log("size : " + file.size);
      console.log("type : " + file.type);
      console.log("date : " + file.lastModified);*/
    }
    
    reader.readAsText(file);
  }
});

corvet.controller('messageDisplay', function($scope, messages) {
  $scope.submit = function() {
    console.log(messages.hello);
  }
});
