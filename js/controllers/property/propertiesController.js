(function () {
  'use strict';
  app.controller('PropertiesSearchController', PropertiesSearchController);
  app.controller('PropertiesDetailsController', PropertiesDetailsController);

  function PropertiesSearchController($scope, $rootScope, PropertySearch, $stateParams, $state) {
    $scope.hasData = false;
    $rootScope.coords = null;
    $scope.properties = [];
    $scope.markers = [];
    $scope.properties_order = true;
    var filters = $stateParams.filters || {};

    getProperties(filters);
    function getProperties(filters) {
      $scope.hasData = false;
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
            var address = data.properties[0].address;
            data.properties.forEach(function (element) {
              var mark = {
                id: element.id,
                coords:
                {
                  latitude: element.address.latitude,
                  longitude: element.address.longitude
                },
                options: {
                  icon: {
                    url: '/assets/imagens/gmap-pin.png',
                    size: new google.maps.Size(40, 40),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(0, 10)
                  },
                }
              }
              $scope.markers.push(mark);
            }, this);
            $scope.full_adress = `${address.street + ', ' + address.district + ', ' + address.city + '/' + address.state}`;
          }
          $scope.hasData = true;
          $scope.map = {
            center: {
              latitude: (data.properties[0]) ? data.properties[0].address.latitude : -30.0490415,
              longitude: (data.properties[0]) ? data.properties[0].address.longitude : -51.1916632
            },
            zoom: 11
          };
        },
      );
    }

    $scope.shots = function (id) {
      $state.go('propertiesDetails', { id: id });
    }

    $scope.details = function (id) {
      $state.go('propertiesDetails', { id: id });
    }

    $scope.mobileFilters = function () {
      $("#filters").toggle("slow");
    }

    /*     $scope.markerEvents = {
          events: {
            mouseover: function(marker) {
              marker.model.show = !marker.model.show;
            },
            mouseout: function(marker) {
              marker.model.show = !marker.model.show;
            },
            click: function(marker) {
              $scope.openInfoWindow(marker.model);
            }
          }
        }; */

    $scope.cleanFilters = function () {
      var filters = {
        bedrooms: [],
        bathrooms: [],
        garages: [],
        furnished: [],
        pets_allowed: [],
        public_transportation: [],
        total_area: "",
        rental: ""
      }
      $rootScope.filters = filters;
      getProperties(filters);
    }

  }

  function PropertiesDetailsController($scope, $stateParams, $state,
    PropertyService,
    ExtraPropertyInfos,
    SimilarService
  ) {

    $scope.propertyDetails = {};
    $scope.hasData = false;
    $scope.moreCondominium = false;
    $scope.moreImmobile = false;
    $scope.similarProperties;
    $scope.scrollToFixedOptions = {
      preFixed: function () {

      },
      postFixed: function () {
      },
      preAbsolute: function () {

      },
      limit: function () {
        var limit = $('#maps').offset().top - $('#rental-fix').outerHeight(true) - 5;
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

    $scope.details = function (id) {
      $state.go('propertiesDetails', { id: id });
    }

    SimilarService.get(
      { id: $stateParams.id },
      function (data) {
        $scope.similarProperties = data.properties;
      },
    )


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

})();
