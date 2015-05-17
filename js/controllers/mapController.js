module.exports = function($scope, Map) {

	//Google Maps options
	var mapOptions = {
		zoom: 2,
		minZoom: 2,
		center: new google.maps.LatLng(0,0),
		streetViewControl: false
	};

	//creates map canvas
	$scope.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	//updates map with the GBIF tiles
	function updateOverlay() {
		Map.setTileSize(new google.maps.Size(256, 256));
		$scope.map.overlayMapTypes.clear();
		$scope.map.overlayMapTypes.insertAt(0, Map);
	}
	updateOverlay();

	//Watches for changes 
	$scope.$watch( function() { return Map.parameters.key }, function (newVal, oldVal) {
	    if (typeof newVal !== 'undefined') {
	    	updateOverlay();
	    }
	});
};