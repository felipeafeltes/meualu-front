(function () {
  'use strict';

  angular
    .module('propertiesSearchServices', ['ngResource', 'ngRoute'])
    .factory('PropertySearch', PropertySearch);

  PropertySearch.$inject = ['$resource', 'config'];

  function PropertySearch($resource, config, $filter) {
    var propertySearch = $resource(config.apiUrl + 'properties/search/:address_string',
      { address_string:'@address_string' },
      {
        get: {
          method: 'GET',
        },
      }

    );

    return propertySearch;

  }

})();
