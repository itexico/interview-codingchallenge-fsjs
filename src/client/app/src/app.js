// Load libraries
import angular from 'angular';

import 'angular-animate';
import 'angular-aria';
import 'angular-material';

import AppController from 'src/AppController';
import Users from 'src/users/Users';

export default angular.module( 'starter-app', [ 'ngMaterial', Users.name ] )

  .config(($mdIconProvider, $mdThemingProvider) => {
    // Register the user `avatar` icons
    $mdIconProvider
      .defaultIconSet("./assets/svg/avatars.svg", 128)
      .icon("menu", "./assets/svg/menu.svg", 24)
      .icon("share", "./assets/svg/share.svg", 24)
      .icon("google_plus", "./assets/svg/google_plus.svg", 24)
      .icon("hangouts", "./assets/svg/hangouts.svg", 24)
      .icon("twitter", "./assets/svg/twitter.svg", 24)
      .icon("add", "./assets/svg/add2.svg", 24)
      .icon("save", "./assets/svg/save.svg", 24)
      .icon("edit", "./assets/svg/edit.svg", 24)
      .icon("delete", "./assets/svg/delete.svg", 24)
      .icon("10", "./assets/svg/checklist2.svg", 24)
      .icon("9", "./assets/svg/book.svg", 24)
      .icon("8", "./assets/svg/list3.svg", 24)
      .icon("7", "./assets/svg/list2.svg", 24)
      .icon("5", "./assets/svg/list.svg", 24)
      .icon("6", "./assets/svg/chart.svg", 24)
      .icon("3", "./assets/svg/checklist.svg", 24)
      .icon("4", "./assets/svg/clipboard2.svg", 24)
      .icon("2", "./assets/svg/clipboard.svg", 24)
      .icon("1", "./assets/svg/clipboard3.svg", 24)
      .icon("0", "./assets/svg/pencil.svg", 24)
      .icon("phone", "./assets/svg/phone.svg", 24);



    $mdThemingProvider.theme('default')
      .primaryPalette('indigo')
      .warnPalette('amber')
      .accentPalette('pink');



  })
  .controller('AppController', AppController);
