/**
 * @ngdoc service
 * @name MainService
 *
 * @description
 * Methods to validate the login of the user
 *
 * @constructor
 * @param {service} $q - to make promises
 * @param {service} $request - To make request to the server
 */
angular.module('ToDoChallenge.services.login', [
    'ToDoChallenge.services.$request'
])
.service('MainService', function MainService($request, $q) {
    var service = {};

    /**
     * @function
     * @name logIn
     * @memberOf MainService
     * @description
     * Send email to the server so we can create a new user
     *
     * @param {object} user - Object with username and password
     * @return {Promise} Promise
     */
    service.logIn = function(user) {
        var deferred = $q.defer();

        $request.post('/cookies', {
            email: user.email
        }).then(function(response) {
            deferred.resolve(response);
        }, function(err) {
            deferred.reject(err);
        });

        return deferred.promise;
    };

    return service;
});