(function() {
    'use strict';

    angular.module('config', [])
    .config(['$mdThemingProvider', function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('blue');
    }]);
})();