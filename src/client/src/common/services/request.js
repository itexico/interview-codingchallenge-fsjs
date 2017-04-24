/**
 * @ngdoc service
 * @name $request
 *
 * @description
 * This service has generic methods to make request to the API
 *
 * @constructor
 * @param {service} $http - To make requests
 * @param {service} $q - To make promises
 * @returns {Object} Instance of $request
 */
angular.module('ToDoChallenge.services.$request', [])
.service('$request', function($http, $q) {
    /**
     * @memberOf $request
     * @type {Object}
     */
    var request = {};

    /**
     * @function
     * @name get
     * @memberOf $request
     * @description
     * Request a resource by GET method
     *
     * @param {String} uri - the last part of an url example: '/resource' if the url includes a complete url the flag includeEndpoint must be true
     * @param {Object} params - JSON request params
     * @param {Boolean} includeEndpoint - If is true the service doesn't add the default endpoint, you need to pass the full endpoint on uro with this flag in true
     * @returns {Promise} Promise
     */
    request.get = function (uri, params, includeEnpoint, skipAuthorization) {
        var deferred = $q.defer();
        var url = uri;

        $http({
            method: 'get',
            url: 'http://localhost:3005' + url,
            params: params,
            skipAuthorization: skipAuthorization
        }).then(function(response) {
            deferred.resolve(response.data);
        }, function(err) {
            deferred.reject(err);
        });

        return deferred.promise;
    };

    /**
     * @function
     * @name post
     * @memberOf $request
     * @description
     * Request a resource by POST method
     *
     * @param {String} uri - the last part of an url example: '/resource' if the url includes a complete url the flag includeEndpoint must be true
     * @param {Object} params - JSON request params
     * @param {Boolean} includeEndpoint - If is true the service doesn't add the default endpoint, you need to pass the full endpoint on uro with this flag in true
     * @returns {Promise} Promise
     */
    request.post = function (uri, params, includeEnpoint, skipAuthorization) {
        var deferred = $q.defer();
        var url = uri;

        $http({
            method: 'post',
            url: 'http://localhost:3005' + url,
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            data: $.param(params),
            skipAuthorization: skipAuthorization
        }).then(function(response) {
            deferred.resolve(response.data);
        }, function(err) {
            deferred.reject(err);
        });

        return deferred.promise;
    };

    return request;
});