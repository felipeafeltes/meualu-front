(function () {
    'use strict';

    angular
        .module('usersSessionServices', ['ngResource', 'ngRoute'])
        .factory('User', User);

    User.$inject = ['$resource', 'config'];

    function User($resource, config) {
        var login = $resource(config.apiUrl + 'users/sign_in',
            {}, {
                sign_in: {
                    method: 'POST',
                    transformRequest: _transform_request
                }
            });

        function _transform_request(data) {
            data = { "user": data }
            return angular.toJson(data);
        }

        return login;
    }

})();
