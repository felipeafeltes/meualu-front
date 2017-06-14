(function () {
    'use strict';

    angular
        .module('extraInfosServices', ['ngResource', 'ngRoute'])
        .factory('ExtraInfo', ExtraInfo);

        ExtraInfo.$inject = ['$resource'];

        function ExtraInfo($resource) {
            return $resource('http://localhost:3000/extra_infos');
        }

})();
