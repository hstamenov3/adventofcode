"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const passChecker = new class {
    constructor() {
        this.path = `../data.js`;
        this.convertedData = [];
        this.valid = 0;
    }
    readFile() {
        let arrayOfLines = fs.readFileSync(this.path, { encoding: 'utf8' }).split('\n');
        arrayOfLines.forEach((line) => {
            let element = line.split(' ');
            this.convertedData.push(this.convertElement(element));
        });
        return Promise.resolve(this.convertedData);
    }
    convertElement(element) {
        if (!element || element.length !== 4)
            return console.warn('cant convert', element);
        let convertedElement = { repeat: element[1], letter: element[2].split(':')[0], password: element[3] };
        return convertedElement;
    }
    checkPassword(passwordLine) {
        if (!passwordLine || !passwordLine.repeat)
            return console.warn('missing password line', passwordLine);
        let minMax = passwordLine.repeat.split('-');
        const positionOne = Number(minMax[0]) - 1;
        const positionTwo = Number(minMax[1]) - 1;
        if ((passwordLine.password[positionOne] === passwordLine.letter && passwordLine.password[positionTwo] !== passwordLine.letter) ||
            passwordLine.password[positionTwo] === passwordLine.letter && (passwordLine.password[positionOne] !== passwordLine.letter)) {
            this.logResult(passwordLine.password);
        }
    }
    logResult(result) {
        this.valid++;
        console.log(result, this.valid);
    }
    main() {
        this.readFile().then((result) => {
            result.forEach((passwordToCheck) => {
                this.checkPassword(passwordToCheck);
            });
        });
    }
};
passChecker.main();
