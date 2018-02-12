(function () {
    'use strict';

    angular
        .module('usersSessionServices', ['ngResource', 'ngRoute'])
        .factory('User', User)
        .factory('RecoverService', RecoverService)
        .factory('MySelf', MySelf)
        .factory('ConfirmAccountService', ConfirmAccountService)

    User.$inject = ['$resource', 'config'];
    MySelf.$inject = ['$resource', 'config'];
    RecoverService = ['$resource', 'config'];
    ConfirmAccountService = ['$resource', 'config'];

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

    function MySelf($resource, config) {
        return $resource(config.apiUrl + 'myself',
            {}, {
                get: {
                    method: 'GET',
                }
            });
    }

    function RecoverService($resource, config) {
        var recoverPassword = $resource(config.apiUrl + 'users/password',
            {}, {
                recover: {
                    method: 'POST',
                },
                reset: {
                    method: 'PUT',
                    transformRequest: _transform_request
                }
            });

        function _transform_request(data) {
            data = { "user": data }
            return angular.toJson(data);
        }
        return recoverPassword;
    }

    function ConfirmAccountService($resource, config) {
        var confirm = $resource(config.apiUrl + 'users/confirmation?confirmation_token=:token',
            { token: '@token' }, {
                get: {
                    method: 'GET',
                },
            });

        return confirm;
    }


})();
