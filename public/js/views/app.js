define([
  'jquery',
  'underscore',
  'backbone',
  'models/level',
  'models/score',
  'collections/bugs',
  'views/bugs',
  'views/welcome',
  'text!templates/stats.html'
], function ($, _, Backbone, Level, Score, Bugs, BugView, WelcomeView, statsTemplate) {
  'use strict';

  // Module-level scope.
  var WelcomeView = new WelcomeView;

  // Our overall **AppView** is the top-level piece of UI.
  var AppView = Backbone.View.extend({

    el: '#bugsapp',

    // Use underscore's templating engine.
    template: _.template(statsTemplate),

    events: {
      'click #bugs-cleanup': 'endGame',
      'click #bugs-new':     'addBug',
      'click #start-game':   'startGame'
    },

    initialize: function() {
      // Cache our jqueries.
      this.$header = this.$('#header');
      this.$main   = this.$('#main');
      this.$welcome = this.$('#welcome');

      // Bind functions to events.
      this.listenTo(Bugs, 'all', this.render);
      this.listenTo(Score, 'all', this.render);

      // Show the welcome screen on app startup.
      this.showWelcome();
    },

    render: function () {
      var squashed = Bugs.squashed().length;
      var numBugs = Level.attributes.numBugs;
      var level = Level.attributes.level;
      var score = Score.attributes.score;

      this.$header.html(this.template({
        level: level,
        squashed: squashed,
        numBugs: numBugs,
        score: score
      }));

      return this;
    },

    startGame: function () {
      this.hideWelcome();

      // Call in the bugs!
      this.bugManager();
    },

    endGame: function () {
      window.clearInterval(this.intervalID);
      this.clearAll();
      console.log('ended');
      return false;
    },

    hideMain: function () {
      this.$main.hide();
    },

    showWelcome: function () {
      var elem = WelcomeView.render();
      WelcomeView.$el.show();
    },

    hideWelcome: function (view) {
      WelcomeView.$el.hide();
    },

    // Generate the attributes for a new Bug.
    newAttributes: function () {
      return {
        id: _.uniqueId(),
        name:  Bugs.name(),
        difficulty: Bugs.difficulty()
      };
    },

    bugManager: function () {
      var self = this;
      self.addBug();
      var interval = Level.attributes.interval;

      this.intervalID = window.setInterval(function() {
        self.addBug();
      }, interval);
    },

    // Adds a new bug to the collection and to the view.
    addBug: function () {
      var bug = Bugs.create(this.newAttributes());
      var view = new BugView({ model: bug });
      var elem = view.render().el;
      this.$main.append(elem);

      var size = bug.attributes.difficulty.size;
      var speed = bug.attributes.difficulty.speed;
      var bugGroup = Bugs.draw(elem, size, speed);
    },

    // Clear all  bugs, destroying their models.
    clearAll: function () {
      _.invoke(Bugs.all(), 'destroy');
      return false;
    }

  });

  return AppView;
});
