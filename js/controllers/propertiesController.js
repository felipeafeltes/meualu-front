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

  function PropertiesDetailsController($scope, $stateParams, Property) {
    $scope.property = Property.get({ id: $stateParams.id })
  }
})()
