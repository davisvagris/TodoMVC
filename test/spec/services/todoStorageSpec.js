'use strict';

describe('Service todoStorage', function() {

    var data, todoStorage;
    beforeEach(function() {
        data = [
            {
                title: 'jasmine',
                complete: false
            }
        ];

        module('todoApp');
        inject(function(_todoStorage_) {
            todoStorage = _todoStorage_;
        });

        localStorage.clear();
    });

    it('Set and read data', function() {
        todoStorage.put(data);
        expect(todoStorage.get()).toEqual(data);
    });

    it('Get empty data', function() {
        expect(todoStorage.get()).toEqual([]);
    });
});