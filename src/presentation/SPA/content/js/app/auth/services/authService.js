(function() {
'use strict';

    angular
        .module('authService.service', [])
        .factory('AuthService', AuthService);

    AuthService.$inject = ['Constants', '$http'];
    function AuthService(Constants, $http) {
        var service = {
            getToken : getToken,
            setToken: setToken 
        };
        
        return service;

        function setToken(token) {
            $http.defaults.headers.common.Authorization = token;
        }
        function getToken() {
            return $http.get(Constants.GET_TOKEN).then(function (result) {
                return result.data;
            });
         }
    }
})();