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
const AdapterJoltsV1 = new class {
    constructor() {
        this.dataPath = `./data`;
        this.parseInput = (input) => input.trim()
            .split('\n')
            .map((value) => +value)
            .concat(0)
            .sort((a, b) => a - b);
    }
    readFile() {
        let arrayOfData = fs.readFileSync(this.dataPath, { encoding: 'utf8' }).trim();
        return Promise.resolve(arrayOfData);
    }
    getCombinations(input) {
        let result = 0;
        const allJolts = this.parseInput(input);
        let combinations = new Map([[0, 1]]);
        // Needs to be broken down more
        allJolts.map((item, itemIndex) => {
            return allJolts
                .slice(itemIndex + 1, itemIndex + 4)
                .map((other) => [-1, -2, -3].indexOf(item - other) > -1 &&
                combinations.set(allJolts.indexOf(other), (combinations.get(itemIndex) || 0) + (combinations.get(allJolts.indexOf(other)) || 0)));
        });
        result = combinations.get(allJolts.length - 1) || 6666666;
        return result;
    }
    logResult(result) {
        console.log(result, 'answer is 42');
    }
    ;
    main() {
        this.readFile().then((data) => {
            this.logResult(this.getCombinations(data));
        });
    }
    ;
};
AdapterJoltsV1.main();
