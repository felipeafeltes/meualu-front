(function () {
    'use strict';
    
    angular
    .module('propertiesServices', ['ngResource', 'ngRoute'])
    .factory('PropertyService', PropertyService);
    
    PropertyService.$inject = ['$resource', 'config'];
    
    function PropertyService($resource, config) {
        var property = $resource(config.apiUrl + 'properties/:id', 
        {"id":"@id"},
        {
            get: {
                method: 'GET',
            },
            save: {
                method: 'POST',
                transformRequest: _transform_request
            },
            update: {
                method: 'PATCH',
                transformRequest: _transform_request
            },
            delete:{
                method: 'DELETE'
            }
        }
    );
    
    function _transform_request(data) {
        data = { "property" : data }
        return angular.toJson(data);
    }

    return property;
}

})();
