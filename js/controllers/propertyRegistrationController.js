(function () {
    'use strict';

    app.controller('propertyRegistrationController', propertyRegistrationController);

    function propertyRegistrationController($rootScope, $scope, $state, myPropertiesService, httpPostImageFactory, httpDeleteImageFactory) {
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
        $scope.uploadedImage = true;

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
        $scope.infos = {};
        $scope.fillAddress = false;
        $scope.fillDetails = false;

        $scope.processForm = function () {
            console.log($scope.propertie);
        }

        $scope.processAdress = function (isValid) {
            console.log(isValid)
            $scope.fillAddress = true;
            if(isValid){
                $scope.propertie.address = $scope.formAdress;
                $('.connecting-line-center').addClass('active');
                $('#addressForm').addClass('active');
                $('#detailsForm').addClass('active');
                $state.go('cadastrarImovel.details');
                console.log($scope.propertie);
            }   
        }

        $scope.processDetails = function () {
            $scope.propertie.extra_infos = $scope.infos;
            $('.connecting-line-right').addClass('active');
            $('#imagesForm').addClass('active');
            $state.go('cadastrarImovel.images');
            $scope.fillDetails = true;
            console.log($scope.propertie);
        }

        $scope.saveImage = function () {
            $scope.uploadedImage = true;

            if ($scope.cropper.croppedImage !== null) {
                //UPLOAD IMAGE
                var base64ImageContent = $scope.cropper.croppedImage.replace(/^data:image\/(png|jpg);base64,/, "");
                var url = "url/action";
                var blob = base64ToBlob(base64ImageContent, 'image/png');
                var formData = new FormData();
                formData.append('file', blob);
                httpPostImageFactory('upload_image.php', formData,
                    function (callback) {
                        console.log(callback);
                        $scope.uploadedImage = true;
                    });

                $scope.images.push({ url: $scope.cropper.croppedImage });

                $('#croppImage').modal('hide');
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

        $scope.searchAdress = function () {
            var address = $scope.address;
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
            if (address.address_components !== undefined) {

                if (address.address_components[5] !== undefined) {
                    $scope.formAdress.street = address.address_components[0].long_name;
                    $scope.formAdress.district = address.address_components[1].long_name;
                    $scope.formAdress.city = address.address_components[2].long_name;
                    $scope.formAdress.state = address.address_components[3].short_name;
                    $scope.formAdress.country = address.address_components[4].short_name;
                    $scope.formAdress.zip_code = address.address_components[5].long_name;
                } else {
                    $scope.formAdress.street = address.address_components[0].long_name;
                    $scope.formAdress.city = address.address_components[1].long_name;
                    $scope.formAdress.state = address.address_components[2].short_name;
                    $scope.formAdress.country = address.address_components[3].long_name;
                    $scope.formAdress.zip_code = address.address_components[4].long_name;
                }
            }
        }

        var PoABounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(-30.255998, -51.224980),
            new google.maps.LatLng(-29.963159, -51.096578));

        $scope.autocompleteOptions = {
            componentRestrictions: { country: 'br' },
            bounds: PoABounds,
            types: ['address']
        }

        //Transforma a imagem cortada de base64 pra blob
        function base64ToBlob(base64, mime) {
            mime = mime || '';
            var sliceSize = 1024;
            var byteChars = window.atob(base64);
            var byteArrays = [];

            for (var offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
                var slice = byteChars.slice(offset, offset + sliceSize);

                var byteNumbers = new Array(slice.length);
                for (var i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }

                var byteArray = new Uint8Array(byteNumbers);

                byteArrays.push(byteArray);
            }

            return new Blob(byteArrays, { type: mime });
        }

    }

})();

