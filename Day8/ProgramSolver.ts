import * as fs from 'fs';

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
    dataPath = `./data`
    executed: number[] = []
    accumulator = 0
    currentOperation = 0


    readFile() {
        let arrayOfData = fs.readFileSync(this.dataPath, { encoding: 'utf8' }).split('\n')
        arrayOfData = arrayOfData.map((line: string) => line.trim())
        return Promise.resolve(arrayOfData);
    }

    getAccumulatorValue(instructions: string[]) {
        while (!this.executed.includes(this.currentOperation)) {
            this.executed.push(this.currentOperation);
            // @ts-ignore
            const [, operation, value] = /(acc|jmp|nop)\s([+-]\d*)/.exec(instructions[this.currentOperation]) || [];
            console.log(operation, value)
            switch (operation) {
                case 'acc': {
                    this.accumulator += parseInt(value)
                    this.currentOperation++
                    break;
                }
                case 'jmp': {
                    this.currentOperation += parseInt(value)
                    break;
                }
                default:
                    this.currentOperation++
                    break;
            }
        }
        return { currentOperation: this.currentOperation, accumulator: this.accumulator };

    }

    logResult(result: any) {
        console.log(result, 'answer is 42')
    };

    main() {
        this.readFile().then((instruction: string[]) => {
            this.logResult(this.getAccumulatorValue(instruction))
        })
    };
}

ProgramSolver.main()
