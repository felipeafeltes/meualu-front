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
            if (response.status === 401 || response.status === 403 || response.status === 422) {
                 $rootScope.validationErrors = [];
                 $rootScope.validationErrors.push(response.data.error);
            }            
             return $q.reject(response.data);
        }
    }
}
