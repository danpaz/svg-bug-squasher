define([
  'underscore',
  'backbone'
  ], function(_, Backbone) {
    'use strict';

    var Bug = Backbone.Model.extend({

      urlRoot: '/api/bugs',

      defaults: {
        alive: true,
        difficulty: 'easy'
      },

      // Dead bug.
      squash: function () {
        this.set({
          alive: false
        });
      },

      isAlive: function () {
        return this.get('alive') === true;
      }

    });

    return Bug;
  });
