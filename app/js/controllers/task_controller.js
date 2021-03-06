var myApp = angular.module('todolist')

myApp.controller('taskController', ['$scope', 'localStorageService', 'taskFactory', '$stateParams', 
	function($scope, localStorageService, taskFactory, $stateParams) {

	var listID = $stateParams.id
	console.log(listID)
	var taskList = new taskFactory()
	$scope.allLists = taskList.lists

	function updateTasks() {
		$scope.thisList = $scope.allLists.filter(function(ele) {
			if(ele.id == listID)
				return ele
		})[0]

		$scope.allTasks = $scope.thisList.tasks
	}

	updateTasks()

	$scope.newTask = function() {
		$("#newTask").modal()
	}

	$scope.addTask = function() {
		$("#newTask").modal()
		console.log("new task")
		var name = $scope.newTaskName
		var newID = ($scope.thisList.tasks.length === 0) ? 1 : $scope.thisList.tasks.length + 1

		var newTaskItem = {
			id: newID,
			name: name,
			addedOn: new Date(),
			status: false
		}

		taskList.addLocalTasks(listID, newTaskItem)
		$scope.allLists = taskList.lists
		updateTasks()
	}

	$scope.updateTask = function($event, tid, status) {
		taskList.updateLocalTask(listID, tid, status)
		updateTasks()
	}

	$scope.deleteTask = function(tid) {
		taskList.deleteLocalTask(listID, tid)
		$scope.allLists = taskList.lists
		updateTasks()
	}


}])