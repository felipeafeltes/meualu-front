(function () {
    'use strict';
    app.controller('ScheduledController', ScheduledController);
    app.controller('ScheduledControllerLandlord', ScheduledControllerLandlord);
    app.controller('ScheduledControllerRenter', ScheduledControllerRenter);

    function ScheduledController($scope,
        $rootScope,
        $state) {

    }

    function ScheduledControllerLandlord($state,$scope, ScheduledCancel, mySelfVisitsLandlord, ScheduleCancelJustificationsL, ScheduledAccept) {
        $scope.properties = [];
        $scope.justifications = [];
        $scope.cancelReason;
        $scope.idToCancel;
        $scope.otherReason;
        $scope.cancelVisit = false;
        $scope.acceptRequest = false;
        $scope.hasProperties = false;
        getVisits();
        function getVisits() {
            $scope.hasProperties = false;
            mySelfVisitsLandlord.get(
                function (data) {
                    $scope.hasProperties = true;
                    $scope.properties = data.visits;
                    if ($scope.properties.length === 0) {
                        $scope.noPropertie = "Nenhuma visita marcada =(";
                    }
                }
            )
        }
        ScheduleCancelJustificationsL.get(
            function (data) {
                $scope.justifications = data.justifications;
            }
        )

        $scope.acceptVisit = function (id) {
            $scope.acceptRequest = true;
            ScheduledAccept.put(
                { id: id },
                function (data) {
                    toastr.success("Visita confirmada!");
                    getVisits();
                }, function (data) {
                    toastr.error(data.message);
                    $scope.acceptRequest = false;
                }
            )
        }

        $scope.details = function (id) {
            $state.go('propertiesDetails', { id: id });
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
                    function (data) {
                        toastr.error(data.message);
                        $('#cancelScheduled').modal('hide');
                        $scope.cancelVisit = false;
                    }
                )
            }
        }


        $scope.openReasons = function (id, pos) {
            $scope.idToCancel = id;
            $scope.position = pos;
            $('#cancelScheduled').modal('show');
        }
    }

    function ScheduledControllerRenter($state,$scope, mySelfVisitsRenter, ScheduleCancelJustificationsR, ScheduledCancel) {
        $scope.properties = [];
        $scope.justifications = [];
        $scope.cancelReason;
        $scope.idToCancel;
        $scope.otherReason;
        $scope.cancelVisit = false;
        $scope.hasProperties = false;
        getVisits();

        function getVisits() {
            $scope.hasProperties = false;
            mySelfVisitsRenter.get(
                function (data) {
                    $scope.hasProperties = true;
                    $scope.properties = data.visits;
                    if ($scope.properties.length === 0) {
                        $scope.noPropertie = "Nenhuma visita marcada =(";
                    }
                }
            )
        }

        ScheduleCancelJustificationsR.get(
            function (data) {
                $scope.justifications = data.justifications;
            }
        )

        $scope.details = function (id) {
            $state.go('propertiesDetails', { id: id });
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
                    function (data) {
                        toastr.error(data.message);
                        $('#cancelScheduled').modal('hide');
                        $scope.cancelVisit = false;
                    }
                )
            }
        }


        $scope.openReasons = function (id, pos) {
            $scope.idToCancel = id;
            $scope.position = pos;
            $('#cancelScheduled').modal('show');
        }
    }



})();
