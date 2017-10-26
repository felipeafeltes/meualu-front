(function () {
    'use strict';
    app.controller('editProfileController', editProfileController);

    function editProfileController($rootScope, $scope, $state) {

        $scope.response = true;

        var formContacts = {
            first_name: '',
            last_namme: '',
            gender: '',
            birthday: '',
            email: '',
            phone: '',
            phone2: '',
            cep: '',
            city: '',
            address: '',
            number: 1,
            complement: '',
            description: ''
        }

        $scope.edit = function (isValid) {
            if (isValid) {
                $scope.response = false
                formContacts = $scope.contact;
                console.log(formContacts);
            }
        };
    }
})()
