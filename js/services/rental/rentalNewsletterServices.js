(function () {
    'use strict';

    angular
        .module('rentalNewsletterServices', ['ngResource', 'ngRoute'])
        .factory('rentalNewsletter', rentalNewsletter);

        rentalNewsletter.$inject = ['$resource', 'config'];

        function rentalNewsletter($resource, config) {
            var rental_newsletter = $resource(config.apiUrl + 'rental_newsletter',
                {},{
                save: {
                    method: 'POST',
                    transformRequest: _transform_request
                }
            });

          function _transform_request(data) {
              data = { "rental_newsletter" : data };
              return angular.toJson(data);
          }
          return rental_newsletter;
        }
})();
