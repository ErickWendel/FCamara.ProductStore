
(function () {
    'use strict';

    var app = angular.module('routes', ['ui.router']);
    app.config(['$stateProvider', '$urlRouterProvider', config]);

    function config($stateProvider, $urlRouterProvider) {
        console.log('$stateProvider', $stateProvider)
        $stateProvider
            .state('app', {
                templateUrl: 'js/app/shared/templates/home.html',
                abstract: true
            })
            .state('app.home', {
                url: '/',
                views: {
                    'auth': {
                        templateUrl: 'js/app/auth/templates/auth.html',
                        controller: 'AuthController',
                        controllerAs: 'vm'
                    },
                    'products': {
                        templateUrl: 'js/app/product/templates/products.html',
                        controller: 'ProductController',
                        controllerAs: 'vm'
                    }
                }
            });

        $urlRouterProvider.otherwise('/');
    }

    

})();