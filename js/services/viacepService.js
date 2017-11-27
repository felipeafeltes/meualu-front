(function () {
    'use strict';

    angular
        .module('viacepService', ['ngResource', 'ngRoute'])
        .factory('Viacep', Viacep);

    Viacep.$inject = ['$resource', 'config'];

    function Viacep($resource, config) {

        return $resource('https://viacep.com.br/ws/:cep/json',
            { cep: '@cepValue' }, {
                get: {
                    method: 'GET',
                    headers: {
                        'Access-Control-Allow-Headers':'*',
                        'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
                    }
                },

            });
    }

})();
