var myApp = angular.module('todolist')

myApp.factory('taskFactory', ['localStorageService', function(localStorageService) {
	var List = function() {
		this.listCount = 0
		this.lists = []
		this.getLocalLists()
	}

	List.prototype.getLocalLists = function() {
		if(localStorageService.get('lists') != undefined) {
			this.lists = localStorageService.get('lists');
		}
	}

	List.prototype.addToLocalLists = function(listObj) {
		if(localStorageService.get('lists') == undefined) {
			localStorageService.set('lists', [listObj])
		}
		else {
			var allLists = localStorageService.get('lists')
			allLists.push(listObj)
			console.log(allLists)
			console.log(listObj)
			localStorageService.set('lists', allLists)
			this.lists = allLists
		}
	}

	List.prototype.deleteLocalListItem = function(id) {
		var allLists = localStorageService.get('lists')
		allLists = allLists.filter(function(ele) {
			if(ele.id !== id) return ele
		})

		localStorageService.set('lists', allLists)
		this.lists = allLists
	}

	List.prototype.getLocalTasks = function(idn) {
		var allLists = this.lists
		for(var i in allLists) {
			if(allLists[i].id === idn) {
				return allLists[i]
			}
		}

		allLists = allLists.filter(function(ele) {
			if(ele.id === idn) return ele
		})
		
		return allLists
	}

	List.prototype.addLocalTasks = function(idn, taskObj) {
		var allLists = this.lists
		for(var i in allLists) {
			if(allLists[i].id === idn) {
				allLists[i].tasks.push(taskObj)
			}
		}

		localStorageService.set('lists', allLists)
		this.lists = allLists
		return []
	}

	List.prototype.deleteLocalTask = function(id, taskID) {
		var allLists = localStorageService.get('lists')

		for(var i in allLists) {
			if(allLists[i].id === id) {
				for(var j in allLists.tasks) {
					if(allLists[i].tasks[j].id === taskID) {
						allLists[i].tasks.splice(j, 1);
						break;
					}
				}
				break;
			}
		}

		localStorageService.set('lists', allLists)
		this.lists = allLists
	}

	return List
}])