define([
  'underscore',
  'backbone',
  'models/bug',
  'svg'
], function (_, Backbone, Bug, SVG) {
  'use strict';

  // Constants.
  var SIZES  = [10, 20, 30],
      SPEEDS = [1000, 2000, 3000];

  // The poor things have names!
  var NAMES = ['Buggie', 'Bugster', 'Bugonnie', 'Bugs Bunny', 'Bug Wilson',
              'Bugady', 'Misterbug', 'Ladybug', 'Bugs', 'Bugroonie'];

  // TODO: variable colors.
  // Private SVG drawing function.
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

    draw: function (el) {
      // Random size and speed.
      var radius = _.sample(SIZES);
      var speed  = _.sample(SPEEDS);

      var group = _draw(el, radius);
      group.animate(speed, '=').move(1200, 0);
    },

    remaining: function () {
      return this.where({alive: true});
    },

    squashed: function () {
      return this.where({alive: false});
    },

    name: function() {
      return _.sample(NAMES, 1);
    }

  });

  return new BugsCollection();
});
