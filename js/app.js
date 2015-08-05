var corvet = angular.module('corvet', ['ngRoute']);

corvet.config(function($routeProvider) {
  $routeProvider
    .when('/message', {
      templateUrl : 'pages/message.html',
      controller  : 'messageDisplay'
  })
  .otherwise({
    redirectTo: '/'
  });
});
