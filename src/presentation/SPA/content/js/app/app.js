(function() {
    'use strict';
    
    angular.module('store', ['controllers', 'services',  'components', 'configs']);
    angular.module('controllers', ['productController.controllers', 'authController.controllers']);
    angular.module('services', ['constants.service', 'productService.service', 'authService.service']);
    angular.module('components', ['ngMaterial', 'md.data.table']);
    angular.module('configs', ['routes', 'config']);
          
})();