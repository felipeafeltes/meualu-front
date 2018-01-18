(function () {
    'use strict';

    angular
        .module('scheduleVisitsServices', ['ngResource', 'ngRoute'])
        .factory('ScheduleVisit', ScheduleVisit)
        .factory('SchedulePostVisit', SchedulePostVisit)

    ScheduleVisit.$inject = ['$resource', 'config'];
    SchedulePostVisit.$inject = ['$resource', 'config'];

    function ScheduleVisit($resource, config) {
        var schedule_visit = $resource(config.apiUrl + 'properties/:id/visit_schedule',
            { id: '@id' }, {
                get: {
                    method: 'GET'
                }
            });

        return schedule_visit;

    }

    function SchedulePostVisit($resource, config) {
        var schedule_visit = $resource(config.apiUrl + 'visits',
            { }, {
                save: {
                    method: 'POST',
                    transformRequest: _transform_request
                },
                get:{
                    method: 'GET'
                }
            });

        function _transform_request(data) {
            data = { "visit": data }
            return angular.toJson(data);
        }
        return schedule_visit;

    }

})();
