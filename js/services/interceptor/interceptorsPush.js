(function(){
    'use strict';

    angular
        .module('aluFrontApp')

        .config(interceptorPush);

        interceptorPush.$inject = ['$httpProvider']

        function interceptorPush($httpProvider){
            $httpProvider.interceptors.push('authInterceptor');
        }
})();
