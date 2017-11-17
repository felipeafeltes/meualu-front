app.factory('httpPostImageFactory', function ($http) {
    return function (_url, data, callback) {
        $http({
            url: _url,
            method: "POST",
            data: data,
            headers: { 'Content-Type': undefined }
        }).then(
            function (response) {
                console.log(response);
            },
            function (err) {
                console.log(err);
            }
            );
    };
});

app.factory('httpDeleteImageFactory', function ($http) {
    return function (_url, data, callback) {
        $http({
            url: _url,
            method: "DELETE",
            data: data,
            headers: { 'Content-Type': undefined }
        }).then(
            function (response) {
                console.log(response);
            },
            function (err) {
                console.log(err);
            }
            );
    };
});