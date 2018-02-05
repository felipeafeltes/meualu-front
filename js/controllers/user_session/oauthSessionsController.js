(function () {
    'use strict';
    app.controller('OauthSessionsAuthenticate', OauthSessionsAuthenticate);

    function OauthSessionsAuthenticate($scope, $rootScope, $auth, $state) {

        $scope.authenticate = function (provider) {
            $auth.authenticate(provider)
                .then(function (response) {
                    localStorage.setItem('token', response.data.auth_token)
                    $rootScope.current_user = response.data.user;
                    $('#modalLogin').modal('hide');
                    $state.go('perfil.info');
                }, function (response) {
                    toastr.error("Não foi possível completar o login do usuário");
                })
        };
    }
})();
