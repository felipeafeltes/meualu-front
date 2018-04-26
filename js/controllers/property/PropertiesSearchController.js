app.controller('PropertiesSearchController', PropertiesSearchController)

function PropertiesSearchController($scope, $rootScope, PropertySearch, $stateParams, $state) {
  const RIGHT = 1, LEFT = -1
  $scope.hasData = false
  $rootScope.coords = null
  $scope.properties = []
  $scope.markers = []
  $scope.properties_order = 0
  const filters = $stateParams.filters || {}

  $scope.orderLabels = ['s/ ordenação', 'menor preço', 'maior preço']

  $scope.reorder = function (index) {
    $scope.properties_order = index
    switch (index) {
      case 1:
        return $scope.properties.sort(sortByPackageValue)
      case 2:
        return $scope.properties.reverse()
      default:
        return noOrder($scope.properties)
    }
  }

  $scope.hover = updateMarkerImage('/assets/imagens/gmap-pin2.png')
  $scope.hoverLeave = updateMarkerImage('/assets/imagens/gmap-pin.png')

  $scope.details = (id) => $state.go('propertiesDetails', { id })
  $scope.shots = (id) => $state.go('propertiesDetails', { id })
  //TODO deixar apenas o details se realmente não houver diferença entre clicar no mapa ou clicar na box

  $scope.mobileFilters = () => $('#filters').toggle('slow')

  $scope.cleanFilters = () => {
    const emptyFilters = {
      bedrooms: [],
      bathrooms: [],
      garages: [],
      furnished: [],
      pets_allowed: [],
      public_transportation: [],
      total_area: '',
      rental: ''
    }
    $rootScope.filters = emptyFilters
    getProperties(emptyFilters)
  }

  //TODO colocar isso no componente de anúncios pequenos (a ser criado)
  $scope.setImageByIndex = function (event, property) {
    return index => {
      event.preventDefault()
      event.stopPropagation()
      property.imageIndex = index
    }
  }

  $scope.nextImage = function (event, property, direction = RIGHT) {
    const currentIndex = property.imageIndex || 0
    if (angular.isUndefined(property.pictures[currentIndex + direction])) {
      $scope.setImageByIndex(event, property)(0)
    }
    else {
      $scope.setImageByIndex(event, property)(currentIndex + direction)
    }
  }

  $scope.prevImage = (event, property) => $scope.nextImage(event, property, LEFT)

  $scope.propertyImageIndex = property => {
    return property.imageIndex || 0
  }

  getProperties(filters)

  function sortByPackageValue(a, b) {
    const valA = parseFloat(a.rental.package_value)
    const valB = parseFloat(b.rental.package_value)
    return valA < valB ? -1 : valA > valB ? 1 : 0
  }

  function noOrder() {
    //TODO Refatorar: nada performático, quando filtra novamente tem que esperar ir na API e voltar
    return getProperties(filters)
  }

  function currentMarker(id) {
    return $scope.markers.find(x => x.id === id)
  }

  function updateMarkerImage(url) {
    return id => currentMarker(id).options.icon.url = url
  }

  function getProperties(filters) {
    $scope.hasData = false
    PropertySearch.get({
      filters,
      address_string: $stateParams.address_string,
      geo_lat: $stateParams.geo_lat,
      geo_lng: $stateParams.geo_lng,
    }, getPropertiesResolve)
  }

  function getPropertiesResolve(data) {
    $scope.properties = data.properties
    if ($scope.properties.length > 0) {
      data.properties.forEach(function (element) {
        const mark = {
          id: element.id,
          coords:
            {
              latitude: element.address.latitude,
              longitude: element.address.longitude
            },
          options: {
            icon: {
              url: '/assets/imagens/gmap-pin.png',
              size: new google.maps.Size(25, 30),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(0, 30),
            },
          }
        }
        $scope.markers.push(mark)
      })
      $scope.full_adress = $stateParams.address_string
    }
    $scope.hasData = true
    $scope.map = {
      center: {
        latitude: (data.properties[0]) ? data.properties[0].address.latitude : -30.0490415,
        longitude: (data.properties[0]) ? data.properties[0].address.longitude : -51.1916632
      },
      zoom: 11
    }
  }
}
