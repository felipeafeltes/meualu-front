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
        $state.go('properties', {
          address_string: address.formatted_address
        });
      }else{
        $rootScope.lat = "-30.0490415";
        $rootScope.lng = "-51.1916632";
        $state.go('properties', {
          address_string: ''
        });
      }
    }

    var PoABounds = new google.maps.LatLngBounds(
          new google.maps.LatLng(-30.255998,-51.224980),
          new google.maps.LatLng(-29.963159,-51.096578));

    $scope.autocompleteOptions = {
      componentRestrictions: { country: 'br' },
      bounds: PoABounds,
      types: ['address']
    }
  }
})()
