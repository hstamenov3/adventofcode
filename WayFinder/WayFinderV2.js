"use strict";
exports.__esModule = true;
var fs = require("fs");
/*
In this example, traversing the map using this slope would cause you to encounter 7 this.mapTraverser.

Starting at the top-left corner of your map and following a slope of right 3 and down 1, how many this.mapTraverser would you encounter?
*/
var passChecker = new /** @class */ (function () {
    function class_1() {
        var _this = this;
        this.dataPath = "./data";
        this.dataUpdatedPath = './updatedData';
        this.updatedMap = [];
        this.currentPosition = { right: 0, down: 0 };
        this.saveFile = function (dataToStore) {
            dataToStore = dataToStore.map(function (line) { return _this.fixArrayForLogging(line); });
            var storedData = fs.readFileSync(_this.dataUpdatedPath, { encoding: 'utf8' });
            storedData = JSON.stringify(dataToStore, undefined, 2);
            storedData = storedData.replace(/,/g, "");
            fs.unlinkSync(_this.dataUpdatedPath);
            fs.writeFileSync(_this.dataUpdatedPath, storedData, { encoding: 'utf8' });
        };
    }
    class_1.prototype.readFile = function () {
        var arrayOfArrays;
        var arrayOfLines = fs.readFileSync(this.dataPath, { encoding: 'utf8' }).split('\n');
        arrayOfArrays = arrayOfLines.map(function (line) { return line.trim().split(''); });
        return Promise.resolve(arrayOfArrays);
    };
    // TODO make it work with reduce or object key 
    class_1.prototype.mapTraverser = function (arrayMap, moveRight, moveDown) {
        var pathTraveled = 0;
        var hitTrees = 0;
        var movedY = moveDown;
        var movedX = moveRight;
        while (arrayMap.length > movedY && !!arrayMap[movedY]) {
            if (arrayMap[movedY][movedX % arrayMap[0].length] === '#') {
                pathTraveled++;
                hitTrees++;
            }
            movedY += moveDown;
            movedX += moveRight;
        }
        this.saveFile(arrayMap);
        return hitTrees;
    };
    class_1.prototype.fixEmptyArrays = function (arrayOfArrays) {
        arrayOfArrays = arrayOfArrays.map(function (array) {
            if (array.length === 0)
                return undefined;
            return array;
        });
        return arrayOfArrays.filter(function (array) { return !!array; });
    };
    class_1.prototype.fixArrayForLogging = function (array) {
        return array.toString();
    };
    class_1.prototype.logResult = function (result) {
        console.log(result, 'result of multi traverse');
    };
    class_1.prototype.main = function () {
        var _this = this;
        this.readFile().then(function (result) {
            // this.logResult(result[0])
            _this.logResult(_this.mapTraverser(result, 1, 1) * _this.mapTraverser(result, 3, 1) * _this.mapTraverser(result, 5, 1) *
                _this.mapTraverser(result, 7, 1) * _this.mapTraverser(result, 1, 2));
        });
    };
    return class_1;
}());
passChecker.main();
