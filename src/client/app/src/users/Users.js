// Load the custom app ES6 modules

import UsersDataService from 'src/users/services/UsersDataService';

import UsersList from 'src/users/components/list/UsersList';
import UserDetails from 'src/users/components/details/UserDetails';

// Define the Angular 'users' module

export default angular
  .module("users", ['ngMaterial'])

  .component( UsersList.name, UsersList.config )
  .component( UserDetails.name, UserDetails.config )
  .filter('randomize', function() {
    return function(input, scope) {
      if (input!=null && input!=undefined && input > 1) {
        return Math.floor((Math.random()*input)+1);
      }
    }
  })
  .service("UsersDataService", UsersDataService);
