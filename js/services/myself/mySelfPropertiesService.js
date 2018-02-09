(function () {
    'use strict';

    angular
        .module('myPropertiesService', ['ngResource', 'ngRoute'])
        .factory('myPropertie', myPropertie)
        .factory('mySelfVisitsLandlord', mySelfVisitsLandlord)
        .factory('mySelfVisitsRenter', mySelfVisitsRenter);

    myPropertie.$inject = ['$resource', 'config'];
    mySelfVisitsLandlord.$inject = ['$resource', 'config'];
    mySelfVisitsRenter.$inject = ['$resource', 'config'];

    function myPropertie($resource, config) {

        var myselfProperties = $resource(config.apiUrl + 'myself/properties',
            {}, {
                get: {
                    method: 'GET',
                },
            });


        return myselfProperties;
    }

    function mySelfVisitsLandlord($resource, config) {

        var myself = $resource(config.apiUrl + 'myself/visits/landlord',
            {}, {
                get: {
                    method: 'GET',
                },
            });


        return myself;
    }

    function mySelfVisitsRenter($resource, config) {

        var myself = $resource(config.apiUrl + 'myself/visits/renter',
            {}, {
                get: {
                    method: 'GET',
                },
            });


        return myself;
    }

})();
