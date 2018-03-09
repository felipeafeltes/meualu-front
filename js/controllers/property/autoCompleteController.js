(function () {
  'use strict';
  app.controller('autoCompleteController', autoCompleteController);

  function autoCompleteController($scope, $rootScope, $state) {
    $scope.searchPropertie = function () {
      var address = $scope.address;
      if (address) {
        console.log(address)
        if (address.formatted_address != undefined && $rootScope.address_string != address.formatted_address) {
          $rootScope.address_string = address.formatted_address;
        }
        if (address.geometry != undefined) {
          $rootScope.lng = address.geometry.location.lng();
          $rootScope.lat = address.geometry.location.lat();
        }
        $state.go('properties', {
          address_string: address.formatted_address,
          geo_lat: address.geometry.viewport.f.f + "," + address.geometry.viewport.f.f,
          geo_lng: address.geometry.viewport.b.b + "," + address.geometry.viewport.b.f
        });
      } else {
        $rootScope.lat = "-30.0490415";
        $rootScope.lng = "-51.1916632";
        $state.go('properties', {
          address_string: 'Porto Alegre, RS, Brasil',
          geo_lat: "-29.963159,-30.255998",
          geo_lng: "-51.267284700000005,-51.08699920000004",
        });
      }
    }

    var PoABounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(-30.255998, -51.224980),
      new google.maps.LatLng(-29.963159, -51.096578));


    $scope.autocompleteOptions = {
      componentRestrictions: { country: 'br' },
      location: new google.maps.LatLng(-30.255998, -51.224980),
      radius: 5000,
    }
  }
})();
