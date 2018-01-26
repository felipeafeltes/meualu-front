(function () {
    'use strict';
    app.controller('profileController', profileController);

    function profileController($rootScope, MySelf, $scope, $state, $window) {
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
        
    }
})();
