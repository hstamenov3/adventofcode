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

    getAllSeatingIds (arrayMap: string[], modifier: number): number[] {
        let ids:number[] = []
        ids = arrayMap.map((spacePartitioning) => {
            const seatId = this.checkSeating(spacePartitioning, this.seating.row, this.seating.col, modifier)
                if (seatId > this.highSeatId) {
                    this.highSeatId = seatId
                }
            return seatId
        })
        return ids
    }

    getMySeat (seatIds: number[]): number {
        let id = 0
        seatIds.map((seatId, index) => {
           if (!seatIds.includes(seatId + 1) && seatIds.includes(seatId+ 2)) 
             id = seatId + 1
        })
        return id 

    }
    checkSeating (spacePartitioning: string, rows: number, col: number, modifier: number) {
        return this.idCalculator(this.findPosition(rows, spacePartitioning.substring(0, 7)), this.findPosition(col, spacePartitioning.slice(-3)), modifier)
    }

    findPosition (size: number, partitioning: string): number {
       
        let position = [0, size-1]

        partitioning.split('').map((character, index) => {   
            if ('F' === character || 'L' === character) {
                position = [position[0], Math.floor(this.mathAverage(position[1], position[0]))  ]
            }

            if ('B' === character || 'R' === character) {
                position = [Math.round(this.mathAverage(position[1], position[0])), position[1]]
            }

        })
        return position[0]
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
        let id = 0
        const passIds = new Set([...data.map((line: string) => {
            // @ts-ignore
            return parseInt(line.replace(/F|L/g, 0).replace(/B|R/g, 1), 2);
          })]);
        
        for (const seatId of passIds.values()) {
            if (!passIds.has(seatId - 1) && passIds.has(seatId - 2)) {
                id = seatId
                return seatId - 1;
           }
        }
        return id
    };
    
    main () {
        this.readFile().then((result) =>{
            this.logResult(this.herpaDerpaSolution(result)) 
            this.logResult(this.getMySeat(this.getAllSeatingIds(result, this.modifier)))
        })
    };
}

SeatFinder.main()
