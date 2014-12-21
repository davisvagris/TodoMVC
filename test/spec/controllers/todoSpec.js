'use strict';

describe('Controllers Todo', function() {

    var scope, controller, data, filterFilter;
    beforeEach(function() {
        data = [
            {
                title: 'jasmine',
                complete: false
            },
            {
                title: 'jasmine2',
                complete: true
            }
        ];

        module('todoApp');
        inject(function($controller, $rootScope, $filter) {
            filterFilter = $filter('filter');
            scope = $rootScope.$new();
            controller = $controller('TodoController', {
               $scope: scope
            });
        });
    });

    it('Change scope links to active and change filters', function() {
        scope.link('/active');
        expect(scope.todoFilter).toEqual({ complete: false });
    });

    it('Change scope links to completed and change filters', function() {
        scope.link('/completed');
        expect(scope.todoFilter).toEqual({ complete: true });
    });

    it('Add empty task', function() {
        scope.title = '';
        expect(scope.add()).toEqual(false);
    });

    it('Add task', function() {
        scope.title = 'jasmine';
        scope.add();
        expect(scope.title).toEqual('');
    });

    it('Edit task', function() {
        scope.edit = false;
        scope.clickEdit(0);
        expect(scope.edit).toEqual(0);
    });

    it('Done Editing', function() {
        scope.editForm(data[0]);
        expect(scope.edit).toEqual(null);
    });

    it('Done Editing Empty title', function() {
        scope.editForm(data[0]);
        expect(scope.edit).toEqual(null);
    });

    it('Complete all tasks', function() {
        scope.todos = data;
        scope.completed = filterFilter(scope.todos, { complete: true });
        scope.clearComplete();
        expect(scope.todos.length).toEqual(1);
    });

    it('Complete all tasks', function() {
        scope.todos = data;
        scope.all = true;
        scope.completedAll();
        expect(filterFilter(scope.todos, { complete: true }).length).toEqual(2);
    });

    it('Remove tasks', function() {
        scope.todos = data;
        scope.remove(data[0]);
        expect(scope.todos.length).toEqual(1);
    });
});