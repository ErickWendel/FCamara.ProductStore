(function () {
    'use strict';

    angular
        .module('productService.service', [])
        .service('ProductService', ProductService);

    ProductService.$inject = ['Constants', 'AuthService', '$http'];
    function ProductService(Constants, AuthService, $http) {
        var service = {
            list: list,
            insertData:insertData 
        };

        return service;

        function list() {

            return $http.get(Constants.GET_PRODUCTS).then(function (result) {
                return result.data;
            }).catch(function (res) {
                if (!res.status === 401) throw new Error(res);
                return { error: 'Refresh token, please!' };
            });
        }

        function insertData () {
            
             return $http.post(Constants.POST_INSERTMANY)
             .then(function (result) {
                return result.data;
            }).catch(function (res) {
                if (!res.status === 401) throw new Error(res);
                return { error: 'Refresh token, please!' };
            });
        }
    }
})();