(function () {
    'use strict';

    angular
        .module('propertiesSearchServices', ['ngResource', 'ngRoute'])
        .factory('PropertySearch', PropertySearch);

        PropertySearch.$inject = ['$resource'];

        function PropertySearch($resource) {
            var propertySearch = $resource('http://localhost:3000/properties/search/:address_string/',
            { filters: '@filters' }
          );

          propertySearch.prototype.full_address = function() {
              return this.address.street + " " + this.address.number;
          };

          propertySearch.prototype.total_rental = function() {
              return this.rental.value + this.rental.condominium + this.rental.iptu
          };
          return propertySearch;

        }

})();
