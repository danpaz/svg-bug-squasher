define([
  'jquery',
  'underscore',
  'backbone',
  'models/score',
  'svg'
], function ($, _, Backbone, Score, SVG) {
  'use strict';

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
      var points = 0;
      console.log(this.model.attributes.difficulty);
      switch(this.model.difficulty) {

      }

      Score.increment(1);
    },

    // Remove the item, destroy the model, and delete its view.
    clear: function () {
      this.model.destroy();
    }
  });

  return BugView;
});
