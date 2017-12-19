(function () {
    'use strict';
    app.controller('profileController', profileController);

    function profileController($rootScope, MySelf, $scope, $state, $window) {
        if ($rootScope.current_user === undefined || $rootScope.current_user === null) {
            if (localStorage.getItem('token')) {
                $scope.hasData = false;
                $('body').css('overflow', 'hidden');
                //DADOS DO USUARIO
                MySelf.get(
                    {},
                    function (data) {
                        $('body').css('overflow', 'auto');
                        $scope.hasData = true;
                        $rootScope.current_user = data.renter;
                        ($rootScope.current_user.birthday !== null) ? $rootScope.current_user.birthday = new Date(data.renter.birthday) : '';
                    },
                );
            }
        }else{
            $scope.hasData = true;
        }
    }
})()
