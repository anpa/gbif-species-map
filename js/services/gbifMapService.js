module.exports = function() {

	var urlBase = "http://api.gbif.org/v1/map/density/tile?";
	var mapFactory = {};

	mapFactory.parameters = {
		type: "TAXON",
		key: "",
		resolution: 8,
		layer: "",
		palette: "yellows_reds",
		colors: "",
		saturation: "",
		hue: ""
	};

	mapFactory.setTileSize = function(tileSize) {
		this.tileSize = tileSize;
	}

	//returns the GBIF tile URL with the parameters
	mapFactory.getURL = function(coord, zoom) {

		var normalizedCoord = this.getNormalizedCoord(coord, zoom);
		if (!normalizedCoord)
			return null;

		return urlBase
			+ 		'x=' + normalizedCoord.x
			+ '&' + 'y=' + normalizedCoord.y
			+ '&' + 'z=' + zoom
			+ '&' + 'type=' + this.parameters.type
			+ '&' + 'key=' + this.parameters.key
			+ '&' + 'resolution=' + this.parameters.resolution
			+ '&' + 'palette=' + this.parameters.palette;
	}

	//returns the HTML element with the tile
	mapFactory.getTile = function(coord, zoom, ownerDocument) {	
		var div = ownerDocument.createElement('div');
		var tileURL = this.getURL(coord, zoom);

		if(!tileURL) return;

		div.innerHTML = '<img src="' + tileURL + '"/>';
		div.style.width = this.tileSize.width + 'px';
		div.style.height = this.tileSize.height + 'px';

		return div;
	};

	//sets the layer's specie
	mapFactory.setSpecie = function(speciesKey) {
		this.parameters.key = speciesKey;
	}

	//gets the layer's specie speciesKey
	mapFactory.getSpecie = function() {
		return this.parameters.key;
	}

	// Normalizes the coords that tiles repeat across the x axis (horizontally) like the standard Google map tiles.
	mapFactory.getNormalizedCoord = function(coord, zoom) {
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
	
	  return { x: x, y: y };
	}

	return mapFactory;
};