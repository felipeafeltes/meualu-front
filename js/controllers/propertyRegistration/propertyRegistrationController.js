(function () {
    'use strict';

    app.controller('propertyRegistrationController', propertyRegistrationController);

    function propertyRegistrationController(
        $rootScope,
        $scope,
        $state,
        $uibModal,
        config,
        ExtraInfo,
        ExtraInfoProperty,
        ExtraInfoCondominium,
        PropertyRentalService,
        PropertyService,
        ImageService,
    ) {
        //IMAGE CROPPER
        $scope.cropper = {};
        $scope.cropper.sourceImage = null;
        $scope.cropper.croppedImage = null;
        $scope.bounds = {};
        $scope.bounds.left = 0;
        $scope.bounds.right = 0;
        $scope.bounds.top = 0;
        $scope.bounds.bottom = 0;
        //PROPERTY VARS
        $scope.propertie = new PropertyService();
        $scope.propertie.type = 'Apartamento';
        $scope.sendForm = false;
        $scope.readTerms = false;
        //ENDERECO
        $scope.formAddress = {};
        $rootScope.addressSended;
        //IMAGES UPLOADED
        $scope.thumbailImages = [];
        $scope.images = [];
        $scope.uploadedImage = false;
        $scope.acceptTerms = false;
        //EXTRA INFOS
        $scope.propertyInfos;
        $scope.condominiumInfos;

        if (!$rootScope.current_user.profile_completed) {
            toastr.warning("Necessário completar o perfil!");
            $state.go('perfil.editar');
        }

        ExtraInfoProperty.get().$promise.then(
            function (data) {
                $scope.propertyInfos = data.extra_infos;
            }
        );
        ExtraInfoCondominium.get().$promise.then(
            function (data) {
                $scope.condominiumInfos = data.extra_infos;
            }
        );

        $scope.infos = [];
        $scope.widthActiveLine = $('#activeLine').width();
        $scope.fillAddress = false;
        $scope.fillDetails = false;
        $scope.fillAdvertisement = false;
        $scope.fillRental = false;
        $scope.fillImages = false;

        $scope.date = {
            day: null,
            month: null,
            year: null
        }
        $scope.invalidDateMoving = false;

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

        for (let i = new Date().getFullYear() + 50; i >= new Date().getFullYear(); i--) {
            $scope.years.push(i);
        }

        // Toggle selection checkbox list
        $scope.toggleSelection = function toggleSelection(extraInfo, checkbox1) {
            let check;
            $scope.infos.forEach(function (element) {
                if (element.$$hashKey === extraInfo.$$hashKey) {
                    $scope.infos.splice($scope.infos.indexOf(element), 1);
                    check = true;
                }
            }, this);
            if (!check) {
                $scope.infos.push(extraInfo.id);
            }
        };

        //Aluguel
        $scope.rental = {};
        $scope.rentalResponse;
        $scope.rental.iptu_type = 'Anual';
        $scope.rental.iptu = '0,00'
        $scope.checked = false;
        $scope.iptuSelect = function () {
            if ($scope.rental.iptu_included === true) {
                $scope.rental.iptu = '0,00';
            }
        };

        $scope.checkValue = function (isValid) {
            $scope.checked = true;
            if (isValid) {
                var value = $scope.rental.value.replace('.', '').replace(',', '.');
                var condominium = $scope.rental.condominium.replace('.', '').replace(',', '.');
                var iptu = $scope.rental.iptu;
                (iptu === undefined) ? $scope.rental.iptu = '0,00' : iptu.replace('.', '').replace(',', '.');
                var dataPost = {
                    value: value,
                    condominium: condominium,
                    iptu: iptu
                }
                PropertyRentalService.query(
                    { rental: dataPost },
                    function (response) {
                        $scope.first_alu_fee = response.rental.first_alu_fee
                        $scope.first_net_value = response.rental.first_net_value
                        $scope.others_alu_fee = response.rental.others_alu_fee
                        $scope.others_net_value = response.rental.others_net_value
                        $scope.package_value = response.rental.package_value
                        $scope.rentalResponse = response.rental;
                        $scope.checked = false;
                    })
            }
        }


        //Proceessamento de cada parte do wizard

        $scope.processForm = function (isValid) {
            if (isValid) {
                $('#loadingModal').modal({ backdrop: 'static', keyboard: false, show: true });
                $scope.sendForm = false;
                $rootScope.addressSended.country = 'Brasil';
                $scope.propertie.address = $rootScope.addressSended;
                $scope.propertie.extra_infos = $scope.infos;
                $scope.propertie.rental = $scope.rentalResponse;
                $scope.propertie.pictures = $scope.images;

                $scope.propertie.$save(
                    function (data) {
                        $('#loadingModal').modal('hide');
                        toastr.success('Imóvel cadastrado com sucesso!');
                        $state.go('perfil.info');
                    },
                    function (data) {
                        $('#loadingModal').modal('hide');
                        toastr.error('Campos obrigatórios não podem ficar em branco!');
                    }
                );
            } else {
                toastr.error("Você esqueceu campos obrigatórios!")
            }
        }

        $scope.processRental = function (isValid) {
            $scope.fillRental = true;
            if (isValid) {
                if (!$scope.checked) {
                    $scope.checkValue(isValid);
                }
                $('#rentalForm').addClass('completed');
                WizardLine();
                $rootScope.processedRental = true;
                $state.go('perfil.cadastrarImovel.images');
                $("html, body").animate({ scrollTop: 100 }, "slow");
            } else {
                toastr.warning('Campos obrigatórios precisam ser preenchidos!');
            }

        }

        $scope.processAdvertisement = function (isValid) {
            $scope.fillAdvertisement = true;

            if (!$scope.propertie.moving_house_available || $scope.propertie.moving_house_available == undefined) {
                $scope.propertie.moving_house_date = $scope.date.year + '-' + $scope.date.month + '-' + $scope.date.day;
                var actDate = new Date();
                var movingDate = new Date($scope.propertie.moving_house_date);
                if (movingDate > actDate) {
                    $scope.invalidDateMoving = false;
                } else {
                    $scope.invalidDateMoving = true;
                }
            }

            if (isValid && !$scope.invalidDateMoving) {
                $('#advertisementForm').addClass('completed');
                WizardLine();
                $rootScope.processedAdvertisement = true;
                $state.go('perfil.cadastrarImovel.rental');
                $("html, body").animate({ scrollTop: 100 }, "slow");
            } else {
                toastr.warning('Campos obrigatórios precisam ser preenchidos!');
            }

        }

        $scope.processImages = function () {
            if ($scope.images.length === 0) {
                toastr.warning('Necessário pelo menos uma foto!');
            } else {
                $scope.fillImages = true;
                $('#imagesForm').addClass('completed');
                WizardLine();
                $rootScope.processedImages = true;
                $state.go('perfil.cadastrarImovel.terms');
                $("html, body").animate({ scrollTop: 100 }, "slow");
            }
        }

        $scope.processAdress = function (isValid) {
            $scope.fillAddress = true;
            if (isValid) {
                $rootScope.addressSended = $scope.formAddress;
                $rootScope.processedAddress = true;
                $('#addressForm').addClass('completed');
                WizardLine();
                $state.go('perfil.cadastrarImovel.details');
                $("html, body").animate({ scrollTop: 100 }, "slow");
            } else {
                toastr.warning('Campos obrigatórios precisam ser preenchidos!');
            }
        }

        $scope.processDetails = function (isValid) {
            $scope.fillDetails = true;
            if (isValid) {
                $('#detailsForm').addClass('completed');
                WizardLine();
                $rootScope.processedDetails = true;
                $state.go('perfil.cadastrarImovel.advertisement');
                $("html, body").animate({ scrollTop: 100 }, "slow");
            } else {
                toastr.warning('Campos obrigatórios precisam ser preenchidos!');
            }
        }

        $scope.backForm = function () {
            BackWiazardLine();
            $("html, body").animate({ scrollTop: 100 }, "slow");
        }

        $scope.disabledDate = function () {
            if ($scope.propertie.moving_house_available) {
                $scope.invalidDateMoving = false;
                $scope.date.day = null;
                $scope.date.month = null;
                $scope.date.year = null;
                $scope.propertie.moving_house_date = undefined;
            }
        }

        //ENDERECO
        $scope.searchCep = function (cepValue) {
            if (cepValue !== undefined) {
                if (cepValue.toString().length === 8) {
                    toastr.info("Procurando CEP...")
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', 'https://viacep.com.br/ws/' + cepValue + '/json/');
                    xhr.addEventListener('load', function () {
                        var ceps = xhr.responseText;
                        var data = JSON.parse(ceps);
                        $scope.formAddress.city = data.localidade;
                        $scope.formAddress.complement = data.complemento;
                        $scope.formAddress.country = 'Brasil';
                        $scope.formAddress.district = data.bairro;
                        $scope.formAddress.number = data.gia;
                        $scope.formAddress.state = data.uf;
                        $scope.formAddress.street = data.logradouro;
                        $scope.$apply();
                    });
                    xhr.send();
                }
            }
        }

        //IMAGENS
        //SAVE
        $scope.saveImage = function () {
            $scope.uploadedImage = true;
            if ($scope.cropper.croppedImage !== null) {
                let dataPost = {
                    cover: false,
                    content: $scope.cropper.croppedImage

                }
                ImageService.save(dataPost).$promise.then(
                    function (data) {
                        $scope.uploadedImage = false;
                        $('#croppImage').modal('hide');
                        $scope.images.push({ id: data.picture.id, url: data.picture.url, cover: false });
                        $scope.thumbailImages.push({ id: data.picture.id, url: $scope.cropper.croppedImage })
                        toastr.success('Upload concluído');
                    }
                )

            }
        }
        //DELETE
        $scope.deleteImage = function (i, idImage) {
            ImageService.delete({ 'id': idImage }).$promise.then(
                function (data) {
                    $scope.images.splice(i, 1);
                    $scope.thumbailImages.splice(i, 1);
                    toastr.info('Imagem removida!');
                }
            )
        }

        //ANUNCIO
        $scope.countCaracteres = function (value) {
            if (value !== undefined) {
                if (value.length > 240) {
                    return 0;
                } else {
                    return (value.length > 1) ? 240 - value.length : 240;
                }
            } else {
                return 240;
            }
        }
        //TERMOS
        $scope.readedTerms = function () {
            $scope.readTerms = true;
        }

        function WizardLine() {
            var lineW = $('#activeLine').width();
            $('#activeLine').width(lineW + $scope.widthActiveLine);
        }

        function BackWiazardLine() {
            var lineW = $('#activeLine').width();
            $('#activeLine').width(lineW - $scope.widthActiveLine);
        }
    }
})();

