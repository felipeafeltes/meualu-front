(function () {
    'use strict';

    angular
        .module('contactClientsServices', ['ngResource', 'ngRoute'])
        .factory('contactClients', contactClients);

        contactClients.$inject = ['$resource', 'config'];

        function contactClients($resource, config) {
            var clients_contact = $resource(config.apiUrl + 'clients_contact',
                {},{
                save: {
                    method: 'POST',
                    transformRequest: _transform_request
                }
            });

          function _transform_request(data) {
              data = { "clients_contact" : data };
              return angular.toJson(data);
          }
          return clients_contact;
        }
})();
