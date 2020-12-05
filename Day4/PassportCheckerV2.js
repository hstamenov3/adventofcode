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
In this example, traversing the map using this slope would cause you to encounter 7 trees.

Starting at the top-left corner of your map and following a slope of right 3 and down 1, how many trees would you encounter?
*/
const PassportCheckerV1 = new class {
    constructor() {
        this.dataPath = `./data`;
        this.dataUpdatedPath = './updatedData';
        this.currentPosition = { right: 0, down: 0 };
        this.hitTrees = 0;
        this.formatData = (data) => data.split('\n').map((line) => line.trim()).join('\n').split(/\n{2,}/g);
    }
    readFile() {
        let arrayOfLines = fs.readFileSync(this.dataPath, { encoding: 'utf8' });
        return Promise.resolve(arrayOfLines);
    }
    validate(passport) {
        const requiredFields = ['ecl', 'pid', 'eyr', 'hcl', 'byr', 'iyr', 'hgt'];
        const fields = passport
            .split('\n')
            .join(' ')
            .split(' ')
            .reduce((keys, entry) => {
            //@ts-ignore
            try {
                // fucking magic ,
                const [, field, value] = /(\w+):(.*)/.exec(entry) || [];
                console.log(/(\w+):(.*)/.exec(entry));
                keys[field] = value;
                return keys;
            }
            catch (error) {
                console.warn(error, 'someting is wrong');
            }
        }, {});
        if (!requiredFields.every((entry) => Object.keys(fields).includes(entry))) {
            return false;
        }
        //@ts-ignore
        const birthYear = +/(\d{4})/.exec(fields['byr'])[1];
        //@ts-ignore
        const issueYear = +/(\d{4})/.exec(fields['iyr'])[1];
        //@ts-ignore
        const expirationYear = +/(\d{4})/.exec(fields['eyr'])[1];
        //@ts-ignore
        const [, height, heightUnit] = fields['hgt'].match(/(\d+)(cm|in)?/);
        const hairColor = fields['hcl'];
        const eyeColor = fields['ecl'];
        const passportId = fields['pid'];
        return birthYear >= 1920 && birthYear <= 2002 &&
            issueYear >= 2010 && issueYear <= 2020 &&
            expirationYear >= 2020 && expirationYear <= 2030 &&
            ((heightUnit === 'cm' && +height >= 150 && +height <= 193) ||
                (heightUnit === 'in' && +height >= 59 && +height <= 76)) &&
            /#[a-f0-9]{6}/.test(hairColor) &&
            /(amb|blu|brn|gry|grn|hzl|oth)/.test(eyeColor) &&
            /^\d{9}$/.test(passportId);
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
