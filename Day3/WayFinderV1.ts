import * as fs from 'fs';

/* 
In this example, traversing the map using this slope would cause you to encounter 7 trees.

Starting at the top-left corner of your map and following a slope of right 3 and down 1, how many trees would you encounter?
*/

const passChecker =  new class {
    dataPath = `./data`
    dataUpdatedPath = './updatedData'
    updatedMap: string[] = []
    currentPosition = {right: 0, down: 0}
    hitTrees = 0


    readFile() {
        let arrayOfArrays
        let arrayOfLines = fs.readFileSync(this.dataPath, {encoding: 'utf8'}).split('\n')
        arrayOfArrays = arrayOfLines.map((line) => line.trim().split(''))
        return Promise.resolve(arrayOfArrays);
    }
    // TODO make it work with reduce or object key 
    mapTraverser (arrayMap: string[][], moveRight: number, moveDown: number) {
        let pathTraveled = 0;
        let movedY = moveDown
        let movedX = moveRight
  
        while (arrayMap.length > movedY && !!arrayMap[movedY]) {

            if (arrayMap[movedY][movedX % arrayMap[0].length] === '#') {
                pathTraveled++;
                this.hitTrees++
            }
            movedY+= moveRight
            movedX+= moveDown
        }
        this.saveFile(arrayMap)
        return this.hitTrees
    }

    fixEmptyArrays (arrayOfArrays: any[]) {
        arrayOfArrays = arrayOfArrays.map((array) => {
            if (array.length === 0) return undefined
            return array
        })
        return arrayOfArrays.filter((array) => !!array)
    }

    fixArrayForLogging (array: any[]) {
        return array.toString()
    }

    logResult (result: number) {

        console.log(result, 'answer is 42')
    }

    saveFile = (dataToStore: any[]) => {
        dataToStore = dataToStore.map((line) => this.fixArrayForLogging(line))
        let storedData = fs.readFileSync(this.dataUpdatedPath, {encoding: 'utf8'})
      
        storedData = JSON.stringify(dataToStore, undefined, 2)
        storedData = storedData.replace(/,/g, "");
        fs.unlinkSync(this.dataUpdatedPath)
        fs.writeFileSync(this.dataUpdatedPath, storedData, {encoding: 'utf8'})
    }

    main () {
        this.readFile().then((result) =>{
            // this.logResult(result[0])

            this.logResult(this.mapTraverser(result, 3, 1))
        })
    }
}

passChecker.main()
