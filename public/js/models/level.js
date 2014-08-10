define([
  'underscore',
  'backbone'
  ], function(_, Backbone) {
    'use strict';

    // Constants.
    var LEVEL_START = 1,
        INTERVAL_START = 2000,
        NUM_BUGS_START = 10;

    // Properties associated with a specific level.
    // There is no max level.
    var Level = Backbone.Model.extend({

      defaults: {
        level: LEVEL_START,
        interval: INTERVAL_START,
        numBugs: NUM_BUGS_START
      },

      increment: function () {
        var nextLevel = this.attributes.level + 1;

        // A simple equation to decrease the interval for each level.
        var nextInterval = this.attributes.interval / nextLevel;

        var nextNumBugs = this.attributes.numBugs + 5;

        this.set({
          level: nextLevel,
          interval: nextInterval,
          numBugs: nextNumBugs
        });
      },

      current: function (prop) {
        return this.get(prop);
      }

    });

    return new Level;
  });
