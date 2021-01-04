import * as fs from 'fs';

const Decoder = new class {
    dataPath = `./data`
    executed: number[] = []
    notAccoumulator = 25


    readFile() {
        let arrayOfData = fs.readFileSync(this.dataPath, { encoding: 'utf8' }).split('\n')
        let arrayOfNumbers = arrayOfData.map((line: string) => Number(line.trim()))
        return Promise.resolve(arrayOfNumbers.filter(Boolean));
    }

    getPreamble(data: number[]) {
        let result = 0
        console.log(data)
        for (let i = this.notAccoumulator; i < data.length; i++) {
            const prev = data.slice(i - this.notAccoumulator, i);
            /*
            * The some() method tests whether at least one element in the array passes the test implemented by the provided function. It returns a Boolean value.
            */
            if (!prev.some(number => prev.some(otherNumber => otherNumber !== number && otherNumber + number === data[i])))
                result = data[i];
        }
        return result
    }

    getEncryptionWeakness(data: number[], preamble: number) {
        let range: number[] = []
        console.log(data)
        data.find((x, i) => {
            let acc = x
            range = [x]
            data.slice(i + 1).find((y) => {
                acc += y
                range.push(y)
                return acc >= preamble
            })
            return acc === preamble
        })

        return Math.min(...range) + Math.max(...range)
    }

    logResult(result: any) {
        console.log(result, 'answer is 42')
    };

    main() {
        this.readFile().then((data: number[]) => {
            this.logResult(this.getEncryptionWeakness(data, this.getPreamble(data)))
        })
    };
}

Decoder.main()
