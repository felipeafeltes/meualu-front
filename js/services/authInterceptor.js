app.factory('authInterceptor', authInterceptor);

authInterceptor.$inject = ['$rootScope', '$q', '$state']

function authInterceptor($rootScope, $q, $state){
    return {
        request: function(config) {
            config.headers = config.headers || {};
            if(localStorage.token){
                config.headers.authorization = 'Bearer ' + localStorage.token;
            }
            return config;
        },

        responseError: function(response) {
             return $q.reject(response.data);
        }
    }
}
