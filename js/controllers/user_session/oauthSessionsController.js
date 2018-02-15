(function () {
    'use strict';
    app.controller('OauthSessionsAuthenticate', OauthSessionsAuthenticate);

    function OauthSessionsAuthenticate($scope, $rootScope, $auth, $state) {

        $scope.authenticate = function (provider) {
            $('#modalLogin').modal('hide');
            $rootScope.loadingDataPerfil = false;
            $auth.authenticate(provider)
                .then(function (response) {
                    localStorage.setItem('token', response.data.auth_token)
                    $rootScope.current_user = response.data.user;
                    $state.go('perfil.info');
                    $rootScope.loadingDataPerfil = true;
                }, function (response) {
                    toastr.error("Não foi possível completar o login do usuário");
                    $rootScope.loadingDataPerfil = true;
                })
        };
    }
})();
