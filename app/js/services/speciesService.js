module.exports = function($http) {

	var urlBase = "http://api.gbif.org/v1/species/search";
	var speciesFactory = {};

	speciesFactory.search = function(query) {
		console.log("Searching for species...");
		return $http.get( urlBase, {
			params: {
                "q": query,
                "language": "en",
                "datasetKey": "d7dddbf4-2cf0-4f39-9b2a-bb099caae36c",
                "rank": "species"
            }});
	}

	return speciesFactory;
};