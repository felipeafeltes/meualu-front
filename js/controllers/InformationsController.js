(function(){
    'use strict';
  app.controller('InformationsController', InformationsController);

  function InformationsController($scope, $rootScope) {
    $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 11 };

    $scope.scrollToFixedOptions = {
      'marginTop': 5 ,
      'maxWidth': 50,
      'limit': 500,
      'offsets': true
    }
  }

})()
