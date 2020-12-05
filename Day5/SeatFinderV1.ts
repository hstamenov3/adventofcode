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



const SeatFinder =  new class {
    dataPath = `./data`
    modifier = 8
    seating = {
        row: 128, 
        col: 8
    }
    highSeatId = 0

    
    
    readFile() {
        let arrayOfData = fs.readFileSync(this.dataPath, {encoding: 'utf8'}).split('\n')
        arrayOfData = arrayOfData.map((line: string) => line.trim())
        return Promise.resolve(arrayOfData);
    }

    getAllSeatingIds (arrayMap: string[], modifier: number): number {
        arrayMap.map((spacePartitioning) => {
            const seatId = this.checkSeating(spacePartitioning, this.seating.row, this.seating.col, modifier)
                if (seatId > this.highSeatId) {
                    this.highSeatId = seatId
                }
            return seatId
        })
        return this.highSeatId
    }

    checkSeating (spacePartitioning: string, rows: number, col: number, modifier: number) {
        return this.idCalculator(this.findRow(rows, spacePartitioning.substring(0, 7)), this.findRow(col, spacePartitioning.slice(-3)), modifier)
    }

    findRow (size: number, partitioning: string): number {
       
        let row = [0, size-1]

        partitioning.split('').map((character, index) => {   
            // Can be a new function to get upper lower
            if ('F' === character || 'L' === character) {
                row = [row[0], Math.floor(this.mathAverage(row[1], row[0]))  ]
            }

            if ('B' === character || 'R' === character) {
                row = [Math.round(this.mathAverage(row[1], row[0])), row[1]]
            }

        })
        return row[0]
    };

    findColumns (partitioning: string): number {
        console.log(partitioning)
        let column = [0, this.seating.col-1]

        partitioning.split('').map((character, index) => { 
            if ('F' === character) {
                column = [column[0], Math.floor(this.mathAverage(column[1], column[0]))  ]
            }

            if ('B' === character) {
                column = [Math.round(this.mathAverage(column[1], column[0])), column[1]]
            }
            
          
        })
        return column[0];
    };

    idCalculator (row: number, col: number, modifier: number) {
        return row * modifier + col
    };

    logResult (result: number) {
        
        console.log(result, 'answer is 42')
    };

    mathAverage (a: number, b: number): number {
        return (a + b) / 2;
    };

    herpaDerpaSolution (data: string[]) {
        return (Math.max(...data.map((line: string) => {
            //@ts-ignore
            return parseInt(line.replace(/F|L/g, 0).replace(/B|R/g, 1), 2);
        })));
    }
    main () {
        this.readFile().then((result) =>{
            this.logResult(this.herpaDerpaSolution(result))
            this.logResult(this.getAllSeatingIds(result, this.modifier))
        })
    };
}

SeatFinder.main()
