(function () {
    'use strict';

    angular
        .module('oauthSessionsServices', ['ngResource', 'ngRoute'])
        .factory('OauthUser', OauthUser);

        OauthUser.$inject = ['$resource', 'config'];

        function OauthUser($resource, config) {
          return $resource(config.apiUrl + 'auth/:provider',
              {}, {
              authenticate: {
                  method: 'GET'
              }
          });
        }

})();
