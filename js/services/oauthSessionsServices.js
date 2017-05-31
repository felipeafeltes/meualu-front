(function () {
    'use strict';

    angular
        .module('oauthSessionsServices', ['ngResource', 'ngRoute'])
        .factory('OauthUser', OauthUser);

        OauthUser.$inject = ['$resource'];

        function OauthUser($resource) {
          return $resource('http://localhost:3000/auth/:provider',
              {}, {
              authenticate: {
                  method: 'GET'
              }
          });
        }

})();
