define([
  'underscore',
  'backbone',
  'models/bug'
], function (_, Backbone, Bug) {
  'use strict';

  var BugsCollection = Backbone.Collection.extend({
    // Reference to this collection's model.
    model: Bug,

    // Filter down the list to only todo items that are still not finished.
    remaining: function () {
      return this.where({alive: true});
    }

  });

  return new BugsCollection();
});
