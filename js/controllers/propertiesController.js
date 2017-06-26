(function(){
    'use strict';
  app.controller('PropertiesSearchController', PropertiesSearchController);
  app.controller('PropertiesDetailsController', PropertiesDetailsController);

  function PropertiesSearchController($scope, $rootScope, PropertySearch, $stateParams, $state) {
      var filters = $stateParams.filters || {};
      $scope.properties = PropertySearch.query(
        {
          address_string: $stateParams.address_string,
          filters: {
            bedrooms: filters.bedrooms,
            bathrooms: filters.bathrooms,
            garages: filters.garages,
            furnished: filters.furnished,
            pets_allowed: filters.pets_allowed,
            public_transportation: filters.public_transportation,
            total_area: filters.total_area,
            rental: filters.rental,
            extra_infos: filters.extra_infos
          }
        }
      );

      $scope.details = function(id) {
        $state.go('alu.propertiesDetails', { id: id });
      }

      $scope.map = { center: { latitude: $rootScope.lat, longitude: $rootScope.lng }, zoom: 11 };
  }

  function PropertiesDetailsController($scope, $stateParams, Property) {
    $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 11 };

    $scope.scrollToFixedOptions = {
      'marginTop': 5 ,
      'maxWidth': 50,
      'limit': 500,
      'offsets': true
    }

    $scope.property = Property.get({ id: $stateParams.id })
  }
})()
