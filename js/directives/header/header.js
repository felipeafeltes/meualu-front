'use strict';

angular
  .module('aluFrontApp').directive('header', function($state, $rootScope){
  return {
    templateUrl:'js/directives/header/header.html',
    restrict: 'E',
    replace: true,
    controller: 'autoCompleteController',
    scope: true,
    link: function (scope) {
      scope.address = $rootScope.address_string;
    }
  }
});


