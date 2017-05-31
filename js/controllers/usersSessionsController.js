app.controller('UserSessionsSignIn', UserSessionsSignIn);
app.controller('UserSessionsSignOut', UserSessionsSignOut);

function UserSessionsSignIn($scope, User, $rootScope, $state) {
    $scope.user = new User();

    $scope.sign_in = function () {
        $scope.user.$sign_in(
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

function UserSessionsSignOut($scope, User, $rootScope, $state) {
    localStorage.removeItem('token');
    $rootScope.current_user = null;
    $state.go('sign_in');
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
