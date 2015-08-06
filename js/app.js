'use strict';

var corvet = angular.module('corvet', ['ngRoute']);

corvet.constant('CONFIG', {
  'DEBUG': false // set to true for console-bug debug info
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
