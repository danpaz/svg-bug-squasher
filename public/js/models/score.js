define([
  'underscore',
  'backbone'
  ], function(_, Backbone) {
    'use strict';

    var Level = Backbone.Model.extend({

      defaults: {
        score: 0
      },

      // Increment score by an integer `inc`.
      increment: function (inc) {
        var newScore = this.attributes.score + inc;

        this.set({
          score: newScore
        });
      },

      reset: function () {
        this.set({
          score: 0
        });
      }

    });

    return new Level;
  });
