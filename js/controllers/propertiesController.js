(function(){
    'use strict';
  app.controller('PropertiesSearchController', PropertiesSearchController);

  function PropertiesSearchController($scope, PropertySearch, $stateParams) {
      var filters = $stateParams.filters || _setup_filters();
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
            rental: filters.rental
          }
        }
      );
  }

  function _setup_filters() {
    return {
             bedrooms: null,
             bathrooms: null,
             garages: null,
             total_area: null
           }
  }
})()
