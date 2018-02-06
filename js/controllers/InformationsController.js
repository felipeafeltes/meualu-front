(function () {
  'use strict';
  app.controller('InformationsController', InformationsController);

  function InformationsController($scope, $rootScope, $state) {
    $scope.search = function () {
      $state.go('properties', {
        address_string: 'Porto Alegre, RS, Brasil'
      });
    }
  }

})();
