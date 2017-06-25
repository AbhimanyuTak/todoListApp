

var myApp = angular.module('todolist', 
  ['ui.router',
  'LocalStorageModule']);

myApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 'localStorageServiceProvider', 
  function($stateProvider, $urlRouterProvider, $locationProvider, localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('todo')
    .setStorageType('localStorage')

  var helloState = {
    name: 'all',
    url: '/',
    templateUrl: 'views/home.html'
  }

  var taskState = {
    name: 'task',
    url: '/task/:id',
    templateUrl: 'views/tasks.html'
  }

  $urlRouterProvider.otherwise('/');
  $stateProvider.state(helloState);
  $stateProvider.state(taskState);
  // $locationProvider.html5Mode(true);
}]);


myApp.config([function() {
  // ServiceWorker is a progressive technology. Ignore unsupported browsers
  if ('serviceWorker' in navigator) {
    console.log('CLIENT: service worker registration in progress.');
    navigator.serviceWorker.register('../sw.js').then(function() {
      console.log('CLIENT: service worker registration complete.');
    }, function() {
      console.log('CLIENT: service worker registration failure.');
    });
  } else {
    console.log('CLIENT: service worker is not supported.');
  }
}])