(function () {
    'use strict';

    angular
        .module('productController.controllers', [])
        .controller('ProductController', ProductController);

    ProductController.$inject = ['ProductService', '$mdToast'];
    function ProductController(ProductService, $mdToast) {
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
            ProductService.list(vm.page, vm.query.limit).then(onResult);
        }

        function onResult(result) {
            if (result.error)
                showCustomToast(result.error);

            else {
                vm.items.count = result.length
                vm.items.data = result;
                vm.text = '';
                showCustomToast('List updated with success!');

            };
        }
        function onUpdate(result) {
            if (result.error)
                showCustomToast(result.error);
            else if (result === "OK") {
                showCustomToast('Database updated with success!');
            }
            else 
                showCustomToast('error!');
        }
        function updateDatabase() {
            ProductService.insertData().then(onUpdate);
        }
        function logPagination(page, limit) {
            vm.page = page;
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