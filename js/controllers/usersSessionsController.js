(function () {
    'use strict';
    app.controller('UserSessionsSignIn', UserSessionsSignIn);
    app.controller('UserSessionsSignOut', UserSessionsSignOut);
    app.controller('UserSessionsRegister', UserSessionsRegister);

    function UserSessionsSignIn($scope, User, $rootScope, $state) {
        $scope.user = new User();

        $scope.openRegister = function () {
            $('#modalLogin').modal('hide');
        }

    
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
                    console.log(error)
                    _showValidationErrors($scope, error);
                }
            );
        };
    }

    function UserSessionsSignOut($scope, $rootScope, $state) {
        $scope.sign_out = function () {
            localStorage.removeItem('token');
            $rootScope.current_user = null;
        };
    }

    function UserSessionsRegister($scope, UsersService , $rootScope, $state) {
        $scope.dataUser = {};
        $scope.user = new UsersService();
        $scope.response = true;

        $scope.openLogin = function () {
            $('#modalRegister').modal('hide');
        }

        $scope.register = function (isValid) {
            if (isValid) {
                $scope.response = false;
                $scope.user.$create(
                    // success
                    function (data) {
                        $scope.response = true;
                        console.log(data)
                    },
                    // error
                    function (error) {
                        $scope.response = true;
                        console.log(error)
                        _showValidationErrors($scope, error);
                    }
                );
            }
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
})()
