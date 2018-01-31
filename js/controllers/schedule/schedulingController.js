(function () {
    'use strict';
    app.controller('schedulingController', schedulingController);

    function schedulingController($scope, $rootScope, $stateParams, $state, ScheduleVisit, SchedulePostVisit) {
        $scope.request = false;
        $scope.schuduled = false;
        $scope.selectedHour;
        $scope.selectedDay;
        $scope.hasData = false;
        $scope.weekday = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];
        $scope.days = [];
        $scope.daysWeek = [];
        $scope.visits;
        ScheduleVisit.get(
            { id: $stateParams.id },
            function (data) {
                let result = data.property;
                $scope.property = result;
                $scope.visits = result.visits;
                $scope.selectedDay = result.visits[0][0].date;
                $scope.hours = result.visits[0];
                $scope.hasData = true;
            },
            function (data) {
                toastr.error("Imóvel indisponível ou inexistente.")
                $state.go('home');
            }
        )

        $scope.scheduleVisit = function () {

            if (!localStorage.getItem('token')) {
                $('#modalLogin').modal('show');
            } else {
                if ($scope.selectedHour === undefined) {
                    toastr.error("Selecione um horário!")
                } else {
                    $scope.request = true;
                    let data = {
                        property_id:$stateParams.id,
                        date:$scope.selectedHour
                    }
                    SchedulePostVisit.save(data,
                        function (data) {
                            $scope.schuduled = true;
                        },
                        function (data) {
                            toastr.error("Não foi possível agendar este horário!")
                            $scope.request = false;
                        }
                    )
                }
            }
        }

        $scope.selectDay = function (day) {
            $scope.selectedDay = day;
            $scope.selectedHour = undefined
            $scope.visits.forEach((element) => {
                if (element[0].date === day) {
                    $scope.hours = element;
                }
            });
        }

        $scope.selectHour = function (hour) {
            $scope.selectedHour = hour;
        }

    }
})();