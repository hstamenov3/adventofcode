

import * as fs from 'fs';

const AdapterJoltsV2 = new class {
    dataPath = `./data`

    readFile() {
        let arrayOfData = fs.readFileSync(this.dataPath, { encoding: 'utf8' }).trim()
        return Promise.resolve(arrayOfData);
    }

    parseInput = (input: string): number[] =>
        input
            .trim()
            .split('\n')
            .map((value) => +value)
            .concat(0)
            .sort((a, b) => a - b)

    calculateDifference(input: string) {
        let result = 0
        const jolts = this.parseInput(input).map((item, index, array) => {
            return array[index + 1] ? array[index + 1] - item : 3
        })
        result = jolts.filter((jolt) => jolt === 3).length * jolts.filter((jolt) => jolt === 1).length
        return result
    }



    logResult(result: any) {
        console.log(result, 'answer is 42')
    };

    main() {
        this.readFile().then((data: string) => {
            this.logResult(this.calculateDifference(data))
        })
    };
}

AdapterJoltsV2.main()
