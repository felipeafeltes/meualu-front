(function () {
    'use strict';

    angular
        .module('propertiesSearchServices', ['ngResource', 'ngRoute'])
        .factory('PropertySearch', PropertySearch);

        PropertySearch.$inject = ['$resource', 'config'];

        function PropertySearch($resource, config, $filter) {
            var propertySearch = $resource(config.apiUrl + 'properties/search/:address_string/',
            { filters: '@filters' }
          );

          propertySearch.prototype.full_address = function() {
            if (this.$resolved)
              return this.address.street + " " + this.address.number;
          };

          propertySearch.prototype.total_rental = function() {
            if (this.$resolved)
              return this.rental.value + this.rental.condominium + this.rental.iptu
          };

          propertySearch.prototype.cover_url = function() {
            if (this.pictures.length){
              return this.pictures[0].url;
            } else {
              return "/assets/imagens/default-image.png";
            }
          };

          return propertySearch;

        }

})();
