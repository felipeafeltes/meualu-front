'use strict';

angular
  .module('aluFrontApp').directive('header', function($state, $stateParams){
  return {
    templateUrl:'js/directives/header/header.html',
    restrict: 'E',
    replace: true,
    controller: 'autoCompleteController',
    scope: true,
    link: function (scope) {
      scope.address = $stateParams.address_string;
    }
  }
});


