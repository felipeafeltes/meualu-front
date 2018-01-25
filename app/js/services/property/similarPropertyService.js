(function () {
    'use strict';

    angular
        .module('similarPropertyService', ['ngResource', 'ngRoute'])
        .factory('SimilarService', SimilarService);

        SimilarService.$inject = ['$resource', 'config'];

    function SimilarService($resource, config) {
        var similars = $resource(config.apiUrl + 'properties/:id/similar',
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