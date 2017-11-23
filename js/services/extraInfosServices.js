(function () {
    'use strict';
    angular
    .module('extraInfosServices', ['ngResource', 'ngRoute'])

    app.factory('ExtraInfo', ExtraInfo);    
    app.factory('ExtraInfoProperty', ExtraInfoProperty);    
    app.factory('ExtraInfoCondominium', ExtraInfoCondominium);  
    
    ExtraInfo.$inject = ['$resource', 'config']; 
    ExtraInfoProperty.$inject = ['$resource', 'config']; 
    ExtraInfoCondominium.$inject = ['$resource', 'config']; 
    
    function ExtraInfo($resource, config) {
        return $resource(config.apiUrl + 'extra_infos',{},{get: {method: 'GET'}});       
    }

    function ExtraInfoProperty($resource, config) {
        return $resource(config.apiUrl + 'extra_infos/property',{},{get: {method: 'GET'}});       
    }

    function ExtraInfoCondominium($resource, config) {
        return $resource(config.apiUrl + 'extra_infos/condominium',{},{get: {method: 'GET'}});       
    }

})();
