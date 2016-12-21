import angular from 'angular';

import App from 'src/app';

/**
 * Manually bootstrap the application when AngularJS and
 * the application classes have been loaded.
 */
angular
  .element( document )
  .ready( function() {
    angular
      .module( 'angular-app-bootstrap', [ App.name ] )
      .run(()=>{
        console.log(`Interview Challenge`);
      });

    let body = document.getElementsByTagName("body")[0];
    angular.bootstrap( body, [ 'angular-app-bootstrap' ]);
  });
