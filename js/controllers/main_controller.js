var myApp = angular.module('todolist')

myApp.controller('mainController', ['$scope', 'localStorageService', 'taskFactory', '$state', 
	function($scope, localStorageService, taskFactory, $state) {
	// var hcLists = [
	// {
	// 	id: 1,
	// 	name : "Shopping",
	// 	status : "Pending",
	// 	addedOn : '',
	// 	tasks : [
	// 		{
	// 			id: 1,
	// 			name : "Get Eggs",
	// 			status : "Pending",
	// 			addedOn : '',
	// 		},
	// 		{
	// 			id: 1,
	// 			name : "Get Milk",
	// 			status : "Pending",
	// 			addedOn : '',
	// 		},
	// 		{
	// 			id: 1,
	// 			name : "Make Bed",
	// 			status : "Completed",
	// 			addedOn : '',
	// 		},
	// 		{
	// 			id: 1,
	// 			name : "Write awesome code",
	// 			status : "Pending",
	// 			addedOn : '',
	// 		}
	// 	]
	// },
	// {
	// 	id: 2,
	// 	name : "Programming",
	// 	status : "Pending",
	// 	addedOn : '',
	// },
	// {
	// 	id: 3,
	// 	name : "Chores",
	// 	status : "Completed",
	// 	addedOn : '',
	// }
	// ]

	$scope.allTasks = [
	
	]

	// localStorageService.set('lists', hcLists)

	var taskList = new taskFactory()

	$scope.allLists = taskList.lists


	$scope.newList = function() {
		$("#newList").modal()
	}

	$scope.addList = function() {
		$("#newList").modal()
		var name = $scope.newListName
		var newID = ($scope.allLists.length === 0) ? 1 : $scope.allLists.length + 1

		var newListItem = {
			id: newID,
			name: name,
			addedOn: new Date(),
			tasks: []
		}
		taskList.addToLocalLists(newListItem)
		$scope.allLists = taskList.lists
	}

	$scope.deleteList = function(id) {
		taskList.deleteLocalListItem(id)
		$scope.allLists = taskList.lists
	}

	$scope.goToTask = function(id) {
		console.log(id)
		$state.go('task', {'id' : id})
	}
}])