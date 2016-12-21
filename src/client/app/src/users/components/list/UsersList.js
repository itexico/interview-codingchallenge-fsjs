import UsersListController from './UsersListController'

// Directive definition of the the UsersListDirective.
class UsersListDirective {
  constructor() {
    angular.extend(this, {
      restrict         : 'E',
      scope            : {  users: '=', selected : '=', showDetails : '&onSelected',deleteList:'&onDeleteList'},
      templateUrl      : 'src/users/components/list/UsersList.html',
      bindToController : true,
      controllerAs     : '$ctrl',
      controller       : ['$scope', UsersListController]
    });

  }
}

export default {
  name : 'usersList',
  config : {
    bindings         : {  users: '<', selected : '<', showDetails : '&onSelected',shownew:'<' ,deletelist:'&onDeletelist'},
    templateUrl      : 'src/users/components/list/UsersList.html'
  }
};
