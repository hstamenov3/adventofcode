import * as fs from 'fs';

/* 
In this example, traversing the map using this slope would cause you to encounter 7 trees.

Starting at the top-left corner of your map and following a slope of right 3 and down 1, how many trees would you encounter?
*/

const PassportCheckerV1 =  new class {
    dataPath = `./data`
    dataUpdatedPath = './updatedData'
    currentPosition = {right: 0, down: 0}
    hitTrees = 0


    readFile() {
        let arrayOfLines = fs.readFileSync(this.dataPath, {encoding: 'utf8'})

        return Promise.resolve(arrayOfLines)
    }
  
    formatData = (data: string): string[] => data.split('\n').map((line: string) => line.trim()).join('\n').split(/\n{2,}/g);

    validate(passport: string) {
      const requiredFields = ['ecl', 'pid','eyr', 'hcl','byr', 'iyr', 'hgt'];
      const fields = passport
        .split('\n')
        .join(' ')
        .split(' ')
        .reduce((keys: any, entry: string) => {
          //@ts-ignore
          try {
              // fucking magic ,
              const [, field, value] = /(\w+):(.*)/.exec(entry) || [];
              keys[field] = value;
        
              return keys;
          } catch (error) {
              console.warn(error, 'someting is wrong')
          }
        
        }, {});
    
      if (!requiredFields.every((entry) => Object.keys(fields).includes(entry))) {
          return false;
      }

      //@ts-ignore
      const birthYear = +/(\d{4})/.exec(fields['byr'])[1]
      //@ts-ignore
      const issueYear = +/(\d{4})/.exec(fields['iyr'])[1]
      //@ts-ignore
      const expirationYear = +/(\d{4})/.exec(fields['eyr'])[1]
      //@ts-ignore
      const [, height, heightUnit] = fields['hgt'].match(/(\d+)(cm|in)?/)
      const hairColor = fields['hcl'];
      const eyeColor = fields['ecl'];
      const passportId = fields['pid'];
    
      return birthYear >= 1920 && birthYear <= 2002 &&
             issueYear >= 2010 && issueYear <= 2020 &&
             expirationYear >= 2020 && expirationYear <= 2030 &&
             (
               (heightUnit === 'cm' && +height >= 150 && +height <= 193) ||
               (heightUnit === 'in' && +height >= 59 && +height <= 76)
             ) &&
             /#[a-f0-9]{6}/.test(hairColor) &&
             /(amb|blu|brn|gry|grn|hzl|oth)/.test(eyeColor) &&
             /^\d{9}$/.test(passportId);
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
