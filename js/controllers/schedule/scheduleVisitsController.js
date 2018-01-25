(function () {
    'use strict';
    app.controller('ScheduledController', ScheduledController);

    function ScheduledController($scope, $rootScope, mySelfVisits, ScheduleCancelJustifications, ScheduledCancel) {
        $scope.hasProperties = false;
        $scope.properties = [];
        $scope.cancelReason;
        $scope.idToCancel;
        $scope.otherReason;
        $scope.cancelVisit = false;

        getVisits();

        ScheduleCancelJustifications.get(
            function (data) {
                $scope.justifications = data.justifications;
            }
        )

        function getVisits() {
            $scope.hasProperties = false;
            mySelfVisits.get(
                function (data) {
                    $scope.hasProperties = true;
                    $scope.properties = data.visits;
                    if ($scope.properties.length === 0) {
                        $scope.noPropertie = "Nenhuma visita marcada =(";
                    }
                }
            )
        }

        $scope.send = function (isValid) {
            if (isValid || $scope.cancelReason === undefined) {
                let cancel = {};
                $scope.cancelVisit = true;
                if ($scope.otherReason === undefined || $scope.otherReason === '') {
                    cancel = {
                        justification_id: $scope.cancelReason,
                    }
                } else {
                    cancel = {
                        justification_id: $scope.cancelReason,
                        justification_complement: $scope.otherReason
                    }
                }

                ScheduledCancel.put(
                    { id: $scope.idToCancel, visit: cancel },
                    function (data) {
                        $scope.otherReason = '';
                        $scope.cancelReason = undefined;
                        getVisits();
                        toastr.success('Visita cancelada!');
                        $('#cancelScheduled').modal('hide');
                        $scope.cancelVisit = false;
                    },
                )
            }
        }


        $scope.openReasons = function (id, pos) {
            $scope.idToCancel = id;
            $scope.position = pos;
            $('#cancelScheduled').modal('show');
        }

    }

    function _showValidationErrors($scope, error) {
        $scope.validationErrors = [];
        if (error.status === 401 && error.data && angular.isObject(error.data)) {
            var errors = [];
            errors = error.data['errors'];
            for (i = 0; i < errors.length; i++) {
                $scope.validationErrors.push(errors[i]);
            }
        } else {
            $scope.validationErrors.push('Não foi possível completar o login do usuário');
        };
    }
})();
