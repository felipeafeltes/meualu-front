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
        return property;
    }

})();
