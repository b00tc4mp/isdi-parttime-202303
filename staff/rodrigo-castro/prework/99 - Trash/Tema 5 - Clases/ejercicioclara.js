function Avenger(id, fullName, classRoom, city, job, studies, markAv) {
    this.id = id
    this.fullName = fullName;
    this.classRoom = classRoom;
    this.city = city;
    this.job = job;
    this.studies = studies;
    this.markAv = markAv;
  }

const tonyStark = new Avenger(1, "Tony Stark", "XI", "NYC", "Engineer", "MIT", 10);
const captainAmerica = new Avenger(2, "Steve Rogers", "XI", "Brooklyn", "Soldier", "Auburndale Art School", 9);
const thor = new Avenger(3, "Thor Odinson", "VI", "Asgard", "God", false, 7);
const hulk = new Avenger(4, "Bruce Banner", "X", "NYC", "Scientist", "Harvard", 8);
const blackWidow = new Avenger(5, "Natasha Romanoff", "X", "NYC", "Spy", "Harvard", 7);
const myself = new Avenger(6, "Clari", "IV", "Malaga", "Programmer", "ISDI", 5);

const avengers = [tonyStark, captainAmerica, thor, hulk, blackWidow, myself];

const compareMarkAv = () => {
    do {
        const pair = [];
    
        for (let i = 0; i < avengers.length - 1; i++) {
            while(pair.length < 2) {
                let currentElement = avengers[i];
                let nextElement = avengers[i + 1];
                pair.push(currentElement, nextElement);
                avengers.splice(0, 2);
            }
        }

        if(pair[0].markAv > pair[1].markAv) {
            console.log(`${pair[0].fullName} vs ${pair[1].fullName} => ${pair[0].fullName} is better!`);
        } else {
            console.log(`${pair[0].fullName} vs ${pair[1].fullName} => ${pair[1].fullName} is better!`);
        }
    } while (avengers.length !== 0)

}
compareMarkAv();

/* Imprime:
Tony Stark vs Steve Rogers => Tony Stark is better!
Thor Odinson vs Bruce Banner => Bruce Banner is better!
Natasha Romanoff vs Clari => Natasha Romanoff is better! */