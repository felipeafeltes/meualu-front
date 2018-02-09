(function () {
    'use strict';

    angular
        .module('scheduleVisitsServices', ['ngResource', 'ngRoute'])
        .factory('ScheduleVisit', ScheduleVisit)
        .factory('SchedulePostVisit', SchedulePostVisit)
        .factory('ScheduleCancelJustificationsL', ScheduleCancelJustificationsL)
        .factory('ScheduleCancelJustificationsR', ScheduleCancelJustificationsR)
        .factory('ScheduledCancel', ScheduledCancel)
        .factory('ScheduledAccept', ScheduledAccept)

    ScheduleVisit.$inject = ['$resource', 'config'];
    SchedulePostVisit.$inject = ['$resource', 'config'];
    ScheduleCancelJustificationsL.$inject = ['$resource', 'config'];
    ScheduleCancelJustificationsR.$inject = ['$resource', 'config'];
    ScheduledCancel.$inject = ['$resource', 'config'];
    ScheduledAccept.$inject = ['$resource', 'config'];
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
            {}, {
                save: {
                    method: 'POST',
                    transformRequest: _transform_request
                },
                get: {
                    method: 'GET'
                }
            });

        function _transform_request(data) {
            data = { "visit": data }
            return angular.toJson(data);
        }
        return schedule_visit;

    }

    function ScheduleCancelJustificationsL($resource, config) {
        return $resource(config.apiUrl + 'justifications/landlord',
            {}, {
                get: {
                    method: 'GET'
                }
            });
    }

    function ScheduleCancelJustificationsR($resource, config) {
        return $resource(config.apiUrl + 'justifications/renter',
            {}, {
                get: {
                    method: 'GET'
                }
            });
    }

    function ScheduledCancel($resource, config) {
        var cancel = $resource(config.apiUrl + 'visits/:id/cancel',
            { id: '@id' }, {
                put: {
                    method: 'PUT',
                    transformRequest: _transform_request
                }
            });

        function _transform_request(data) {
            data = { "visit" : data.visit}
            return angular.toJson(data);
        }
        return cancel;
    }

    function ScheduledAccept($resource, config) {
        var accept = $resource(config.apiUrl + 'visits/:id/accept',
            { id: '@id' }, {
                put: {
                    method: 'PUT',
                    transformRequest: _transform_request
                }
            });

        function _transform_request(data) {
            data = { "visit" : data.visit}
            return angular.toJson(data);
        }
        return accept;
    }

})();
