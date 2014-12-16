/* global app: true */
app.factory('todoStorage', function(config) {
    'use strict';

    var key = config.storage;
    return {
        get: function() {
            return JSON.parse(localStorage.getItem(key) || '[]');
        },

        put: function(data) {
            localStorage.setItem(key, JSON.stringify(data));
        }
    };
});