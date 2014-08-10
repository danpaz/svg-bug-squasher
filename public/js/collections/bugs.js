define([
  'underscore',
  'backbone',
  'models/bug',
  'svg'
], function (_, Backbone, Bug, SVG) {
  'use strict';

  // Constants.
  var DIFFICULTIES = [
    {
      type: 'hard',
      size: 10,
      speed: 1000
    },
    {
      type: 'medium',
      size: 20,
      speed: 2000
    },
    {
      type: 'easy',
      size: 30,
      speed: 3000
    }
  ]

  // The poor things have names!
  var NAMES = ['Buggie', 'Bugster', 'Bugonnie', 'Bugs Bunny', 'Bug Wilson',
              'Bugady', 'Misterbug', 'Ladybug', 'Bugs', 'Bugroonie'];

  // TODO: variable colors.
  // TODO: random vertical starting position.
  // Private SVG draw function.
  var _draw = function (el, radius) {
    var draw = SVG(el).size('100%', radius * 2).fixSubPixelOffset();
    var circ = draw.circle(radius * 2).attr({
      fill: '#000',
      position: 'absolute',
      top: '400px'
    });
    var group = draw.group();
    group.add(circ);
    return group;
  }

  var BugsCollection = Backbone.Collection.extend({

    model: Bug,

    url: '/api/bugs',

    draw: function (el, size, speed) {
      var group = _draw(el, size);
      group.animate(speed, '=').move(1200, 0);
    },

    remaining: function () {
      return this.where({alive: true});
    },

    squashed: function () {
      return this.where({alive: false});
    },

    name: function () {
      return _.sample(NAMES);
    },

    difficulty: function () {
      return _.sample(DIFFICULTIES);
    }

  });

  return new BugsCollection();
});
