(function(){
    'use strict';
  app.controller('ContactClientsController', ContactClientsController);

  var modal;

  function ContactClientsController($scope, contactClients, $uibModal) {

    $scope.showModal = function() {
        modal = $uibModal.open({
            templateUrl: 'comecarModal.html',
            size: 'md',
            controller: 'ContactClientsController',
        });
    }

    $scope.contact = new contactClients();

    $scope.create = function (isValid) {
      if (isValid){
        $scope.contact.$save(
          // success
          function (data) {
            modal.close();
          }
        );
      }
    };

    $scope.close = function() {
      modal.close();
    };
  }
})()
