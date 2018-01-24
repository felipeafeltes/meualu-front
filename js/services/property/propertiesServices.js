(function () {
    'use strict';

    angular
        .module('propertiesServices', ['ngResource', 'ngRoute'])
        .factory('PropertyService', PropertyService)
        .factory('PropertyRentalService', PropertyRentalService)
        .factory('PropertyPrivate', PropertyPrivate)
        .factory('editPropertyPrivate', editPropertyPrivate)

    PropertyService.$inject = ['$resource', 'config'];
    PropertyRentalService.$inject = ['$resource', 'config'];
    PropertyPrivate.$inject = ['$resource', 'config'];
    editPropertyPrivate.$inject = ['$resource', 'config'];
    
    function PropertyService($resource, config) {
        var property = $resource(config.apiUrl + 'properties/:id',
            { "id": "@id" },
            {
                get: {
                    method: 'GET',
                },
                save: {
                    method: 'POST',
                    transformRequest: _transform_request
                },
                update: {
                    method: 'PUT',
                    transformRequest: _transform_request
                },
                delete: {
                    method: 'DELETE'
                }
            }
        );

        function _transform_request(data) {
            data = { "property": data }
            return angular.toJson(data);
        }

        return property;
    }

    function PropertyRentalService($resource, config) {
        var rental = $resource(config.apiUrl + 'properties/calculate_rent',
            {},
            {
                query: {
                    method: 'POST',
                },
            }
        );

        return rental;
    }

    function PropertyPrivate($resource, config) {
        return $resource(config.apiUrl + 'properties/:id/private',
            { id: '@id' },
            {
                delete: {
                    method: 'PUT'
                },
            }
        );
    }

    function editPropertyPrivate($resource, config) {
        return $resource(config.apiUrl + '/properties/:id/values',
            { id: '@id' },
            {
                update: {
                    method: 'PUT'
                },
            }
        );
    }

    


})();
