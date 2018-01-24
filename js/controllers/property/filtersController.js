(function () {
  'use strict';
  app.controller('filtersController', filtersController);

  function filtersController($rootScope, $scope, $state) {
    $scope.filters = _setup_filters();
    var rooms = [];
    $scope.roomsFilter = function selectedRoomFilters() {
      return filterFilter(rooms, { selected: true });
    };

    $scope.$watch('filters.rooms|filter:{selected:true}', function (nv) {
      rooms = nv.map(function (room) {
        return room;
        return info.id;
      });
    }, true);

    $scope.$watch('filters.rooms', function () {
      searchProperties();
    });

    var searchProperties = function () {
      if ($rootScope.address) {
        $state.go('alu.properties', { address_string: $rootScope.address.formatted_add, filters: { total_area: '50,100000' } });
      }
    }

    $scope.autocompleteOptions = {
      componentRestrictions: { country: 'br' },
      types: ['geocode']
    }
  }
  

  function _setup_filters() {
    return {
      rooms: [
        { value: 1, label: "1", selected: false },
        { value: 2, label: "2", selected: false },
        { value: 3, label: "3", selected: false },
        { value: 4, label: "4+", selected: false }]
    }
  }
})()
