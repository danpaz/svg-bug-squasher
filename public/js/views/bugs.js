define([
  'jquery',
  'underscore',
  'backbone',
  'models/score',
  'svg'
], function ($, _, Backbone, Score, SVG) {
  'use strict';

  var points = function (type) {
    var numPoints = 0;
    switch(type) {
      case 'easy':
        numPoints = 1;
        break;
      case 'medium':
        numPoints = 3;
        break;
      case 'hard':
        numPoints = 5;
        break;
      default:
        numPoints = 0;
    }
    return numPoints;
  };

  var BugView = Backbone.View.extend({

    // Use client id to identify bugs.
    id: function () {
      return 'bug-' + this.model.cid;
    },

    className: "bug",

    // DOM events specific to a bug.
    events: {
      // `g` is the SVG group element.
      "click g": "squash"
    },

    // Render the bug view.
    render: function () {
      return this;
    },

    squash: function () {
      this.model.squash();
      var difficulty = this.model.attributes.difficulty.type;
      Score.increment(points(difficulty));
    },

    // Remove the item, destroy the model, and delete its view.
    clear: function () {
      this.model.destroy();
    }
  });

  return BugView;
});
