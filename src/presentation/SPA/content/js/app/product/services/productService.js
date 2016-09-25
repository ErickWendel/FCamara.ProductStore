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

        function list(skip, limit) {

            return $http.get(Constants.GET_PRODUCTS+ "?skip="+ skip + "&limit="+limit).then(function (result) {
                return result.data;
            }).catch(function (res) {
                if (!res.status === 401) throw new Error(res);
                return { error: 'Token expirado, favor gerar novamente!' };
            });
        }

        function insertData () {
            
             return $http.post(Constants.POST_INSERTMANY)
             .then(function (result) {
                return result.data;
            }).catch(function (res) {
                if (!res.status === 401) throw new Error(res);
                return { error: 'Token expirado, favor gerar novamente!' };
            });
        }
    }
})();