(function(){
    'use strict';
  app.controller('PropertiesSearchController', PropertiesSearchController);

  function PropertiesSearchController($scope, $rootScope, PropertySearch, $stateParams) {
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
            rental: filters.rental,
            extra_infos: filters.extra_infos
          }
        }
      );

      $scope.map = { center: { latitude: $rootScope.lat, longitude: $rootScope.lng }, zoom: 11 };

      $scope.properties = [
        {
          address:{
            street: "Rua machado de Assis",
            neighborhood: "Jardim Botanico"
          },
          rental: "800,00",
          total: "920,00",
          details:{
            bedrooms: 2,
            bathrooms: 4,
            total_area: "86m²",
          }
        },
        {
          address:{
            street: "Rua machado de Assis",
            neighborhood: "Jardim Botanico"
          },
          rental: "800,00",
          total: "920,00",
          details:{
            bedrooms: 2,
            bathrooms: 4,
            total_area: "86m²",
          }
        },
        {
          address:{
            street: "Rua machado de Assis",
            neighborhood: "Jardim Botanico"
          },
          rental: "800,00",
          total: "920,00",
          details:{
            bedrooms: 2,
            bathrooms: 4,
            total_area: "86m²",
          }
        }
      ]
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
