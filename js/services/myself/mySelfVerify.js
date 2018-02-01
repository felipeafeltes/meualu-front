(function () {
    'use strict';

    angular
        .module('verifyService', ['ngResource', 'ngRoute'])
        .factory('myselfVerify', myselfVerify);

    myselfVerify.$inject = ['$resource', 'config'];

    function myselfVerify($resource, config) {
        var verify = $resource(config.apiUrl + 'myself/verify', {},
            {
                put: {
                    method: 'PUT'
                }
            });

        return verify;
    }
})();
