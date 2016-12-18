
var myapp = angular.module('todoApplication',['LocalStorageModule','ngMaterial','ngMessages']);

myapp.controller('mainController',["$scope","$filter","localStorageService", function($scope,$filter,localStorageService) {
  console.log("initiated");

$scope.allTasks= [];
$scope.completedTasks = [];

if(localStorageService.get('allTasks'))
  $scope.allTasks = localStorageService.get('allTasks');

if(localStorageService.get('completedTasks'))
$scope.completedTasks = localStorageService.get('completedTasks');

/*$scope.taskType = true;  if true show pending tasks  else show completed tasks*/
$scope.type = "PendingTask";
var navigationHeight =0;
var updatingTaskIndex;

$scope.taskName = '';
$scope.myDate = '';
$scope.taskDesc='';
$scope.newField = {};

$scope.editing = false;

$scope.modalShown = false;
$scope.toggleModal = function(tasks) {
  $scope.modalShown = !$scope.modalShown;
  $scope.taskToEdit = tasks;
  updatingTaskIndex = $scope.allTasks.indexOf($scope.taskToEdit);
};

$scope.currentNavItem = 'Today';

  $scope.AddTask = function(){

    if($scope.taskName != '' && $scope.myDate != ''){
      console.log("taskName is:"+$scope.taskName,$scope.myDate);
     $scope.task('add');
    }
  };

  $scope.task = function(action){
    switch(action) {
      case 'add' :  $scope.allTasks.push({ TaskTitle: $scope.taskName, TaskDate: $scope.myDate , TaskDesc : $scope.taskDesc});
                    localStorageService.set('allTasks',$scope.allTasks);
                    $scope.taskName = '';
                    $scope.taskDesc='';
                    break;
    case 'update' : if($scope.updatedName != null && $scope.updatedDesc !=null && $scope.updatedDate !=null){
                  //  $scope.allTasks.splice(updatingTaskIndex,1);
                    // $scope.allTasks.splice(updatingTaskIndex, 0, {TaskTitle : $scope.updatedName ,TaskDate :$scope.updatedDate, TaskDesc : $scope.updatedDesc});
                    $scope.allTasks[updatingTaskIndex].TaskTitle = $scope.updatedName;
                    $scope.allTasks[updatingTaskIndex].TaskDate = $scope.updatedDate;
                    $scope.allTasks[updatingTaskIndex].TaskDesc = $scope.updatedDesc;
                   localStorageService.set('allTasks',$scope.allTasks);
                    }

      }

  }

  $scope.taskCompleted = function(index){
		var completed = $scope.allTasks.splice(index,1);
		localStorageService.set('allTasks',$scope.allTasks);
		$scope.completedTasks.push(completed[0]);
		localStorageService.set('completedTasks',$scope.completedTasks);
}

  $scope.taskNotCompleted = function(index){
		var Notcompleted = $scope.completedTasks.splice(index,1);
		localStorageService.set('completedTasks',$scope.completedTasks);
		$scope.allTasks.push(Notcompleted[0]);
		localStorageService.set('allTasks',$scope.allTasks);
}

  $scope.editAppKey = function(taskToEdit) {
  	updatingTaskIndex = $scope.allTasks.indexOf(taskToEdit);
    $scope.editing = true;
      // console.log($scope.editing);
     $scope.newField = angular.copy(taskToEdit);
      // console.log($scope.newField);
  }

  $scope.saveEdit = function() {
      if ($scope.editing !== false) {
          $scope.updatedName = $scope.allTasks[updatingTaskIndex].TaskTitle;
      		$scope.updatedDesc = $scope.allTasks[updatingTaskIndex].TaskDesc;
          $scope.updatedDate = $scope.allTasks[updatingTaskIndex].TaskDate;
          // console.log($scope.updatedName,$scope.updatedDesc,$scope.updatedDate);
      		$scope.task('update');
          $scope.editing = false;
      }
  };


  $scope.cancel = function() {
      if ($scope.editing !== false ) {
          $scope.allTasks[updatingTaskIndex] = $scope.newField;
          $scope.editing = false;
      }
  };


$scope.removeTask = function(type, index){
      if(type == 'pending'){
        $scope.allTasks.splice(index, 1);
        localStorageService.set('allTasks',$scope.allTasks);
      } else {
        $scope.completedTasks.splice(index, 1);
        localStorageService.set('completedTasks',$scope.completedTasks);
      }
    };



}]);


/**
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that can be foundin the LICENSE file at http://material.angularjs.org/HEAD/license.
**/
