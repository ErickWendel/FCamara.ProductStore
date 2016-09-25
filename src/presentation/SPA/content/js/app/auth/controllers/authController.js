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
        vm.generateToken = generateToken;
        generateToken();

        ////////////////

        function generateToken() {
            AuthService.getToken().then(function (result) {
                vm.token = result.token;
                AuthService.setToken(result.token);
                vm.second = result.expiration;

            });
        }
        function updateTime() {

            $interval(function () {
                if (vm.second)
                    var data = new Date()
                    data.setTime(vm.second);
                    vm.second = ((new Date().getTime() - data.getTime()) / 1000);
            }, 1000);
        }
    }
})();