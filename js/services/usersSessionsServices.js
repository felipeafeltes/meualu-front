(function () {
    'use strict';

    angular
        .module('usersSessionServices', ['ngResource', 'ngRoute'])
        .factory('User', User);

        User.$inject = ['$resource', 'config'];

        function User($resource, config) {
          return $resource(config.apiUrl + 'users/sign_in',
              { id:'@id' }, {
              sign_in: {
                  method: 'POST',
                  transformRequest: _transform_request
              }
          });

          function _transform_request(data) {
              data = { "user" : data }
              return angular.toJson(data);
          }
        }

})();
