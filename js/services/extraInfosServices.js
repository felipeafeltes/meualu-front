(function () {
    'use strict';

    angular
        .module('extraInfosServices', ['ngResource', 'ngRoute'])
        .factory('ExtraInfo', ExtraInfo);

        ExtraInfo.$inject = ['$resource', 'config'];

        function ExtraInfo($resource, config) {
            return $resource(config.apiUrl + 'extra_infos');
        }

})();
