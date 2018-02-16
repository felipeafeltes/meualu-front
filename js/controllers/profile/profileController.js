(function () {
    'use strict';
    app.controller('profileController', profileController);

    function profileController($rootScope, MySelf, $scope, $state, $window, $accountKit, myselfVerify) {

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
