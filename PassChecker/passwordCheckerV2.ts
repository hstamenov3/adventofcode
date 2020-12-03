import * as fs from 'fs';

type password = {
    repeat: string, letter: string, password: string
}
const passChecker =  new class {
    path = `../data.js`
    convertedData:any[] = []
    valid = 0

    readFile() {
        let arrayOfLines = fs.readFileSync(this.path, {encoding: 'utf8'}).split('\n')
        arrayOfLines.forEach((line: string) => {
            let element = line.split(' ');
            
            this.convertedData.push(this.convertElement(element));
        })
        return Promise.resolve(this.convertedData);
    }
    convertElement (element: any) { 
        if (!element || element.length !== 4) return console.warn('cant convert', element)
        let convertedElement = { repeat: element[1], letter: element[2].split(':')[0], password: element[3] };

        return convertedElement;
    }

    checkPassword (passwordLine: password) {
 
        if (!passwordLine || !passwordLine.repeat) return console.warn('missing password line', passwordLine)
        let minMax = passwordLine.repeat.split('-');
        const positionOne = Number(minMax[0])-1;
        const positionTwo = Number(minMax[1])-1;
        

        if ((passwordLine.password[positionOne] === passwordLine.letter && passwordLine.password[positionTwo] !== passwordLine.letter) ||
            passwordLine.password[positionTwo] === passwordLine.letter && (passwordLine.password[positionOne] !== passwordLine.letter)) {
            this.logResult(passwordLine.password)
        }

    }

    logResult (result: string) {
        this.valid ++
        console.log(result, this.valid)
    }

    main () {
        this.readFile().then((result) =>{
           result.forEach((passwordToCheck) => {
                this.checkPassword(passwordToCheck)
           })
        })
    }
}

passChecker.main()
