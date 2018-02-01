(function () {
    'use strict';
    app.controller('profileController', profileController);

    function profileController($rootScope, MySelf, $scope, $state, $window, $accountKit, myselfVerify) {
        if ($rootScope.current_user === undefined || $rootScope.current_user === null || $rootScope.current_user.id) {
            if (localStorage.getItem('token')) {
                $scope.hasData = false;
                //DADOS DO USUARIOO
                MySelf.get(
                    {},
                    function (data) {
                        $scope.hasData = true;
                        $rootScope.current_user = data.renter;
                        ($rootScope.current_user.birthday !== null) ? $rootScope.current_user.birthday = new Date(data.renter.birthday) : '';
                    },
                );
            }
        }

        $scope.verifyAccount = function () {
            $accountKit.loginWithSMS()
                .then(
                function (res) {
                    myselfVerify.put(
                        { code: res.code },
                        function (data) {
                            toastr.success("Conta verificada com sucesso!");
                        }
                    )
                }, function (err) {
                    toastr.error("Erro ao verificar a conta, tente novamente!");
                });
        }

    }
})();
