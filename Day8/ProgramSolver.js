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
const ProgramSolver = new class {
    constructor() {
        this.dataPath = `./data`;
        this.executed = [];
        this.accumulator = 0;
        this.currentOperation = 0;
    }
    readFile() {
        let arrayOfData = fs.readFileSync(this.dataPath, { encoding: 'utf8' }).split('\n');
        arrayOfData = arrayOfData.map((line) => line.trim());
        return Promise.resolve(arrayOfData);
    }
    getAccumulatorValue(instructions) {
        while (!this.executed.includes(this.currentOperation)) {
            this.executed.push(this.currentOperation);
            // @ts-ignore
            const [, operation, value] = /(acc|jmp|nop)\s([+-]\d*)/.exec(instructions[this.currentOperation]) || [];
            console.log(operation, value);
            switch (operation) {
                case 'acc': {
                    this.accumulator += parseInt(value);
                    this.currentOperation++;
                    break;
                }
                case 'jmp': {
                    this.currentOperation += parseInt(value);
                    break;
                }
                default:
                    this.currentOperation++;
                    break;
            }
        }
        return { currentOperation: this.currentOperation, accumulator: this.accumulator };
    }
    logResult(result) {
        console.log(result, 'answer is 42');
    }
    ;
    main() {
        this.readFile().then((instruction) => {
            this.logResult(this.getAccumulatorValue(instruction));
        });
    }
    ;
};
ProgramSolver.main();
