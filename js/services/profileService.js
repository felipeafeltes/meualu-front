(function () {
    'use strict';

    angular
        .module('profileService', ['ngResource', 'ngRoute'])
        .factory('Profile', Profile);

    Profile.$inject = ['$resource', 'config'];

    function Profile($resource, config) {

        return $resource(config.apiUrl + 'users/:id', { id: '@id' },
            {
                getUser: {
                    method: 'GET',
                    transformRequest: _transform_request
                }
            });

        function _transform_request(data) {
            data = { "user": data }
            return angular.toJson(data);
        }
    }
})();
