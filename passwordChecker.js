"use strict";
exports.__esModule = true;
var fs = require("fs");
var passChecker = new /** @class */ (function () {
    function class_1() {
        this.path = "../data.js";
        this.convertedData = [];
        this.valid = 0;
    }
    class_1.prototype.readFile = function () {
        var _this = this;
        var arrayOfLines = fs.readFileSync(this.path, { encoding: 'utf8' }).split('\n');
        arrayOfLines.forEach(function (line) {
            var element = line.split(' ');
            _this.convertedData.push(_this.convertElement(element));
        });
        return Promise.resolve(this.convertedData);
    };
    class_1.prototype.convertElement = function (element) {
        if (!element || element.length !== 4)
            return console.warn('cant convert', element);
        var convertedElement = { repeat: element[1], letter: element[2].split(':')[0], password: element[3] };
        return convertedElement;
    };
    class_1.prototype.checkPassword = function (passwordLine) {
        if (!passwordLine || !passwordLine.repeat)
            return console.warn('missing password line', passwordLine);
        var minMax = passwordLine.repeat.split('-');
        var minRepeat = Number(minMax[0]);
        var maxRepeat = Number(minMax[1]);
        var regExp = new RegExp(passwordLine.letter, 'g');
        var match = passwordLine.password.match(regExp) || [];
        if (minRepeat <= match.length && maxRepeat >= match.length) {
            this.logResult(passwordLine.password);
        }
    };
    class_1.prototype.logResult = function (result) {
        this.valid++;
        console.log(result, this.valid);
    };
    class_1.prototype.main = function () {
        var _this = this;
        this.readFile().then(function (result) {
            result.forEach(function (passwordToCheck) {
                _this.checkPassword(passwordToCheck);
            });
        });
    };
    return class_1;
}());
passChecker.main();
