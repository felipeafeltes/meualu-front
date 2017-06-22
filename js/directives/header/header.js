'use strict';

angular
  .module('aluFrontApp').directive('header', function($state, $rootScope){
  return {
    templateUrl:'js/directives/header/header.html',
    restrict: 'E',
    replace: true,
    link: function (scope) {
      scope.address = $state.params.address_string;
    }
  }
});


