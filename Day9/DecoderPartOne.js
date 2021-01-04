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
/*
    * rows
    Start by considering the whole range, rows 0 through 127.
    F means to take the lower half, keeping rows 0 through 63.
    B means to take the upper half, keeping rows 32 through 63.
    F means to take the lower half, keeping rows 32 through 47.
    B means to take the upper half, keeping rows 40 through 47.
    B keeps rows 44 through 47.
    F keeps rows 44 through 45.
    The final F keeps the lower of the two, row 44
*/
/*
    *columns
    Start by considering the whole range, columns 0 through 7.
    R means to take the upper half, keeping columns 4 through 7.
    L means to take the lower half, keeping columns 4 through 5.
    The final R keeps the upper of the two, column 5.
*/
const Decoder = new class {
    constructor() {
        this.dataPath = `./data`;
        this.executed = [];
        this.accumulator = 25;
    }
    readFile() {
        let arrayOfData = fs.readFileSync(this.dataPath, { encoding: 'utf8' }).split('\n');
        let arrayOfNumbers = arrayOfData.map((line) => Number(line.trim()));
        return Promise.resolve(arrayOfNumbers.filter(Boolean));
    }
    getPreamble(data) {
        let result = 0;
        console.log(data);
        for (let i = this.accumulator; i < data.length; i++) {
            const prev = data.slice(i - this.accumulator, i);
            /*
            * The some() method tests whether at least one element in the array passes the test implemented by the provided function. It returns a Boolean value.
            */
            if (!prev.some(number => prev.some(otherNumber => otherNumber !== number && otherNumber + number === data[i])))
                result = data[i];
        }
        return result;
    }
    logResult(result) {
        console.log(result, 'answer is 42');
    }
    ;
    main() {
        this.readFile().then((data) => {
            this.logResult(this.getPreamble(data));
        });
    }
    ;
};
Decoder.main();
