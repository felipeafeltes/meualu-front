app.controller('searchController',
  function ($scope, $state) {
    $scope.$watch('address.components.placeId', function() {
      searchProperties();
    });

    $scope.search = function() {
      searchProperties();
    }

    var searchProperties = function() {
      if($scope.address) {
        $state.go('alu.properties', { address_string: $scope.address.name });
      }
    }
  }
);
