import * as fs from 'fs';

const PassportCheckerV1 =  new class {
    dataPath = `./data`

    readFile() {
        let arrayOfLines = fs.readFileSync(this.dataPath, {encoding: 'utf8'})

        return Promise.resolve(arrayOfLines)
    }
  
    formatData = (data: string): string[] => data.split('\n').map((line: string) => line.trim()).join('\n').split(/\n{2,}/g)

    validate (passport: string) {
        const requiredFields = ['ecl', 'pid','eyr', 'hcl','byr', 'iyr', 'hgt'];
        let tempHolder: any
        const fields = passport
          .split('\n')
          .join(' ')
          .split(' ')
          .map((field: string) => {
              try {
                tempHolder = /(\w+):/.exec(field) || []
                if (tempHolder.length > 0) return tempHolder[1]
                return  []
              }
                catch(e) {
                    console.log(field)
              }
          })
      
        return requiredFields.map((field: string) => fields.includes(field))
      }
 

    logResult (result: any) {
        console.log(result, 'answer is 42')
    }

    main () {
        this.readFile().then((result) =>{ 
            this.logResult(this.formatData(result).filter(this.validate).length)
        })
    }
}

PassportCheckerV1.main()
