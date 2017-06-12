(function(){
    'use strict';
  app.controller('searchController', searchController);

  function searchController($scope, $rootScope, $state) {

    $scope.$watch('address', function(address) {
      if(address) {
        _setup_search_filters($rootScope);
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

    $scope.filter_translation = function(filterName) {
      return _filter_name_translation(filterName)
    }
  }


  function _setup_search_filters($rootScope) {
    _setup_simple_filters($rootScope);
    _setup_boolean_filters($rootScope);
  }

  function _setup_simple_filters($rootScope) {
    $rootScope.simple_filters = {
                                   bedrooms: _simple_filter_component(4),
                                   bathrooms: _simple_filter_component(3),
                                   garages: _simple_filter_component(3)
                                };
  }

  function _setup_boolean_filters($rootScope) {
    $rootScope.boolean_filters = {
                                    furnished: _boolean_filter_component(),
                                    pets_allowed: _boolean_filter_component()
                                 }
  }

  function _filter_name_translation(filterName) {
    var filtersMap = {
                        bedrooms: "dormitório",
                        bathrooms: "banheiro",
                        garages: "vaga",
                        furnished: "mobiliado",
                        pets_allowed: "pet"
                     };
    return filtersMap[filterName];
  }

  function _simple_filter_component(size) {
    var filterComponent = [];
    for (var i = 1; i <= size; i++) {
      filterComponent.push(
        {
          value: i,
          label: i != size ? i.toString() : i.toString() + "+",
          selected: false
        }
      );
    }
    return filterComponent;
  }

  function _boolean_filter_component() {
    return [
        { value: true, label: "Sim", selected: false },
        { value: false, label: "Não", selected: false }
      ]
  }

  function _setup_filters(){
    return {
      bedrooms: [],
      bathrooms: [],
      garages: [],
      furnished: [],
      pets_allowed: []
    }
  }

  function _prepare_filters(filters) {
    return {
      bedrooms: filters.bedrooms.toString(),
      bathrooms: filters.bathrooms.toString(),
      garages: filters.garages.toString(),
      furnished: filters.furnished.toString(),
      pets_allowed: filters.pets_allowed.toString()
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
