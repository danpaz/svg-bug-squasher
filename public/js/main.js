'use strict'

// Require.js allows us to configure shortcut alias
require.config({
  // The shim config allows us to configure dependencies for
  // scripts that do not call define() to register a module
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: [
        'underscore',
        'jquery'
      ],
      exports: 'Backbone'
    }
  },
  // TODO: bower_components folder should be in root dir.
  paths: {
    jquery: '../bower_components/jquery/jquery',
    underscore: '../bower_components/underscore/underscore',
    backbone: '../bower_components/backbone/backbone',
    text: '../bower_components/requirejs-text/text',
    svg: '../bower_components/svg.js/dist/svg'
  }
});

require([
  'backbone',
  'views/app'
], function (Backbone, AppView) {

  // Initialize the application view
  new AppView();

});
