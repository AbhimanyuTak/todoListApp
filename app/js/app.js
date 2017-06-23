

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
    url: '/allTasks',
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