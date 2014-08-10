define([
  'jquery',
  'underscore',
  'backbone',
  'svg'
], function ($, _, Backbone, SVG) {
  'use strict';

  var BugView = Backbone.View.extend({

    // Use client id to identify bugs.
    id: function () {
      return 'bug-' + this.model.cid;
    },

    className: "bug",

    // DOM events specific to a bug.
    events: {
      // 'g' is the SVG group element.
      "click g": "squash"
    },

    // Render the bug view.
    render: function () {
      return this;
    },

    squash: function () {
      this.model.squash();
    },

    // Remove the item, destroy the model, and delete its view.
    clear: function () {
      this.model.destroy();
    }
  });

  return BugView;
});
