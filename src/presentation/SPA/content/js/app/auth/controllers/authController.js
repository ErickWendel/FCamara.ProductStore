(function () {
    'use strict';

    angular
        .module('authController.controllers', [])
        .controller('AuthController', AuthController);

    AuthController.$inject = ['AuthService', '$interval'];
    function AuthController(AuthService, $interval) {
        var vm = this;

        vm.second = 0;
        vm.secondTime = 0;
        vm.token = '';
        vm.expired = false;
        vm.generateToken = generateToken;
        generateToken();

        ////////////////

        function generateToken() {
            AuthService.getToken().then(function (result) {
                vm.token = result.token;
                AuthService.setToken(result.token);
                vm.secondTime = result.expiration;
                updateTime();

            });
        }
        
        function updateTime() {

            $interval(function () {
               var a = new Date();
                a.setTime(vm.secondTime);
                var result = Math.round((a - new Date().getTime() / 1000)) * 1;
                vm.expired = result <= 0;
                vm.second = result;
            }, 500);
        }
    }
})();