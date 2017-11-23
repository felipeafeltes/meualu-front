(function () {
    'use strict';

    app.controller('propertyRegistrationController', propertyRegistrationController);

    function propertyRegistrationController(
        $rootScope,
        $scope,
        $state,
        config,
        myPropertiesService,
        httpPostImageFactory,
        httpDeleteImageFactory,
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

        //IMAGES UPLOADED
        $scope.images = [];
        $scope.uploadedImage = false;

        //PROPERTY VARS
        $scope.propertie = new myPropertiesService();
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

        $rootScope.googleApiAddress;
        $scope.infos = {};
        $scope.fillAddress = false;
        $scope.fillDetails = false;

        $scope.processForm = function () {
            $scope.propertie.address = $rootScope.googleApiAddress;
            $scope.propertie.extra_infos = $scope.infos;
            console.log($scope.propertie);
        }

        $scope.processAdress = function (isValid) {
            $scope.fillAddress = true;
            if (isValid) {
                $('.connecting-line-center').addClass('active');
                $('#addressForm').addClass('active');
                $('#detailsForm').addClass('active  ');
                $state.go('perfil.cadastrarImovel.details');
            }
        }

        $scope.processDetails = function () {
            $('.connecting-line-right').addClass('active');
            $('#imagesForm').addClass('active');
            $state.go('perfil.cadastrarImovel.images');
            $scope.fillDetails = true;
        }


        //IMAGENS
        $scope.saveImage = function () {
            $scope.uploadedImage = true;
            if ($scope.cropper.croppedImage !== null) {
                //UPLOAD IMAGE
                /* let imagePost = $scope.cropper.croppedImage.replace(/^data:image\/(png|jpg);base64,/, ""); */
                let data = {
                    pictures: {
                        cover: false,
                        content: imagePost
                    }
                }
                data = JSON.parse(data);
                console.log(data)
                httpPostImageFactory(config.apiUrl + 'pictures', data,
                    function (callback) {
                        console.log(callback);
                        $scope.uploadedImage = false;
                        toastr.error('callback');
                    },
                );
                $('#croppImage').modal('hide');
                $scope.images.push({ url: $scope.cropper.croppedImage });
            }
        }

        $scope.deleteImage = function (i, id) {
            httpDeleteImageFactory('upload_image.php', id,
                function (callback) {
                    console.log(callback);
                });
            $scope.images.splice(i, 1);
            toastr.info('Imagem removida!');
        }

        //ENDEREÇO
        $scope.searchAdress = function () {
            let address = $scope.address;
            if (address) {
                if (address.formatted_address != undefined && $rootScope.address_string != address.formatted_address) {
                    $rootScope.address_string = address.formatted_address;
                }
                if (address.geometry != undefined) {
                    $rootScope.lng = address.geometry.location.lng();
                    $rootScope.lat = address.geometry.location.lat();
                }
            } else {
                $rootScope.lat = "-30.0490415";
                $rootScope.lng = "-51.1916632";
            }
            if (address.address_components) {
                if (address.address_components[5] !== undefined) {
                    $scope.formAdress.street = address.address_components[0].long_name;
                    $scope.formAdress.district = address.address_components[1].long_name;
                    $scope.formAdress.city = address.address_components[2].long_name;
                    $scope.formAdress.state = address.address_components[3].short_name;
                    $scope.formAdress.country = address.address_components[4].short_name;
                    $scope.formAdress.zip_code = address.address_components[5].long_name;
                } else if (address.address_components[4] !== undefined) {
                    $scope.formAdress.street = address.address_components[0].long_name;
                    $scope.formAdress.city = address.address_components[1].long_name;
                    $scope.formAdress.state = address.address_components[2].short_name;
                    $scope.formAdress.country = address.address_components[3].long_name;
                    $scope.formAdress.zip_code = address.address_components[4].long_name;
                } else {
                    $scope.formAdress.street = address.address_components[0].long_name;
                    $scope.formAdress.city = address.address_components[1].long_name;
                    $scope.formAdress.state = address.address_components[2].short_name;
                    $scope.formAdress.country = address.address_components[3].long_name;
                }
            }
            $rootScope.googleApiAddress = $scope.formAdress;
        }

        var PoABounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(-30.255998, -51.224980),
            new google.maps.LatLng(-29.963159, -51.096578));

        $scope.autocompleteOptions = {
            componentRestrictions: { country: 'br' },
            bounds: PoABounds,
            types: ['address']
        }
    }

})();

