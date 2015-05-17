(function () {

'use strict';

require('angular');
require('angular-route');

var mapController = require('./controllers/mapController');
var speciesController = require('./controllers/speciesController');

var speciesService = require('./services/speciesService');
//var mapService = require('./services/mapService');

angular.module('speciesApp', ['ngRoute'])

  //ROUTES

  .config(['$routeProvider', function($routeProvider) {
      $routeProvider
        .when("/", {
          templateUrl: "./partials/main.html"
        })
        .otherwise({
           redirectTo: '/'
        });
    }
  ])
  
  //SERVICES
  .factory('Species', speciesService)
  //.factory('MapOptions')

  //CONTROLLERS
  .controller('MapController', ['$scope', '$http', 'Species', mapController])
  .controller('SpeciesController', ['$scope', '$http', 'Species', speciesController])

  //DIRECTIVES
  .directive('map', function() {
    return {
      restrict: 'E',
      templateUrl: './partials/mapView.html',
      controller: 'MapController'
    }
  })

  .directive('species', function() {
    return {
      restrict: 'E',
      templateUrl: './partials/speciesView.html',
      controller: 'SpeciesController'
    }
  })

}());