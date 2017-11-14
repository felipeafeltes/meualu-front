(function () {
    'use strict';

    angular
        .module('userService', ['ngResource', 'ngRoute'])
        .factory('UsersService', UsersService);

    UsersService.$inject = ['$resource', 'config'];

    function UsersService($resource, config) {

        var register = $resource(config.apiUrl + 'users/:id',
            {id:'@id'}, {
                //Criar Usuario
                create: {
                    method: 'POST',
                    transformRequest: _transform_request
                },
                //Pegar dados Usuario pelo ID
                get: {
                    method: 'GET',
                },
                //Editar cadastro de usuario
                update: {
                    method: 'PUT',
                    transformRequest: _transform_request
                },
                //Deletar usuario
                delete:{
                    method: 'DELETE',
                }
            });

        function _transform_request(data) {
            data = { "user": data }
            return angular.toJson(data);
        }

        return register;
    }

})();
