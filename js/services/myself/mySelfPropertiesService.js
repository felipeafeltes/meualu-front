(function () {
    'use strict';

    angular
        .module('myPropertiesService', ['ngResource', 'ngRoute'])
        .factory('myPropertie', myPropertie)
        .factory('mySelfVisits', mySelfVisits);

    myPropertie.$inject = ['$resource', 'config'];
    mySelfVisits.$inject = ['$resource', 'config'];

    function myPropertie($resource, config) {

        var myselfProperties = $resource(config.apiUrl + 'myself/properties',
            {}, {
                get: {
                    method: 'GET',
                },
            });


        return myselfProperties;
    }

    function mySelfVisits($resource, config) {

        var myself = $resource(config.apiUrl + 'myself/visits',
            {}, {
                get: {
                    method: 'GET',
                },
            });


        return myself;
    }

})();
