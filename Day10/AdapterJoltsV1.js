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
const AdapterJoltsV2 = new class {
    constructor() {
        this.dataPath = `./data`;
        this.parseInput = (input) => input
            .trim()
            .split('\n')
            .map((value) => +value)
            .concat(0)
            .sort((a, b) => a - b);
    }
    readFile() {
        let arrayOfData = fs.readFileSync(this.dataPath, { encoding: 'utf8' }).trim();
        return Promise.resolve(arrayOfData);
    }
    calculateDifference(input) {
        let result = 0;
        const jolts = this.parseInput(input).map((item, index, array) => {
            return array[index + 1] ? array[index + 1] - item : 3;
        });
        result = jolts.filter((jolt) => jolt === 3).length * jolts.filter((jolt) => jolt === 1).length;
        return result;
    }
    logResult(result) {
        console.log(result, 'answer is 42');
    }
    ;
    main() {
        this.readFile().then((data) => {
            this.logResult(this.calculateDifference(data));
        });
    }
    ;
};
AdapterJoltsV2.main();
