(function () {
    'use strict';
    app.controller('UserSessionsSignIn', UserSessionsSignIn);
    app.controller('UserSessionsSignOut', UserSessionsSignOut);
    app.controller('UserSessionsRegister', UserSessionsRegister);



    function UserSessionsSignIn($scope, User, $rootScope, $state, $http, MySelf) {
        $scope.user = new User();

        $scope.openRegister = function () {
            $('#modalLogin').modal('hide');
        }

        $scope.sign_in = function (isValid) {
            if (isValid) {
                User.sign_in($scope.user)
                    .$promise.then(
                    function (response) {
                        localStorage.setItem('token', response.auth_token)
                        $rootScope.current_user = response.user;
                        MySelf.get(
                            {},
                            function (data) {
                                $('#modalLogin').modal('hide');
                                $state.go('perfil.info');
                            },
                        );
                    },
                    function (data) {
                        if (data.errors !== undefined) { toastr.error(data.errors[0]) }
                        else { toastr.warning(data.error) }
                    }
                )
            }
        }
        /*                 //API COM GOOGLE LOGIN
                $scope.$on('event:google-plus-signin-success', function (event, authResult) {
                    // Send login to server or save into cookie
                    console.log(event)
                    console.log(authResult)
                });
                $scope.$on('event:google-plus-signin-failure', function (event, authResult) {
                    // Auth failure or signout detected
                    console.log(event)
                    console.log(authResult)
                });  */
    }

    function UserSessionsSignOut($scope, $rootScope, $state) {
        $scope.sign_out = function () {
            localStorage.removeItem('token');
            $rootScope.current_user = null;
            $state.go('home');
        };
    }

    function UserSessionsRegister($scope, User, UsersService, $rootScope, $state) {
        $scope.dataUser = {};
        $scope.user = new UsersService();
        $scope.response = true;

        $scope.openLogin = function () {
            $('#modalLogin').modal('show');
        }

        $scope.register = function (isValid) {
            if (isValid) {
                $scope.response = false;
                $scope.registered = false;
                $scope.user.birthday = $scope.day_birthday + '-' + $scope.month_birthday + '-' + $scope.year_birthday;
                UsersService.create($scope.user)
                    .$promise.then(
                    // success
                    function (success) {
                        toastr.success("Cadastrado com sucesso!");
                        $scope.response = true;
                        $scope.registered = true;
                    },
                    // error
                    function (data) {
                        let validations = data.errors;
                        let error;
                        if (validations.email) {
                            error = 'Email ' + validations.email[0];
                        }
                        toastr.error(error);
                        $scope.response = true;
                    }
                    );
            }
        };
    }

})()

