(function () {
    'use strict';
    app.controller('profileController', profileController);

    function profileController($rootScope, MySelf, $scope, $state, $window) {
        $scope.hasData = false;
        $('body').css('overflow', 'hidden');
        //DADOS DO USUARIO
        if ($rootScope.current_user === undefined) {
            MySelf.get(
                {},
                function (data) {
                    $('body').css('overflow', 'auto');
                    $scope.hasData = true;
                    $rootScope.current_user = data.renter;
                    ($rootScope.current_user.birthday !== null) ? $rootScope.current_user.birthday = new Date(data.renter.birthday) : '';
                },
            );
        }else{
            $scope.hasData = true;
        }

    }
})()
