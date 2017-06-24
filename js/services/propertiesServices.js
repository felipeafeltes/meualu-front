(function () {
    'use strict';

    angular
        .module('propertiesServices', ['ngResource', 'ngRoute'])
        .factory('Property', Property);

        Property.$inject = ['$resource'];

        function Property($resource) {
            var property = $resource('http://localhost:3000/properties/:id', { id:'@id' });

          function _transform_request(data) {
              data = { "property" : data }
              return angular.toJson(data);
          }

          property.prototype.full_address = function() {
              return this.address.street + " " + this.address.number;
          };
          return property;
        }

})();
