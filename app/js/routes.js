module.exports = function($routeProvider) {
	
	$routeProvider

	.when("/", {
		templateUrl: "./partials/main.html"
	})
	
	.otherwise({
		redirectTo: '/'
	});

}