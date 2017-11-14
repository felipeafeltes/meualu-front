(function () {
    'use strict';

    angular
        .module('myPropertiesService', ['ngResource', 'ngRoute'])
        .factory('myPropertiesService', myPropertiesService);

        myPropertiesService.$inject = ['$resource', 'config'];

    function myPropertiesService($resource, config) {

        var myselfProperties = $resource(config.apiUrl + '/myself/properties/:token',
            {token:'@token'}, {
                //Pegar dados Usuario pelo ID
                get: {
                    method: 'GET',
                },
                //Deletar usuario
                delete:{
                    method: 'DELETE',
                }
            });


        return myselfProperties;
    }

})();
