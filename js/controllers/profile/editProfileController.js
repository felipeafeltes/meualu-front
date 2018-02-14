(function () {
    'use strict';
    app.controller('editProfileController', editProfileController);

    function editProfileController($rootScope, UpdateUsersService, $scope, $state, $http, viaCep) {
        $scope.response = true;

        setTimeout(function () {
            $scope.user = $rootScope.current_user;
            $scope.$apply();
        }, 400);

        $scope.sexOptions = [{
            value: 'male',
            label: 'Masculino',
        }, {
            value: 'female',
            label: 'Feminino',
        }];

        $scope.days = [];
        $scope.months = [
            { id: 1, name: 'Janeiro' },
            { id: 2, name: 'Fevereiro' },
            { id: 3, name: 'Março' },
            { id: 4, name: 'Abril' },
            { id: 5, name: 'Maio' },
            { id: 6, name: 'Junho' },
            { id: 7, name: 'Julho' },
            { id: 8, name: 'Agosto' },
            { id: 9, name: 'Setembro' },
            { id: 10, name: 'Outubro' },
            { id: 11, name: 'Novembro' },
            { id: 12, name: 'Dezembro' }
        ];
        $scope.years = [];
        for (let i = 1; i <= 31; i++) {
            $scope.days.push(i);

        }

        for (let i = new Date().getFullYear(); i >= 1918; i--) {
            $scope.years.push(i);
        }

        $scope.myImage = '';
        $scope.myCroppedImage = '';
        $scope.hasImage = false;

        var handleFileSelect = function (evt) {
            var file = evt.currentTarget.files[0];
            var reader = new FileReader();
            reader.onload = function (evt) {
                $scope.$apply(function ($scope) {
                    $scope.myImage = evt.target.result;
                    $scope.hasImage = true;
                });
            };
            reader.readAsDataURL(file);
        };
        angular.element(document.querySelector('#fileInput')).on('change', handleFileSelect);


        $scope.edit = function (isValid) {
            if (isValid) {
                if ($scope.hasImage) {
                    $scope.user.picture_base64 = $scope.myCroppedImage;
                }
                $scope.user.birthday = $scope.user.day_birthday + '-' + $scope.user.month_birthday + '-' + $scope.user.year_birthday;
                $scope.response = false;
                UpdateUsersService.update($scope.user).$promise.then(
                    function (data) {
                        $scope.response = true;
                        if ($scope.hasImage) {
                            $rootScope.current_user.picture_url = $scope.myCroppedImage;
                        }
                        $rootScope.current_user.profile_completed = true;
                        toastr.success("Cadastro atualizado!");
                    },
                    function (err) {
                        if (err.status) {
                            if (err.status === 500) {
                                toastr.error("Serviço indisponivel, tente novamente!")
                            }
                        } else {
                            toastr.error(err.errors)
                        }

                    }
                );
            } else {
                toastr.warning("Preenche todos os campos!");
            }
        };

        $scope.searchCep = function (cepValue) {
            if (cepValue !== undefined) {
                if (cepValue.length === 8) {
                    toastr.info("Procurando CEP...")
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', 'https://viacep.com.br/ws/' + cepValue + '/json/');
                    xhr.addEventListener('load', function () {
                        var ceps = xhr.responseText;
                        var cep = JSON.parse(ceps);
                        $scope.user.address.city = cep.localidade;
                        $scope.user.address.complement = cep.complemento;
                        $scope.user.address.country = 'Brasil';
                        $scope.user.address.district = cep.bairro;
                        $scope.user.address.number = cep.gia;
                        $scope.user.address.state = cep.uf;
                        $scope.user.address.street = cep.logradouro;
                    });
                    xhr.send();
                }
            }
        }
    }
})();