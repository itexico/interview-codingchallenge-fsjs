(function () {
    'use strict';
    angular
            .module('app')
            .factory('listService', listService);

    listService.$inject = ['$resource'];

    function listService($resource) {
        return $resource('http://localhost:3000/lists/:id', {}, {
            query: {method: "GET", isArray: true},
            create: {method: "POST"},
            get: {method: "GET"},
            remove: {method: "DELETE"},
            update: {method: "PUT"}
        });
    }

})();

