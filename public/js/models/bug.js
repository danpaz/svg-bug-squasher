define([
  'underscore',
  'backbone'
  ], function(_, Backbone) {
    'use strict';

    var Bug = Backbone.Model.extend({

      defaults: {
        alive: true
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
