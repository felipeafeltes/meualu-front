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
                    console.log("success")
                    localStorage.setItem('token', data.auth_token)
                    $rootScope.current_user = data.user;
                    $('#modalLogin').modal('hide');
                    $state.go('perfil.info');
                },
                // error
                function (error) {
                    console.log("error")
                    _showValidationErrors($scope, error);
                }
            );
        };

        //API COM GOOGLE LOGIN
        $scope.$on('event:google-plus-signin-success', function (event, authResult) {
            // Send login to server or save into cookie
            console.log(event)
            console.log(authResult)
        });
        $scope.$on('event:google-plus-signin-failure', function (event, authResult) {
            // Auth failure or signout detected
            console.log(event)
            console.log(authResult)
        });
        
    }

    function UserSessionsSignOut($scope, $rootScope, $state) {
        $scope.sign_out = function () {
            localStorage.removeItem('token');
            $rootScope.current_user = null;
        };
    }

    function UserSessionsRegister($scope, UsersService, $rootScope, $state) {
        $scope.dataUser = {};
        $scope.user = new UsersService();
        $scope.response = true;

        $scope.openLogin = function () {
            $('#modalLogin').modal('show');
        }

        $scope.register = function (isValid) {
            if (isValid) {
                $scope.response = false;
                $scope.user.$create(
                    // success
                    function (data) {
                        $scope.response = true;
                        console.log("success")
                    },
                    // error
                    function (error) {
                        $scope.response = true;
                        console.log("error")
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
