(function () {
  'use strict';
  app.controller('PropertiesSearchController', PropertiesSearchController);
  app.controller('PropertiesDetailsController', PropertiesDetailsController);

  function PropertiesSearchController($scope, $rootScope, PropertySearch, $stateParams, $state) {
    $scope.hasData = false;
    $rootScope.coords = null;
    $scope.properties = [];
    var filters = $stateParams.filters || {};
    PropertySearch.get(
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
      function (data) {
        $scope.properties = data.properties;
        if ($scope.properties.length > 0) {
          $scope.markers = _setupMarkers([data]);
          var address = data.properties[0].address;
          $scope.full_adress = `${address.street + ', ' + address.district + ', ' + address.city + '/' + address.state}`;
        }
        $scope.hasData = true;
      },
    );

    $scope.details = function (id) {
      $state.go('propertiesDetails', { id: id });
    }

    $scope.map = { center: { latitude: $rootScope.lat, longitude: $rootScope.lng }, zoom: 11 };
    $scope.properties_order = true;

    function _setupMarkers(properties) {
      var markers = [];
      markers = properties.map(function (prop) {
        return {
          id: prop.properties[0].id,
          coords:
          {
            latitude: prop.properties[0].address.latitude,
            longitude: prop.properties[0].address.longitude
          },
          options: {
            icon: {
              url: '/assets/imagens/gmap-pin.png',
              size: new google.maps.Size(40, 40),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(0, 30)
            }
          }
        }
      });
      return markers
    }
  }

  function PropertiesDetailsController($scope, $stateParams, $state,
    PropertyService,
    ExtraPropertyInfos,
  ) {

    $scope.propertyDetails = {};
    $scope.hasData = false;
    $scope.moreCondominium = false;
    $scope.moreImmobile = false;

    $scope.scrollToFixedOptions = {
      preFixed: function () {
      },
      postFixed: function () {
      },
      preAbsolute: function () {
      },
      limit: function () {
        var limit = $('#maps').offset().top - $('#rental-fix').outerHeight(true) - 10;
        return limit;
      },
      removeOffsets: true,
      marginTop: 5
    };

    $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 11 };
    $scope.marker = null;

    PropertyService.get({ id: $stateParams.id },
      function (data) {
        $scope.propertyDetails = data.property;
        var markers = _setupMarkers([data]);
        $scope.marker = markers[0];
        $scope.map = { center: angular.copy(markers[0].coords), zoom: 15 };

        ExtraPropertyInfos.get(
          { id: $stateParams.id },
          function (data) {
            $scope.extraInfos = data.extra_infos;
          }
        )
        $scope.hasData = true;
      }
    );


    $scope.showSchedule = function (propertyId) {
      $state.go('scheduling', { id: propertyId })
    }

    $scope.copyText = function () {
      var ta = document.getElementById('clip');
      ta.innerHTML = window.location.href;
      ta.focus();
      ta.select();
      document.execCommand('copy');
      toastr.info("Link do imóvel copiado para área de transferência!")
    }

    function _setupMarkers(properties) {
      var markers = [];
      markers = properties.map(function (prop) {
        return {
          id: prop.property.id,
          coords:
          {
            latitude: prop.property.address.latitude,
            longitude: prop.property.address.longitude
          },
          options: {
            icon: {
              url: '/assets/imagens/gmap-pin.png',
              size: new google.maps.Size(40, 40),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(0, 30)
            }
          }
        }
      });
      return markers
    }
  };

})()
