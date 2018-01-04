'use strict';

angular
  .module('aluFrontApp').directive('footer', function($state, $rootScope){
  return {
    templateUrl:'js/directives/footer/footer.html',
    restrict: 'E',
    replace: true,
    scope: true,
  }
});


