module.exports = function($scope, $http, Species) {

	var type = "TAXON";
	var key = Species.selectedID;
	var resolution = 8;
	var layer = "";
	var palette = "yellows_reds";
	var colors = "";
	var saturation = "";
	var hue = "";

	var mapOptions = {
		zoom: 2,
		minZoom: 2,
		center: new google.maps.LatLng(0,0),
		streetViewControl: false
	};

	// Normalizes the coords that tiles repeat across the x axis (horizontally)
	// like the standard Google map tiles.
	function getNormalizedCoord(coord, zoom) {
	  var y = coord.y;
	  var x = coord.x;
	
	  // tile range in one direction range is dependent on zoom level
	  // 0 = 1 tile, 1 = 2 tiles, 2 = 4 tiles, 3 = 8 tiles, etc
	  var tileRange = 1 << zoom;
	
	  // don't repeat across y-axis (vertically)
	  if (y < 0 || y >= tileRange) {
		return null;
	  }
	
	  // repeat across x-axis
	  if (x < 0 || x >= tileRange) {
		x = (x % tileRange + tileRange) % tileRange;
	  }
	
	  return {
		x: x,
		y: y
	  };
	}

	function GBIFMapType(tileSize) {
	  this.tileSize = tileSize;
	}

	GBIFMapType.prototype.getTile = function(coord, zoom, ownerDocument) {	
		var div = ownerDocument.createElement('div');

		var normalizedCoord = getNormalizedCoord(coord, zoom);
		if (!normalizedCoord) {
			return null;
		}  

		// http://www.gbif.org/developer/maps
		var url = 'http://api.gbif.org/v1/map/density/tile?'
			+'x=' + normalizedCoord.x
			+'&y=' + normalizedCoord.y
			+'&z=' + zoom
			+'&type=' + type
			+'&key=' + key
			+'&resolution=' + resolution
			+'&palette=' + palette;

		div.innerHTML = '<img src="' + url + '"/>';
		div.style.width = this.tileSize.width + 'px';
		div.style.height = this.tileSize.height + 'px';

		return div;
	};      

	$scope.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);


	function updateOverlay() {
		$scope.map.overlayMapTypes.clear();
		$scope.map.overlayMapTypes.insertAt(0, new GBIFMapType(new google.maps.Size(256, 256)));
	}

	updateOverlay();




	$scope.$watch(function () { return Species.selectedID }, function (newVal, oldVal) {
	    if (typeof newVal !== 'undefined') {
	    	console.log("Map says: " + Species.selectedID);
	    	key = Species.selectedID;
	    	updateOverlay();
	    }
	});
};