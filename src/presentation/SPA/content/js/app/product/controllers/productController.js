(function () {
    'use strict';

    angular
        .module('productController.controllers', [])
        .controller('ProductController', ProductController);

    ProductController.$inject = ['ProductService', '$mdToast', '$q', '$scope'];
    function ProductController(ProductService, $mdToast, $q, $scope) {
        'use strict';
        var vm = this;

        vm.selected = [];
        vm.items = {};
        vm.text = '';
        vm.page = 0;
        vm.limitOptions = [5, 10, 15];
        vm.options = {
            rowSelection: true,
            multiSelect: true,
            autoSelect: true,
            decapitate: false,
            largeEditDialog: false,
            boundaryLinks: false,
            limitSelect: true,
            pageSelect: true
        };

        vm.query = {
            order: 'id',
            limit: 5,
            page: 1
        };

        vm.logPagination = logPagination;
        vm.updateList = updateList;
        vm.updateDatabase = updateDatabase;

        setTimeout(function () {
            updateList();
        }, 500);


        function init() {
            updateList();
        }
        function updateList() {
            return ProductService.list(vm.page, 50)
                .then(onResult);
        }

        function onResult(result) {
            if (result.error)
                return showCustomToast(result.error);

            vm.items.count = result.count;
            vm.items.data = result.products;
            vm.text = '';

            console.log('result', result);
            return showCustomToast('List updated with success!');


        }
        function onUpdate(result) {
            if (result.error) {
                showCustomToast(result.error);
            }
            else if (result === "OK") {
                showCustomToast('Database updated with success!');
                updateList();
            }

            else
                showCustomToast('error!');
        }
        function updateDatabase() {
            vm.promise = ProductService.insertData().then(onUpdate);
        }
        function logPagination(page, limit) {
            console.log('limit: ', limit);

        }

        function showCustomToast(msg) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(msg)
                    .position('bottom left')
                    .hideDelay(3000));
        };
    }
})();