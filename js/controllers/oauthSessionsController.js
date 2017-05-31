app.controller('OauthSessionsAuthenticate', OauthSessionsAuthenticate);

function OauthSessionsAuthenticate($scope, OauthUser, $rootScope) {
    $scope.user = new OauthUser();

    $scope.authenticate = function (provider) {
        // $auth.authenticate(provider,
        $scope.user.$authenticate({ provider: provider },
            // success
            function (data) {
                localStorage.setItem('token', data.auth_token)
                $rootScope.current_user = data.user;
                $('#modalLogin').modal('hide');
            },
            // error
            function (error) {
                _showValidationErrors($scope, error);
            }
        );
    };
}

function _showValidationErrors($scope, error) {
    $scope.validationErrors = [];
    if (error.status === 401 && error.data && angular.isObject(error.data)) {
        var errors = [];
        errors = error.data['errors'];
        for (i = 0; i < errors.length; i++) {
            $scope.validationErrors.push(errors[i]);
        }
    } else {
        $scope.validationErrors.push('Não foi possível completar o login do usuário');
    };
}
