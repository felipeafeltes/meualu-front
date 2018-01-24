(function () {
    'use strict';

    angular
        .module('similarPropertyService', ['ngResource', 'ngRoute'])
        .factory('Similar', Similar);

    Similar.$inject = ['$resource', 'config'];

    function Similar($resource, config) {
        var similars = $resource(config.apiUrl + '/properties/:id/similar',
            { id: '@id' },
            {
                get: {
                    method: 'GET',
                },
            }
        );
        return similars;
    }
})();