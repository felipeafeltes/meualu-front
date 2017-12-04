(function () {
    'use strict';
    app.controller('profileController', profileController);

    function profileController($rootScope, UsersService, $scope, $state, $window) {
        $scope.hasData = false;
        $scope.profile = new UsersService();

        $('body').css('overflow', 'hidden');

        if ($rootScope.current_user !== undefined) {
            //DADOS DO USUARIO
            $scope.profile.$get(
                { id: $rootScope.current_user.id },
                function (data) {
                    $('body').css('overflow', 'auto');
                    console.log(data)
                    $scope.hasData = true;
                    $rootScope.user = data.renter;
                    ($rootScope.user.birthday !== null) ? $rootScope.user.birthday = new Date(data.renter.birthday) : '';
                },
            );
        }else{
            toastr.error("Sessão inválida. Efetue o login novamente!");
            $('body').css('overflow', 'auto');
            $state.go('home');
        }

    }
})()
