(function () {
    'use strict';

    angular
        .module('searchPropertiesServices', ['ngResource', 'ngRoute'])
        .factory('Property', Property);

    Property.$inject = ['$resource', 'config'];

    function Property($resource, config) {
        var property = $resource(config.apiUrl + 'properties/:id',
            { id: "@id" },
            {
                get: {
                    method: 'GET',
                },
            }
        );

        function _transform_request(data) {
            data = { "property": data }
            return angular.toJson(data);
        }

        property.prototype.full_address = function () {
            if (this.$resolved)
                return this.address.street + " " + this.address.number;
        };

        property.prototype.total_rental = function () {
            if (this.$resolved)
                return this.rental.value + this.rental.condominium + this.rental.iptu
        };
        return property;
    }

})();