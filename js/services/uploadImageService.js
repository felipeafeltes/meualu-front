app.factory('httpPostImageFactory', function ($http, config) {
    return function (_url, data, callback) {
        $http({
            url: config.apiUrl + 'pictures',
            method: "POST",
            data: data,
            headers: { 'Content-Type': undefined }
        }).then(
            function successCallback(response) {
                return response;
            },
            function errorCallback(error) {
                return error;
            }
        );
    };
});

app.factory('httpDeleteImageFactory', function ($http, config) {
    return function (_url, data, callback) {
        $http({
            url: config.apiUrl + 'pictures',
            method: "DELETE",
            data: data,
            headers: { 'Content-Type': undefined }
        }).then(
            function (response) {
                return response;
            },
            function (err) {
                return err;
            }
        );
    };
});