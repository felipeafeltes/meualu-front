(function () {
    'use strict';
    app.controller('OauthSessionsAuthenticate', OauthSessionsAuthenticate);

    function OauthSessionsAuthenticate($scope, $rootScope, $auth, $state, MySelf) {

        $scope.authenticate = function (provider) {
            $('#modalLogin').modal('hide');
            $rootScope.loadingDataPerfil = false;
            $auth.authenticate(provider)
                .then(function (response) {
                    localStorage.setItem('token', response.data.auth_token)
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
                }, function (response) {
                    toastr.error("Não foi possível completar o login do usuário");
                    $rootScope.loadingDataPerfil = true;
                })
        };
    }
})();
