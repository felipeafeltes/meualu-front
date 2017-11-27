(function () {
    'use strict';

    angular
        .module('myPropertiesService', ['ngResource', 'ngRoute'])
        .factory('myPropertie', myPropertie);

        myPropertie.$inject = ['$resource', 'config'];

    function myPropertie($resource, config) {

        var myselfProperties = $resource(config.apiUrl + 'myself/properties',
            {}, {
                get: {
                    method: 'GET',
                },
            });


        return myselfProperties;
    }

})();
