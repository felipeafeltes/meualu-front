(function () {
    'use strict';
    app.controller('editProfileController', editProfileController);

    function editProfileController($rootScope, $scope, $state) {        
        var formContacts = {
            first_name:'',
            last_namme:'',
            gender:'',
            birthday:'',
            email:'',
            phone:'',
            phone2:'',
            cep:'',
            city:'',
            address:'',
            number:1,
            complement:'',
            description:''
        }

        $scope.edit = function (data) {
            formContacts = $scope.contact;
            console.log(formContacts)
        };
    }
})()
