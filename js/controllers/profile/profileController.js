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
                        $scope.hasData = true;
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
                            $rootScope.current_user.verified = true;
                            toastr.success("Conta verificada com sucesso!");
                        }
                    )
                }, function (err) {
                    toastr.error("Erro ao verificar a conta, tente novamente!");
                });
        }

    }
})();
