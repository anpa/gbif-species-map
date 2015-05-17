module.exports = function($scope, Species, GBIFMap) {

    $scope.keywords = "";
    $scope.species = null;
    $scope.selectedID = "";

    $scope.searchActive = false;
    $scope.searchError = false;

    //Search function
    $scope.search = function() {
        
        //resets selection
        this.select("");

        //search species with the entered keywords
        Species.search($scope.keywords)
            .success(function(data, status, headers, config) {
                $scope.species = data.results;
                $scope.searchActive = true;
                $scope.searchError = false;
            })
            .error(function(data, status, headers, config) {
                $scope.species = null;
                $scope.searchActive = true;
                $scope.searchError = true;
            });
    };

    //Sets the selected specie and changes map accordingly
    $scope.select = function(specieID) {
        $scope.selectedID = specieID;
        GBIFMap.setSpecie(specieID);
    }

    $scope.clear = function() {
        $scope.keywords = "";
        $scope.species = null;
        $scope.searchActive = false;
        $scope.searchError = false;
        this.select("");
    }
};