(function () {
    'use strict';
    angular
            .module('app')
            .factory('userService', userService);

    userService.$inject = ['$resource'];
    function userService($resource) {
        return $resource('http://localhost:3000/users/', {}, {
            query: {method: "GET"}
        });
    }
})();

