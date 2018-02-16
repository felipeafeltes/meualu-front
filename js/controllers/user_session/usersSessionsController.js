(function () {
    'use strict';
    app.controller('UserSessionsSignIn', UserSessionsSignIn);
    app.controller('UserSessionsSignOut', UserSessionsSignOut);
    app.controller('UserSessionsRegister', UserSessionsRegister);
    app.controller('UserResetPassword', UserResetPassword);
    app.controller('UserRecoverPassword', UserRecoverPassword);
    app.controller('UserConfirm', UserConfirm);

    function UserSessionsSignIn($scope, User, $rootScope, $uibModal, $state, $http, MySelf) {
        $scope.user = new User();

        $scope.openRegister = function () {
            $('#modalLogin').modal('hide');
        }

        $scope.openRecover = function () {
            $('#modalLogin').modal('hide');
            $('#modalRecover').modal('show');
        }

        $scope.sign_in = function (isValid) {
            if (isValid) {
                User.sign_in($scope.user)
                    .$promise.then(
                    function (response) {
                        localStorage.setItem('token', response.auth_token);
                        $('#modalLogin').modal('hide');
                        $rootScope.loadingDataPerfil = false;
                        MySelf.get(
                            {},
                            function (data) {
                                if (data.user) {
                                    $rootScope.current_user = data.user;
                                    if ($rootScope.current_user.birthday !== null) {
                                        var d = new Date(data.user.birthday);
                                        var day = (d.getDate() + 1);
                                        var month = (d.getMonth() + 1);
                                        var year = d.getFullYear();
                                        $rootScope.current_user.day_birthday = day;
                                        $rootScope.current_user.month_birthday = parseInt(month);
                                        $rootScope.current_user.year_birthday = year;
                                        $rootScope.current_user.birthday = `${day}/${month}/${year}`;
                                    }
                                }
                                $rootScope.loadingDataPerfil = true;
                            },
                        );
                    },
                    function (data) {
                        if (data.errors !== undefined) { toastr.error(data.errors[0]) }
                        else { toastr.warning(data.error) }
                        $rootScope.loadingDataPerfil = true;
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

    function UserConfirm($scope, $state, $stateParams, ConfirmAccountService, $location) {
        ConfirmAccountService.get(
            { token: $location.search().confirmation_token },
            function (data) {
                $state.go('home');
                toastr.success("Conta confirmada, faça login!");
            }, function (data) {
                toastr.error(data.message);
                $state.go('home');
            }
        )

    }

    function UserResetPassword($scope, RecoverService) {
        $scope.email;
        $scope.response = true;
        $scope.recover = function (isValid) {
            if (isValid) {
                $scope.response = false;
                RecoverService.recover(
                    { email: $scope.email },
                    function (data) {
                        $('#modalRecover').modal('hide');
                        toastr.info("Link de recuperação enviado ao e-mail.");
                        $scope.response = true;
                    },
                    function (data) {
                        toastr.error("Email não existe.")
                    }
                )
            }
        }
    }

    function UserRecoverPassword($scope, RecoverService, $stateParams, $state) {
        $scope.user = {
            password: '',
            passwordConfirm: ''
        }
        $scope.response = true;
        $scope.recover = function (isValid) {
            if (isValid) {
                $scope.respons = false;
                RecoverService.reset(
                    {
                        token: $stateParams.token,
                        password: $scope.user.password,
                        password_confirmation: $scope.user.passwordConfirm
                    },
                    function (data) {
                        $state.go('home');
                        toastr.success("Senha Atualizada!")
                        $scope.response = true;
                    },
                    function (data) {
                        toastr.error("Erro ao trocar de senha, por favor pessa uma nova redefinição!")
                    }
                )
            }
        }

        $scope.openLogin = function () {
            $("#modalLogin").modal('show');
        }
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

        $scope.sexOptions = [{
            value: 'male',
            label: 'Masculino',
        }, {
            value: 'female',
            label: 'Feminino',
        }];

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
                        toastr.info("Cadastrado efetuado, enviamos um e-mail para o endereço informado, por favor confime sua conta!");
                        $('#modalLogin').modal('hide');
                        $state.go('home');
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

})();

