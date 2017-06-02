(function(){
    'use strict';
  app.controller('searchController',searchController);

  function searchController($scope, $state) {
    $scope.$watch('address', function() {
      searchProperties();
    });

    $scope.search = function() {
      searchProperties();
    }

    var searchProperties = function() {
      if($scope.address) {
        $state.go('alu.properties', { address_string: $scope.address.name, filters: { total_area: '100,100000' } });
      }
    }

    $scope.autocompleteOptions = {
      componentRestrictions: { country: 'br' },
      types: ['geocode']
    }
  }
})()
