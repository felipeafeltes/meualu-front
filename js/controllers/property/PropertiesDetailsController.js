app.controller('PropertiesDetailsController', PropertiesDetailsController)

function PropertiesDetailsController($scope, $stateParams, $state, PropertyService, ExtraPropertyInfos, SimilarService) {
  $scope.$on('$viewContentLoaded', () => {
    if (window.innerWidth < 992 && window.innerWidth > 768) {
      $scope.countShowSimilares = 2
    } else if (window.innerWidth < 768) {
      $scope.countShowSimilares = 1
    } else {
      $scope.countShowSimilares = 3
    }
  })

  $scope.propertyDetails = {}
  $scope.hasData = false
  $scope.moreCondominium = false
  $scope.moreImmobile = false
  $scope.similarProperties
  $scope.countShowSimilares

  $scope.scrollToFixedOptions = {
    preFixed: function () {

    },
    postFixed: function () {
    },
    preAbsolute: function () {

    },
    limit: function () {
      const limit = $('#maps').offset().top - $('#rental-fix').outerHeight(true) - 5
      return limit
    },
    removeOffsets: true,
    marginTop: 5
  }

  $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 11 }
  $scope.marker = null

  PropertyService.get({ id: $stateParams.id },
    function (data) {
      $scope.propertyDetails = data.property
      const markers = _setupMarkers([data])
      $scope.marker = markers[0]
      $scope.map = { center: angular.copy(markers[0].coords), zoom: 15 }
      ExtraPropertyInfos.get(
        { id: $stateParams.id },
        function (data) {
          $scope.extraInfos = data.extra_infos
        }
      )
      $scope.hasData = true
    }
  )

  $scope.details = function (id) {
    $state.go('propertiesDetails', { id: id })
  }

  SimilarService.get(
    { id: $stateParams.id },
    function (data) {
      $scope.similarProperties = data.properties
    },
  )


  $scope.showSchedule = function (propertyId) {
    $state.go('scheduling', { id: propertyId })
  }

  $scope.copyText = function () {
    var ta = document.getElementById('clip')
    ta.innerHTML = window.location.href
    ta.focus()
    ta.select()
    document.execCommand('copy')
    toastr.info('Link do imóvel copiado para área de transferência!')
  }

  function _setupMarkers(properties) {
    var markers = []
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
    })
    return markers
  }
}
