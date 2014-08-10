define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/welcome.html'
], function ($, _, Backbone, welcomeTemplate) {
  'use strict';

  var WelcomeView = Backbone.View.extend({

    el: '#main',

    template: _.template(welcomeTemplate),

    render: function () {
      return this.template();
    }

  });

  return WelcomeView;
});
