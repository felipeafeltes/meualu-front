(function(){
    'use strict';
  app.controller('searchController', searchController);

  function searchController($scope, $rootScope, $state, ExtraInfo) {
    $scope.$watch('address', function(address) {
      if(address) {
        setup_search_filters();
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

    var setup_search_filters = function() {
      $rootScope.simple_filters = {
                                      bedrooms: _simple_filter_component(4),
                                      bathrooms: _simple_filter_component(3),
                                      garages: _simple_filter_component(3)
                                   };
      $rootScope.boolean_filters = {
                                      furnished: _boolean_filter_component(),
                                      pets_allowed: _boolean_filter_component(),
                                      public_transportation: _boolean_filter_component()
                                   };
      $rootScope.range_filters = {
                                   total_area: setup_range_filters('total_area', 15, 500),
                                   rental: setup_range_filters('rental', 500, 10000)
                                };
      $rootScope.extra_info_filters = ExtraInfo.query();
      $rootScope.$watch('extra_info_filters |filter:{selected:true}', function (nv) {
          $rootScope.filters.extra_infos = nv.map(function (info) {
            return info.id;
          });
          searchProperties($rootScope.address_string);
      }, true);
    }

    var setup_range_filters = function(filterName, minValue, maxValue){
      return {
          minValue: minValue,
          maxValue: maxValue,
          options: {
              floor: minValue,
              ceil: maxValue,
              step: 1,
              onEnd: function () {
                var rangeFilter = $rootScope.range_filters[filterName];
                $rootScope.filters[filterName] = rangeFilter.minValue + "," + rangeFilter.maxValue;
                searchProperties($rootScope.address_string);
              }
          },
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

  function _filter_name_translation(filterName) {
    var filtersMap = {
                        bedrooms: "dormitório",
                        bathrooms: "banheiro",
                        garages: "vaga",
                        furnished: "mobília#",
                        pets_allowed: "pet",
                        public_transportation: "transporte público#",
                        total_area: "área total#",
                        rental: "valor#"
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
      pets_allowed: [],
      public_transportation: [],
      total_area: "",
      rental: ""
    }
  }

  function _prepare_filters(filters) {
    return {
      bedrooms: filters.bedrooms.toString(),
      bathrooms: filters.bathrooms.toString(),
      garages: filters.garages.toString(),
      furnished: filters.furnished.toString(),
      pets_allowed: filters.pets_allowed.toString(),
      public_transportation: filters.public_transportation.toString(),
      total_area: filters.total_area,
      rental: filters.rental,
      extra_infos: filters.extra_infos
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
