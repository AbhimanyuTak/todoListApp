var myApp = angular.module('todolist')

myApp.controller('taskController', ['$scope', 'localStorageService', 'taskFactory', '$stateParams', 
	function($scope, localStorageService, taskFactory, $stateParams) {

	var listID = $stateParams.id
	console.log(listID)
	var taskList = new taskFactory()

	$scope.allLists = taskList.lists

	console.log($scope.allLists)

	$scope.thisList = $scope.allLists.filter(function(ele) {
		console.log(ele)
		if(ele.id == listID)
			return ele
	})[0]


	$scope.allTasks = $scope.thisList.tasks

	$scope.newTask = function() {
		$("#newTask").modal()
	}

	$scope.addTask = function() {
		$("#newTask").modal()
		var name = $scope.newListName
		var newID = ($scope.allLists.length === 0) ? 1 : $scope.allLists.length + 1

		var newTaskItem = {
			id: newID,
			name: name,
			addedOn: new Date(),
			status: "Pending"
		}

		taskList.addLocalTasks(listID, newTaskItem)
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