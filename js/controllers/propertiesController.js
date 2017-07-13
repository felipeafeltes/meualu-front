(function(){
    'use strict';
  app.controller('PropertiesSearchController', PropertiesSearchController);
  app.controller('PropertiesDetailsController', PropertiesDetailsController);

  function PropertiesSearchController($scope, $rootScope, PropertySearch, $stateParams, $state) {
    var filters = $stateParams.filters || {};
    $rootScope.coords = null;
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
      },
      function(data){
        $scope.markers = _setupMarkers(data);
        console.log($scope.markers);
      }
    );

    $scope.details = function(id) {
      $state.go('alu.propertiesDetails', { id: id });
    }

    $scope.map = { center: { latitude: $rootScope.lat, longitude: $rootScope.lng }, zoom: 11 };
    $scope.properties_order = true;
  }

  function PropertiesDetailsController($scope, $stateParams, Property) {

    $scope.scrollToFixedOptions = {
      preFixed: function() { $(this).css('margin-top', '5px'); },
      postFixed: function() { $(this).css('margin-top', '-40px');},
      limit: $('#maps').offset().top
    };

    $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 11 }
    $scope.marker = null

    $scope.property = Property.get({ id: $stateParams.id },
      function(data){
        var markers = _setupMarkers([data]);
        $scope.marker = markers[0];
        $scope.map = { center: markers[0].coords, zoom: 15 };
        $scope.images = data.pictures.map(function (pic) {
          return {src: pic.url}
        });
      }
    );

    $scope.properties_related = []
  }

  function _setupMarkers(properties) {
    var markers = [];
    markers = properties.map(function (prop) {
      return {
               id: prop.id,
               coords:
               {
                  latitude: prop.address.latitude,
                  longitude: prop.address.longitude
               }
             }
    });
    return markers
  }
})()
