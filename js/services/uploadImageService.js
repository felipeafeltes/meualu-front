(function () {
    'use strict';
    angular
    .module('uploadImageService', ['ngResource', 'ngRoute'])
    
    app.factory('ImageService', ImageService);    
    
    ImageService.$inject = ['$resource', 'config']; 
    
    
    function ImageService($resource, config) {
        var image = $resource(config.apiUrl + 'pictures/:id',{ id:'@id'},
        {
            upload: 
            {
                method: 'POST',
                transformRequest: _transform_request
            },
            delete:
            {
                method: 'DELETE'
            }
        });       

        function _transform_request(data) {
            data = { "pictures": data }
            return angular.toJson(data);
        }
        
        return image;
    }
    
})();
