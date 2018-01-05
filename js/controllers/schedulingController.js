(function () {
    'use strict';
    app.controller('schedulingController', schedulingController);

    function schedulingController($scope, $rootScope, $ocLazyLoad) {

        $scope.selectedHour;
        $scope.selectedDay;

        $scope.hours = [
            { val: '21:00', valid: true },
            { val: '03:00', valid: true },
            { val: '04:00', valid: false },
            { val: '08:00', valid: true },
            { val: '07:00', valid: false },
            { val: '01:00', valid: true },
            { val: '06:00', valid: true },
            { val: '05:00', valid: false },
            { val: '04:00', valid: false },
            { val: '03:00', valid: true },
            { val: '02:00', valid: false },
            { val: '18:00', valid: true },
        ]

        $scope.days = [
            { val: 20, id: 1 },
            { val: 21, id: 2 },
            { val: 22, id: 3 },
            { val: 23, id: 4 },
            { val: 24, id: 5 },
            { val: 25, id: 6 },
            { val: 26, id: 7 },

        ]

        $scope.selectedDay = $scope.days[0].val;
        
        $scope.daysWeek = [
            { val: 'Qua' },
            { val: 'Qui' },
            { val: 'Sex' },
            { val: 'Sáb' },
            { val: 'Dom' },
            { val: 'Seg' },
            { val: 'Ter' }
        ]

        $scope.scheduleVisit = function(){
            console.log($scope.selectedHour)
            if($scope.selectedHour === undefined){
                toastr.error("Selecione um horário!")
            }else{
                alert("agendar dia " + $scope.selectedDay + " as " + $scope.selectedHour)
            }
        }

        $scope.selectDay = function (day) {
  
            $scope.selectedDay = day;
            alert(day)
        }

        $scope.selectHour = function (hour) {
            $scope.selectedHour = hour;
        }

    }
})()