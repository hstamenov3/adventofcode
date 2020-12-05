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
const SeatFinder = new class {
    constructor() {
        this.dataPath = `./data`;
        this.modifier = 8;
        this.seating = {
            row: 128,
            col: 8
        };
        this.highSeatId = 0;
    }
    readFile() {
        let arrayOfData = fs.readFileSync(this.dataPath, { encoding: 'utf8' }).split('\n');
        arrayOfData = arrayOfData.map((line) => line.trim());
        return Promise.resolve(arrayOfData);
    }
    getAllSeatingIds(arrayMap, modifier) {
        arrayMap.map((spacePartitioning) => {
            const seatId = this.checkSeating(spacePartitioning, this.seating.row, this.seating.col, modifier);
            if (seatId > this.highSeatId) {
                this.highSeatId = seatId;
            }
            return seatId;
        });
        return this.highSeatId;
    }
    checkSeating(spacePartitioning, rows, col, modifier) {
        return this.idCalculator(this.findRow(rows, spacePartitioning.substring(0, 7)), this.findRow(col, spacePartitioning.slice(-3)), modifier);
    }
    findRow(size, partitioning) {
        let row = [0, size - 1];
        partitioning.split('').map((character, index) => {
            // Can be a new function to get upper lower
            if ('F' === character || 'L' === character) {
                row = [row[0], Math.floor(this.mathAverage(row[1], row[0]))];
            }
            if ('B' === character || 'R' === character) {
                row = [Math.round(this.mathAverage(row[1], row[0])), row[1]];
            }
        });
        return row[0];
    }
    ;
    findColumns(partitioning) {
        console.log(partitioning);
        let column = [0, this.seating.col - 1];
        partitioning.split('').map((character, index) => {
            if ('F' === character) {
                column = [column[0], Math.floor(this.mathAverage(column[1], column[0]))];
            }
            if ('B' === character) {
                column = [Math.round(this.mathAverage(column[1], column[0])), column[1]];
            }
        });
        return column[0];
    }
    ;
    idCalculator(row, col, modifier) {
        return row * modifier + col;
    }
    ;
    logResult(result) {
        console.log(result, 'answer is 42');
    }
    ;
    mathAverage(a, b) {
        return (a + b) / 2;
    }
    ;
    herpaDerpaSolution(data) {
        return (Math.max(...data.map((line) => {
            //@ts-ignore
            return parseInt(line.replace(/F|L/g, 0).replace(/B|R/g, 1), 2);
        })));
    }
    main() {
        this.readFile().then((result) => {
            this.logResult(this.herpaDerpaSolution(result));
            this.logResult(this.getAllSeatingIds(result, this.modifier));
        });
    }
    ;
};
SeatFinder.main();
