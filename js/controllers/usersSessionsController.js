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
                        localStorage.setItem('token', response.auth_token);
                        $('#modalLogin').modal('hide');
                        $state.go('perfil.info');
                    },
                    function (data) {
                        if (data.errors !== undefined) { toastr.error(data.errors[0]) }
                        else { toastr.warning(data.error) }
                    }
                    )
            }
        }

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

        $scope.days = [];
        $scope.months = [
            { val: 1, name: 'Janeiro' },
            { val: 2, name: 'Fevereiro' },
            { val: 3, name: 'Março' },
            { val: 4, name: 'Abril' },
            { val: 5, name: 'Maio' },
            { val: 6, name: 'Junho' },
            { val: 7, name: 'Julho' },
            { val: 8, name: 'Agosto' },
            { val: 9, name: 'Setembro' },
            { val: 10, name: 'Outubro' },
            { val: 11, name: 'Novembro' },
            { val: 12, name: 'Dezembro' }
        ];
        $scope.years = [];

        for (let i = 1; i <= 31; i++) {
            $scope.days.push(i);
        }

        for (let i = new Date().getFullYear(); i >= 1918; i--) {
            $scope.years.push(i);
        }


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
                        localStorage.setItem('token', success.meta.auth_token);
                        $('#modalLogin').modal('hide');
                        $state.go('perfil.info');
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

