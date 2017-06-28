interview_coding_app.factory('FavStuffService', ['$http', '$q', '$httpParamSerializerJQLike', function ($http, $q, $httpParamSerializerJQLike) {
        var FavStuffServiceFactory = {};
        var _getAllFavStuff = function () {
            var deferred = $q.defer();
            $http.get(serviceBase + '/getAllFavStuffs')
                    .then(function (data) {
                        deferred.resolve(data);
                    }, function (error) {
                        deferred.reject(error);
                    });
            return deferred.promise;
        };
        var _getFavStuffList = function (id) {
            var deferred = $q.defer();
            $http.get(serviceBase + '/getFavStuffList', {id: id})
                    .then(function (data) {
                        deferred.resolve(data.response);
                    }, function (error) {
                        deferred.reject(error);
                    });
            return deferred.promise;

        };
        var _saveNewFavStuff = function (saveinfo) {
            var data = {"fav_stuff_name": saveinfo.new_name, "fav_stuff_list": saveinfo.new_list};
            var deferred = $q.defer();
            $http.post(serviceBase + '/addNewFavStuff', data).then(function (data) {
                deferred.resolve(data);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;

        };
        var _UpdateFavStuff = function (saveinfo) {
            var data = {"fav_stuff_name": saveinfo.fav_stuff_name, "fav_stuff_list": saveinfo.fav_stuff_list};
            var deferred = $q.defer();
            $http.put(serviceBase + '/UpdateFavStuff/' + saveinfo._id, data).then(function (data) {
                deferred.resolve(data);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;

        };
        
         var _DeleteFavStuff = function (id) {
            var data = {params:{_id:id}};
            var deferred = $q.defer();
            $http.delete(serviceBase + '/DeleteFavStuff', data).then(function (data) {
                deferred.resolve(data);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;

        };
        FavStuffServiceFactory.getAllFavStuff = _getAllFavStuff;
        FavStuffServiceFactory.getFavStuffList = _getFavStuffList;
        FavStuffServiceFactory.saveNewFavStuff = _saveNewFavStuff;
        FavStuffServiceFactory.UpdateFavStuff = _UpdateFavStuff;
        FavStuffServiceFactory.DeleteFavStuff =_DeleteFavStuff;

        return FavStuffServiceFactory;
    }]);