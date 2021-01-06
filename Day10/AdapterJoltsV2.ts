import * as fs from 'fs';

const AdapterJoltsV1 = new class {
    dataPath = `./data`

    readFile() {
        let arrayOfData = fs.readFileSync(this.dataPath, { encoding: 'utf8' }).trim()
        return Promise.resolve(arrayOfData);
    }

    parseInput = (input: string): number[] =>
        input.trim()
            .split('\n')
            .map((value) => +value)
            .concat(0)
            .sort((a, b) => a - b)

    getCombinations(input: string) {
        let result = 0
        const allJolts = this.parseInput(input)
        let combinations: Map<number, number> = new Map<number, number>([[0, 1]])
        // Needs to be broken down more
        allJolts.map((item, itemIndex) => {
            return allJolts
                .slice(itemIndex + 1, itemIndex + 4)
                .map((other) =>
                    [-1, -2, -3].indexOf(item - other) > -1 &&
                    combinations.set(allJolts.indexOf(other), (combinations.get(itemIndex) || 0) + (combinations.get(allJolts.indexOf(other)) || 0)),
                )
        })

        result = combinations.get(allJolts.length - 1) || 6666666
        return result
    }



    logResult(result: any) {
        console.log(result, 'answer is 42')
    };

    main() {
        this.readFile().then((data: string) => {
            this.logResult(this.getCombinations(data))
        })
    };
}

AdapterJoltsV1.main()
