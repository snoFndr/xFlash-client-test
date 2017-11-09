const _xFlash = require("../src/xFlash.js");

// const _stringToCompare = "Butragueño";
const _stringToCompareForInternamTest = "Butragueno";
const _stringToCompareForWebSearch = "Novakovic";

describe("[xFlash] Tests of Levenshtein Distance",
    function(){
        it("1.  Test that the distance is equal to 0.", function(){
            var result = _xFlash.GetLevenshteinDistance("Butragueno", _stringToCompareForInternamTest);
            expect(result).toEqual(0);
        });
        it("2.  Test that the distance is less than or equal to 2.", function(){
            var result = _xFlash.GetLevenshteinDistance("Boutragueno", _stringToCompareForInternamTest);
            expect(result).toBeLessThanOrEqual(2);
        });
        it("3.  Test that the distance is greater than to 10.", function(){
            var result = _xFlash.GetLevenshteinDistance("ForzaPaninoBoutragueno", _stringToCompareForInternamTest);
            expect(result).toBeGreaterThan(10);
        });
        it("4.  [STG] Populate the distance with web search equal to: '" + _stringToCompareForWebSearch + "' and sort by disctance.", function(){
            var guests = _xFlash._stagingGusetList();
            
            guests.forEach(function(item, index){
                // console.log("name: " + item.name);
                item.distance = _xFlash.GetLevenshteinDistance(item.name, _stringToCompareForWebSearch);
            });
            
            var lastDistance = 3;            
            guests = guests.sort(function (a, b) {
				return parseInt(a.distance) - parseInt(b.distance);
            });
            guests.forEach(function(item, index){
                // console.log("Guest name: " + item.name + " || distance: " + item.distance);
                expect(item.distance).toBeGreaterThan(0);
            });
            guests.forEach(function(item){
                expect(item.distance).toBeGreaterThanOrEqual(lastDistance);
                lastDistance = item.distance;
            });
        });
    }
    
);
