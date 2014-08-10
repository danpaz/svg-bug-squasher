define([
  'jquery',
  'underscore',
  'backbone',
  'models/level',
  'collections/bugs',
  'views/bugs',
  'text!templates/stats.html'
], function ($, _, Backbone, Level, Bugs, BugView, statsTemplate) {
  'use strict';

  // Our overall **AppView** is the top-level piece of UI.
  var AppView = Backbone.View.extend({

    el: '#bugsapp',

    // Use underscore's templating engine.
    template: _.template(statsTemplate),

    events: {
      'click #bugs-cleanup': 'clearSquashed',
      'click #bugs-new':     'addBug'
    },

    initialize: function() {
      // Cache our jqueries.
      this.$header = this.$('#header');
      this.$main   = this.$('#main');

      // Bind functions to events.
      this.listenTo(Bugs, 'all', this.render);

      // Renders on load. Could also create event 'gamestart'.
      this.render();

      // Call in the bugs!
      this.bugManager();

      Bugs.fetch({reset: true});
    },

    render: function () {
      var remaining = Bugs.remaining().length;
      var level = Level.current('level');

      this.$header.html(this.template({
        level: level,
        remaining: remaining
      }));

      return this;
    },

    // Generate the attributes for a new Bug.
    newAttributes: function () {
      return {
        name:  Bugs.name()
      };
    },

    bugManager: function () {
      var self = this;
      self.addBug();
      var interval = Level.current('interval');

      // TODO: enable
      // this.intervalID = window.setInterval(function() {
      //   self.addBug();
      // }, interval);
    },

    // Adds a new bug to the collection and to the view.
    addBug: function () {
      var bug = Bugs.create(this.newAttributes());
      var view = new BugView({ model: bug });
      var elem = view.render().el;
      this.$main.append(elem);

      Bugs.draw(elem, 200, 200);
    },

    // Clear all squashed bugs, destroying their models.
    // TODO this doesn't yet sync with the server.
    clearSquashed: function () {
      _.invoke(Bugs.squashed(), 'destroy');
      return false;
    }

  });

  return AppView;
});
