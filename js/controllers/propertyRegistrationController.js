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
        PropertyService,
        ImageService,
        Viacep
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
        $scope.sendForm = false;

        //ENDERECO
        $scope.formAdress =
            {
                street: '',
                district: '',
                zip_code: 0,
                city: '',
                state: '',
                country: '',
                number: '',
                complement: ''
            };

        //IMAGES UPLOADED
        $scope.images = [];
        $scope.uploadedImage = false;

        //EXTRA INFOS
        $scope.propertyInfos;
        $scope.condominiumInfos;
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

        $rootScope.formAddress = {
            city: "",
            complement: "",
            country: "",
            district: "",
            number: "",
            state: "",
            street: "",
            zip_code: "",
        };
        $scope.infos = [];
        $scope.fillAddress = false;
        $scope.fillDetails = false;

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
                $scope.infos.push(extraInfo);
            }
        };

        //Proceessamento de cada parte do wizard

        $scope.processForm = function () {
            $('#loadingModal').modal({ backdrop: 'static', keyboard: false, show: true });

            $scope.sendForm = false; let ren = { 'id': 1, 'value': 800, 'condominium': 450, 'iptu': 90 };

            $scope.propertie.address = $rootScope.formAddress;
            $scope.propertie.extra_infos = $scope.infos;
            $scope.propertie.rental = ren;
            $scope.propertie.pictures = $scope.images;

            $scope.propertie.$save(
                function (data) {
                    $('#loadingModal').modal('hide');
                    toastr.success('Imóvel cadastrado com sucesso!');
                    $state.go('perfil.info');
                },
                function (data) {
                    $('#loadingModal').modal('hide');
                    toastr.error(data.errors);
                }
            );
        }

        $scope.processImages = function () {

        }

        $scope.processAdress = function (isValid) {
            $scope.fillAddress = true;
            if (isValid) {
                $('.connecting-line-center').addClass('active');
                $('#addressForm').addClass('active');
                $('#detailsForm').addClass('active');
                $state.go('perfil.cadastrarImovel.details');
            } else {
                toastr.warning('Campos obrigatórios precisam ser preenchidos!');
            }
        }

        $scope.processDetails = function (isValid) {
            $scope.fillDetails = true;
            if (isValid) {
                $('.connecting-line-right').addClass('active');
                $('#imagesForm').addClass('active');
                $state.go('perfil.cadastrarImovel.images');
            } else {
                toastr.warning('Campos obrigatórios precisam ser preenchidos!');
            }
        }

        //ENDERECO
        $scope.searchCep = function (cepValue) {
            if (cepValue.length === 8) {
                toastr.info("Procurando CEP...")
                Viacep.get({ 'cep': cepValue }).$promise.then(
                    function (data) {
                        $rootScope.formAddress.city = data.localidade;
                        $rootScope.formAddress.complement = data.complemento;
                        $rootScope.formAddress.country = 'Brasil';
                        $rootScope.formAddress.district = data.bairro;
                        $rootScope.formAddress.number = data.gia;
                        $rootScope.formAddress.state = data.uf;
                        $rootScope.formAddress.street = data.logradouro;
                    }
                )
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
                        $scope.images.push({ id: data.picture.id, url: data.picture.url, base64: $scope.cropper.croppedImage, cover: false });
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
                    toastr.info('Imagem removida!');
                }
            )
        }
    }

})();

