(function () {

'use strict';

require('angular');
require('angular-route');

angular.module('speciesApp', ['ngRoute'])

  //ROUTES
  .config(['$routeProvider', require('./routes.js')])
  
  //SERVICES
  .factory('SpeciesService', ['$http', require('./services/speciesService')])
  .factory('GBIFMapService', require('./services/gbifMapService'))

  //CONTROLLERS
  .controller('SearchController', ['$scope', 'SpeciesService', 'GBIFMapService', require('./controllers/searchController')])
  .controller('MapController', ['$scope', 'GBIFMapService', require('./controllers/mapController')])

  //DIRECTIVES
  .directive('map', require('./directives/mapDirective'))
  .directive('search', require('./directives/searchDirective'));

}());