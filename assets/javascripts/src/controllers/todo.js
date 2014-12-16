/* global app: true */

app.controller('TodoController', function($scope, $location, todoStorage, filterFilter) {
    'use strict';

    $scope.todos = todoStorage.get();
    $scope.title = '';
    $scope.edit = null;

    // Watch variable 'todos'
    $scope.$watch('todos', function() {
        $scope.completed = filterFilter($scope.todos, { complete: true });
        $scope.completedSize = $scope.completed.length;
        $scope.remain = $scope.todos.length - $scope.completedSize;
        $scope.all = !$scope.remain;
        todoStorage.put($scope.todos);
    }, true);

    // Change link
    $scope.link = function(path) {
        $scope.path = path ? path : '/';
        $scope.todoFilter = (path === '/active') ? { complete: false } : (path === '/completed') ? { complete: true } : null;
    };

    $scope.link($location.path());

    // Add task
    $scope.add = function() {
        var title = $scope.title.trim();

        if(title.length === 0) {
            return false;
        }

        $scope.todos.push({
            title: title,
            complete: false
        });

        $scope.title = '';
    };

    // Edit task
    $scope.clickEdit = function(todo) {
        if(!$scope.edit)
        {
            $scope.edit = todo.title;
            return false;
        }

        $scope.edit = null;
    };

    $scope.editForm = function(todo) {
        var title = todo.title.trim();

        if(title.length === 0) {
            $scope.remove(todo);
        }

        $scope.edit = null;
    };

    // Remove task
    $scope.remove = function(todo) {
        $scope.todos.splice($scope.todos.indexOf(todo), 1);
    };

    // Clear all complete tasks
    $scope.clearComplete = function() {
        $scope.completed.forEach(function(todo) {
            $scope.remove(todo);
        });
    };

    // Complete all tasks
    $scope.completedAll = function() {
        $scope.todos.forEach(function(todo) {
            todo.complete = $scope.all;
        });
    };
});