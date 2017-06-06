(function(){
    'use strict';
  app.controller('searchController', searchController);

  function searchController($scope, $rootScope, $state) {

    $scope.$watch('address', function(address) {
      if(address) {
        $rootScope.search_filters = _setup_search_filters();
        $rootScope.filters = _setup_filters();
        $rootScope.address_string = address.formatted_address;
        searchProperties($rootScope.address_string);
      }
    });

    $scope.onFilterSelect = function(filterObj, filterName){
      if(filterObj.selected) {
        if(!$rootScope.filters[filterName]) {
          $rootScope.filters[filterName] = []
        }
        $rootScope.filters[filterName].push(filterObj.value);
      } else {
        var index = $rootScope.filters[filterName].indexOf(filterObj.value);
        $rootScope.filters[filterName].splice(index, 1);
      }
      searchProperties($rootScope.address_string);
    }

    var searchProperties = function(address) {
      var filters  = $rootScope.filters;
      if(address) {
        $state.go('alu.properties', {
          address_string: address,
          filters: _prepare_filters(filters)
        });
      }
    }

    $scope.autocompleteOptions = {
      componentRestrictions: { country: 'br' },
      types: ['geocode']
    }
  }


  function _setup_search_filters() {
    return {
      bedrooms:
        [
          { value: 1, label: "1", selected: false },
          { value: 2, label: "2", selected: false },
          { value: 3, label: "3", selected: false },
          { value: 4, label: "4+", selected: false }
        ],
      bathrooms:
        [
          { value: 1, label: "1", selected: false },
          { value: 2, label: "2", selected: false },
          { value: 3, label: "3+", selected: false },
        ],
      }
  }

  function _setup_filters(){
    return {
      bedrooms: "",
      bathrooms: ""
    }
  }

  function _prepare_filters(filters) {
    return {
      bedrooms: filters.bedrooms.toString(),
      bathrooms: filters.bathrooms.toString()
    }
  }

  function _prepare_range_param(array_param) {
    if(!array_param) {
      return "";
    }
    array_param = array_param.sort();
    var new_array = [array_param[0], array_param[array_param.length - 1]];
    var uniqueArray = new_array.filter(function(item, pos, self) {
      return self.indexOf(item) == pos;
    })
    return uniqueArray.toString();
  }
})()
