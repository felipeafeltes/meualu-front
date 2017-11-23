(function () {
    'use strict';
    app.controller('editProfileController', editProfileController);

    function editProfileController($rootScope, UsersService, $scope, $state) {
        $scope.response = true;
        $scope.user = new UsersService();
        $scope.user = $rootScope.user;
        $scope.edit = function (isValid) {
            if (isValid) {
                $scope.response = false;
                $scope.user.$update(
                    function (data) {
                        $scope.response = true;
                        console.log(data)
                    },
                    function (err){
                        console.log(err)
                    }
                );
            }
        };
    }
})()
