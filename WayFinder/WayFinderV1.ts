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
        arrayOfArrays = arrayOfLines.map((line) => line.split(''))
        arrayOfArrays = this.fixEmptyArrays(arrayOfArrays)
        return Promise.resolve(arrayOfArrays);
    }
    // TODO make it work with reduce or object key 
    mapTraverser (arrayMap: string[][], moveRight: number, moveDown: number) {
        let pathTraveled = 0;
        let movedY = moveDown
        let movedX = moveRight
  
        while (arrayMap.length > pathTraveled && !!arrayMap[movedY]) {

            // console.warn(arrayMap[movedY], 'Position at')
            if (arrayMap[movedY][movedX] === '#') {
                arrayMap[movedY][movedX] = 'X'
                this.hitTrees ++
            } else {
                arrayMap[movedY][movedX] = 'O'
            }
            pathTraveled++
            movedY = movedY + moveDown
            movedX = movedX + moveRight
            
            if  (arrayMap[1].length < movedX){
                console.warn(arrayMap[1].length, movedX, 'Position at')
                movedX = (movedX - arrayMap[1].length)
            }
        }
        this.saveFile(arrayMap)
        return arrayMap
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

    logResult (result: any[]) {

        console.log(this.hitTrees)
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
