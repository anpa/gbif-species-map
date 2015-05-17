module.exports = function($scope, $http, Species) {

    $scope.keywords = "";
    $scope.selectedID = Species.selectedID;


    $scope.search = function() {
        console.log($scope.keywords);
        Species.selectedID = "";
         $scope.selectedID = "";

        $http.get("http://api.gbif.org/v1/species/search", {
            params: {
                "q": $scope.keywords,
                "language": "en",
                "datasetKey": "d7dddbf4-2cf0-4f39-9b2a-bb099caae36c",
                "rank": "species"
            }})

            .success(function(data, status, headers, config) {
                console.log(data);
                $scope.species = data.results;
            })
            .error(function(data, status, headers, config) {
                console.log("error");
            });
    };

    $scope.selectSpecies = function(specieID) {
        Species.selectedID = specieID;
        $scope.selectedID = specieID;
    }

    $scope.getImageURL = function(specieID) {

        $http.get("http://www.gbif.org/species/" + specieID)

        .success(function(data) {
            var html = $.parseHTML(data);
            var img = $(html).find( '.species_image img' );
            console.log(img);
        })
        .error(function(error) {
            console.log("error");
        })

    }
};