'use strict';

var corvet = angular.module('corvet', ['ngRoute']);

corvet.constant('CONFIG', {
  'DEBUG':true,
});

corvet.config(function($routeProvider) {
  $routeProvider
    .when('/message', {
      templateUrl : 'pgs/message.html',
      controller  : 'messageDisplay'
  })
  .otherwise({
    redirectTo: '/'
  });
});
