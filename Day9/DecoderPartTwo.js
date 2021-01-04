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
const Decoder = new class {
    constructor() {
        this.dataPath = `./data`;
        this.executed = [];
        this.notAccoumulator = 25;
    }
    readFile() {
        let arrayOfData = fs.readFileSync(this.dataPath, { encoding: 'utf8' }).split('\n');
        let arrayOfNumbers = arrayOfData.map((line) => Number(line.trim()));
        return Promise.resolve(arrayOfNumbers.filter(Boolean));
    }
    getPreamble(data) {
        let result = 0;
        console.log(data);
        for (let i = this.notAccoumulator; i < data.length; i++) {
            const prev = data.slice(i - this.notAccoumulator, i);
            /*
            * The some() method tests whether at least one element in the array passes the test implemented by the provided function. It returns a Boolean value.
            */
            if (!prev.some(number => prev.some(otherNumber => otherNumber !== number && otherNumber + number === data[i])))
                result = data[i];
        }
        return result;
    }
    getEncryptionWeakness(data, preamble) {
        let range = [];
        console.log(data);
        data.find((x, i) => {
            let acc = x;
            range = [x];
            data.slice(i + 1).find((y) => {
                acc += y;
                range.push(y);
                return acc >= preamble;
            });
            return acc === preamble;
        });
        return Math.min(...range) + Math.max(...range);
    }
    logResult(result) {
        console.log(result, 'answer is 42');
    }
    ;
    main() {
        this.readFile().then((data) => {
            this.logResult(this.getEncryptionWeakness(data, this.getPreamble(data)));
        });
    }
    ;
};
Decoder.main();
