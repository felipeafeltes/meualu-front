(function(){
    'use strict';
  app.controller('autoCompleteController', autoCompleteController);

  function autoCompleteController($scope, $rootScope, $state) {
    $scope.searchPropertie = function() {
      var address = $scope.address;
      if(address) {
        if(address.formatted_address != undefined && $rootScope.address_string != address.formatted_address) {
          $rootScope.address_string = address.formatted_address;
        }
        if (address.geometry != undefined){
          $rootScope.lng = address.geometry.location.lng();
          $rootScope.lat = address.geometry.location.lat();
        }
        $state.go('alu.properties', {
          address_string: address
        });
      }
    }

    $scope.autocompleteOptions = {
      componentRestrictions: { country: 'br' },
      bounds: new google.maps.LatLngBounds(
          new google.maps.LatLng(-30.1280988,-51.2153672)),
      strictBounds: true,
      types: ['address']
    }
  }
})()
