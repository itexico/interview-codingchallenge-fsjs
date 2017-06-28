interview_coding_app.controller('show_fav_stuff_list', function ($scope, FavStuffService) {
    $scope.model = {
        new_list: [""],
        new_name: ""
    };
    FavStuffService.getAllFavStuff().then(function (response) {
        console.log(response)
        $scope.fav_stuff = response.data.response;
        console.log($scope.fav_stuff);
    }, function (err) {

    });
    $scope.delete_element = function (items, index) {
        console.log(items);
        items.splice(index, 1)
    }
    $scope.push_new = function (items) {
        items.push("");
    }
    $scope.save_changes = function (save_info) {
         FavStuffService.UpdateFavStuff(save_info).then(function (response) {
             console.log(response);
        }, function (err) {

        });
    }
    $scope.delete_item = function (id,index_remove) {
         FavStuffService.DeleteFavStuff(id).then(function (response) {
              $scope.fav_stuff.splice(index_remove,1);
             console.log(response);
        }, function (err) {

        });
    }
    $scope.add_new_fav_stuff = function (save_info) {
        FavStuffService.saveNewFavStuff(save_info).then(function (response) {
            $scope.fav_stuff.push(response.data.response);
            $scope.model = {
                new_list: [""],
                new_name: ""
            };
        }, function (err) {

        });
    }

    console.log($scope.fav_stuff_names);
});