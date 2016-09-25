(function () {
    'use strict';

    angular
        .module('constants.service', [])
        .constant('URL_BASE', 'http://localhost:3000/') 
        
        .service('Constants', Constants);

    Constants.$inject = ['URL_BASE'];
    function Constants(URL_BASE) {
        this.GET_PRODUCTS = URL_BASE + 'products';
        this.GET_TOKEN = URL_BASE + 'token';
        this.POST_INSERTMANY = URL_BASE + 'insertMany';

    }
})();