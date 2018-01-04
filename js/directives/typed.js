//CREATED BY CACIANO
//PARA USAR UTILIZAR O ID NA DIV ONDE ESTA LOCALIZADA AS STIRNGS
/* <div id="typed-strings">
    <p>Simple Usage.</p>
    <p>Simple Usage 2.</p>
</div>

<span typed></span>
 */

app.directive('typed', ["$timeout", function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            var typed = new Typed(element[0], {
                stringsElement: '#typed-strings',
                smartBackspace: true,
                typeSpeed: 80,
                backDelay: 800,
                loop: true,
            });
        }
    }
}]);