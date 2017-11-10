(function () {
    'use strict';

    angular
        .module('userService', ['ngResource', 'ngRoute'])
        .factory('UsersService', UsersService);

    UsersService.$inject = ['$resource', 'config'];

    function UsersService($resource, config) {

        var register = $resource(config.apiUrl + 'users',
            {}, {
                save: {
                    method: 'POST',
                    transformRequest: _transform_request
                }
            });

        function _transform_request(data) {
            data = { "user": data }
            return angular.toJson(data);
        }

        return register;
    }

})();
