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
            total_area: filters.total_area
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
