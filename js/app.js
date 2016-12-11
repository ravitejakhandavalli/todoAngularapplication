angular.module("ToDo",['LocalStorageModule'])

.controller("toDoContoller",["$scope","$filter","localStorageService", function($scope,$filter, localStorageService){

	
	$scope.allTasks = [];
	$scope.completedTasks = [];
	
	if(localStorageService.get('allTasks'))
		$scope.allTasks = localStorageService.get('allTasks');
		
	if(localStorageService.get('completedTasks'))
	$scope.completedTasks = localStorageService.get('completedTasks');
	
	$scope.taskType = true; /* if true show pending tasks  else show completed tasks*/
	$scope.type = "AllTask";
	
	
	var updatingTaskIndex;

	$scope.newField = {};
     $scope.editing = false;

	$scope.AddTask = function(){
		if(event.which == 13 && $scope.taskName !="" && $scope.taskDesc !=""){
			console.log("task add event initialised");
			$scope.task('add');
		}
	};

	$scope.task = function(action) {
		switch(action){
			case 'add' 		:  		console.log("add button");
									if($scope.taskName && $scope.taskDesc){
									$scope.allTasks.push({taskName : $scope.taskName.trim(), taskDesc : $scope.taskDesc.trim()});
									$scope.taskName = '';
									$scope.taskDesc = '';
									localStorageService.set('allTasks',$scope.allTasks);
									
									console.log(localStorageService.get('allTasks'));
								}
								break;
			case 'update' 	: 	if($scope.updatedName && $scope.updatedDesc){
									console.log(event.target.innerText);
									$scope.allTasks.splice(updatingTaskIndex,1);
									$scope.allTasks.splice(updatingTaskIndex, 0, {taskName : $scope.updatedName ,taskDesc : $scope.updatedDesc});
									$scope.updatedName = '';
									$scope.updatedDesc = '';
									
									localStorageService.set('allTasks',$scope.allTasks);

								}
			
		}
	}	

	
$scope.editAppKey = function(task) {
	updatingTaskIndex = $scope.allTasks.indexOf(task);
	console.log($scope.allTasks.indexOf(task));
    $scope.editing = true;
    console.log($scope.editing);
   $scope.newField = angular.copy(task);
    console.log($scope.newField);
}

$scope.saveEdit = function($index) {
	console.log("save triggere");
    if ($scope.editing !== false) {
    	$scope.updatedName = $scope.allTasks[$index].taskName;
		$scope.updatedDesc = $scope.allTasks[$index].taskDesc;
		$scope.task('update');
        $scope.editing = false;
    }       
};

$scope.cancel = function() {
    if ($scope.editing !== false) {
        $scope.allTasks[updatingTaskIndex] = $scope.newField;
        $scope.editing = false;
    }       
};

	
	$scope.taskCompleted = function(index){
		var completed = $scope.allTasks.splice(index,1);
		localStorageService.set('allTasks',$scope.allTasks);
		$scope.completedTasks.push(completed[0]);
		localStorageService.set('completedTasks',$scope.completedTasks);
		console.log(localStorageService.get('completedTasks'));
		console.log($scope.completedTasks);
		console.log('------------completedTasks-------------------------');
		console.log($scope.allTasks);
		console.log('------------pendingTasks-------------------------');
	}
	$scope.taskNotCompleted = function(index){
		var Notcompleted = $scope.completedTasks.splice(index,1);
		localStorageService.set('completedTasks',$scope.completedTasks);
		$scope.allTasks.push(Notcompleted[0]);
		localStorageService.set('allTasks',$scope.allTasks);
		console.log(localStorageService.get('allTasks'));
		console.log($scope.completedTasks);
		console.log('------------completedTasks-------------------------');
		console.log($scope.allTasks);
		console.log('------------pendingTasks-------------------------');
	}

	$scope.$watch('taskType',function(){
		$scope.type = $scope.taskType == false?'CompletedTask':'AllTask';
	});

		$scope.removeTask = function(type, index){
			if(type == 'pending'){
				$scope.allTasks.splice(index, 1);
				localStorageService.set('allTasks',$scope.allTasks);
			} else {
				$scope.completedTasks.splice(index, 1);
				localStorageService.set('completedTasks',$scope.completedTasks);
			}
		}
}]);