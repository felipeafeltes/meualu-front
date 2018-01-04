'use strict';

angular
  .module('aluFrontApp').directive('header', function($state, $rootScope){
  return {
    templateUrl:'js/directives/header-property/header-property.html',
    restrict: 'E',
    replace: true,
    scope: true,
  }
});


