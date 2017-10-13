(function(){
    'use strict';
  app.controller('searchController', searchController);

  function searchController($scope, $rootScope, $state, ExtraInfo, $timeout, $filter, rentalNewsletter) {
    /*$scope.$watch('address', function(address) {
      if(address) {
        if(address.formatted_address != undefined && $rootScope.address_string != address.formatted_address) {
          setup_search_filters();
          $rootScope.filters = _setup_filters();
          $rootScope.address_string = address.formatted_address;
        }
        if (address.geometry != undefined){
          $rootScope.lng = address.geometry.location.lng();
          $rootScope.lat = address.geometry.location.lat();
        }
        searchProperties($rootScope.address_string);
      }
    });*/

    $scope.contato = new rentalNewsletter();

    $scope.sendContato = function(){
      //rentalNewsletter
      $scope.contato.$save();
    };

    $scope.refreshSlider = function () {
      $timeout(function () {
          $scope.$broadcast('rzSliderForceRender');
      }, 10);
    };

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
        $state.go('properties', {
          address_string: address,
          filters: _prepare_filters(filters)
        });
      }
    }

    var setup_search_filters = function() {
      $rootScope.simple_filters = {
                                      bedrooms: [_simple_filter_component(4), 'fa-bed'],
                                      bathrooms: [_simple_filter_component(3), 'fa-bath'],
                                      garages: [_simple_filter_component(3), 'fa-car']
                                   };
      $rootScope.boolean_filters = {
                                      furnished: [_boolean_filter_component('furnished', "Sim", 'Não'), 'fa-tv'],
                                      pets_allowed: [_boolean_filter_component('pets_allowed', 'Permitido', 'Não permitido'), 'fa-paw'],
                                      public_transportation: [_boolean_filter_component('public_transportation', 'Próximo', 'Não próximo'), 'fa-bus']
                                   };
      $rootScope.range_filters = {
                                   total_area: setup_range_filters('total_area', 15, 500, 'fa-regua', 'total-area-filter'),
                                   rental: setup_range_filters('rental', 200, 10000, 'fa-money', 'rental-filter')
                                };
      $rootScope.extra_info_filters = ExtraInfo.query();
      $rootScope.$watch('extra_info_filters |filter:{selected:true}', function (nv) {
          $rootScope.filters.extra_infos = nv.map(function (info) {
            return info.id;
          });
          searchProperties($rootScope.address_string);
      }, true);
    }

    var setup_range_filters = function(filterName, minValue, maxValue, icon, filterClass){
      return {
          minValue: minValue,
          maxValue: maxValue,
          options: {
              floor: minValue,
              ceil: maxValue,
              translate: function (value) {
                return "";
              },
              onEnd: function () {
                var rangeFilter = $rootScope.range_filters[filterName];
                $rootScope.filters[filterName] = rangeFilter.minValue + "," + rangeFilter.maxValue;
                searchProperties($rootScope.address_string);
              }
          },
          icon: icon,
          class: filterClass
        }
    }

    $scope.filter_translation = function(filterName) {
      //if selected return value instead
      if ($scope.filters[filterName] != ""){
        if ($rootScope.simple_filters[filterName] != undefined){
          return $scope.filters[filterName].sort().join()+"#";
        } else if ($rootScope.boolean_filters[filterName] != undefined) {
          var value_and_key = $scope.filters[filterName].join()+filterName;
          return _label_name_translation(value_and_key)+"#";
        } else {
          if (filterName == "total_area"){
            return $scope.filters[filterName].split(",").join(" até ")+" m²#";
          } else {
            var value_splited = $scope.filters[filterName].split(",");
            return "R$ "+[$filter('currency')(value_splited[0], ""), $filter('currency')(value_splited[1], "") ].join(" até ")+"#";
          }
        }
      } else {
        return _filter_name_translation(filterName, $scope.filters[filterName]);
      }
    }

    $scope.label_translation = function(filterName) {
      return _label_name_translation(filterName);
    }

    if ($rootScope.filters == null){
      setup_search_filters();
      $rootScope.filters = _setup_filters();
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
                        rental: "valor#",
                        truepublic_transportation: "Próximo"
                     };
    return filtersMap[filterName];
  }

  function _label_name_translation(filterName) {
    var filtersMap = {
                      garages: "vaga",
                      bedrooms: "dormitório",
                      bathrooms: "banheiro",
                      truefurnished: "Sim",
                      falsefurnished: "Não",
                      'true,falsefurnished': "Ambos",
                      'false,truefurnished': "Ambos",
                      truepets_allowed: "Permitido",
                      falsepets_allowed: "Não permitido",
                      'true,falsepets_allowed': "Ambos",
                      'false,truepets_allowed': "Ambos",
                      truepublic_transportation: "Próximo",
                      falsepublic_transportation: "Não próximo",
                      'true,falsepublic_transportation': "Ambos",
                      'false,truepublic_transportation': "Ambos"
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

  function _boolean_filter_component(name, label_true, label_false) {
    return [
        { value: true, label: label_true, selected: false, name: name },
        { value: false, label: label_false, selected: false, name: name }
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
