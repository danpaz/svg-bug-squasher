define([
  'underscore',
  'backbone'
  ], function(_, Backbone) {
    'use strict';

    // Constants.
    var SMALL_SIZE = 1,
        MEDIUM_SIZE = 2,
        LARGE_SIZE = 3,
        LOW_SPEED = 1,
        MEDIUM_SPEED = 2,
        HIGH_SPEED = 3;

    var Bug = Backbone.Model.extend({

      alive: true,
      // Dead bug.
      squash: function() {
        this.set({
          alive: false
        });
      }

    });

    var easyBug = Bug.extend({
      size:  LARGE_SIZE,
      speed: LOW_SPEED
    });

    var mediumBug = Bug.extend({
      size:  MEDIUM_SIZE,
      speed: MEDIUM_SPEED
    });

    var hardBug = Bug.extend({
      size:  SMALL_SIZE,
      speed: HIGH_SPEED
    });

    return Bug;
  });
