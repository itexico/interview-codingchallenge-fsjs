(function () {
    'use strict';
    angular
            .module('app')
            .factory('itemService', itemService);

    itemService.$inject = ['$resource'];

    function itemService($resource) {
        return $resource('http://localhost:3000/items/:id', {}, {
            create: {method: "POST"},
            remove: {method: "DELETE"},
            update: {method: "PUT"}
        });
    }

})();

