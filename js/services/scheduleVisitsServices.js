(function () {
    'use strict';

    angular
        .module('scheduleVisitsServices', ['ngResource', 'ngRoute'])
        .factory('ScheduleVisit', ScheduleVisit);

        ScheduleVisit.$inject = ['$resource', 'config'];

        function ScheduleVisit($resource, config) {
            var schedule_visit = $resource(config.apiUrl + 'schedule_visits/:id',
                { id:'@id' }, {
                save: {
                    method: 'POST',
                    transformRequest: _transform_request
                }
            });

          function _transform_request(data) {
              data = { "schedule_visit" : data }
              return angular.toJson(data);
          }
          return schedule_visit;

        }

})();
