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
const PassportCheckerV1 = new class {
    constructor() {
        this.dataPath = `./data`;
        this.formatData = (data) => data.split('\n').map((line) => line.trim()).join('\n').split(/\n{2,}/g);
    }
    readFile() {
        let arrayOfLines = fs.readFileSync(this.dataPath, { encoding: 'utf8' });
        return Promise.resolve(arrayOfLines);
    }
    validate(passport) {
        const requiredFields = ['ecl', 'pid', 'eyr', 'hcl', 'byr', 'iyr', 'hgt'];
        let tempHolder;
        const fields = passport
            .split('\n')
            .join(' ')
            .split(' ')
            .map((field) => {
            try {
                tempHolder = /(\w+):/.exec(field) || [];
                if (tempHolder.length > 0)
                    return tempHolder[1];
                return [];
            }
            catch (e) {
                console.log(field);
            }
        });
        return requiredFields.map((field) => fields.includes(field));
    }
    logResult(result) {
        console.log(result, 'answer is 42');
    }
    main() {
        this.readFile().then((result) => {
            this.logResult(this.formatData(result).filter(this.validate).length);
        });
    }
};
PassportCheckerV1.main();
