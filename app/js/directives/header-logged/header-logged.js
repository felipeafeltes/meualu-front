'use strict';

angular
  .module('aluFrontApp').directive('header', function($state, $rootScope){
  return {
    templateUrl:'js/directives/header-logged/header-logged.html',
    restrict: 'E',
    replace: true,
    scope: true,
  }
});


