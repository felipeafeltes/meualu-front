(function () {
  'use strict';

  angular
    .module('propertiesSearchServices', ['ngResource', 'ngRoute'])
    .factory('PropertySearch', PropertySearch);

  PropertySearch.$inject = ['$resource', 'config'];

  function PropertySearch($resource, config, $filter) {
    var propertySearch = $resource(config.apiUrl + 'properties/search/:address_string?geo_lat=:geo_lat&geo_lng=:geo_lng',
      { 
        address_string:'@address_string', 
        filters: '@filters',
        geo_lat:'@geo_lat',
        geo_lng:'@geo_lng' 
      },
      {
        get: {
          method: 'GET',
        },
      }
    );
    return propertySearch;
  }
})();
