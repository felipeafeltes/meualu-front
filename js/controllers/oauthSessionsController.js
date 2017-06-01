app.controller('OauthSessionsAuthenticate', OauthSessionsAuthenticate);

function OauthSessionsAuthenticate($scope, OauthUser, $rootScope, $auth) {
    $scope.user = new OauthUser();

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function(response) {
          localStorage.setItem('token', response.data.auth_token)
          $rootScope.current_user = response.data.user;
          $('#modalLogin').modal('hide');
        })
        .catch(function(error) {
          _showValidationErrors($scope, error);
        });
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
