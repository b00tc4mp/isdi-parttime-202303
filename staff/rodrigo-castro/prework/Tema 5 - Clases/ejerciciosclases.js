// const tonyStark = {
//     name: "Tony",
//     class: "VII",
//     id: 1,
//   };
// console.log(tonyStark.name); // "Tony"

// console.log(Object.keys(tonyStark));
// console.log(Object.values(tonyStark));

// tonyStark.class = "XI";
// console.log(Object.values(tonyStark));

// delete tonyStark.id;
// console.log(Object.values(tonyStark));

// tonyStark.city = "Mar del Plata";
// console.log(tonyStark.city);

// console.log(Object.keys(tonyStark).length);

// tonyStark.fullName = tonyStark.name;
// delete tonyStark.name;
// console.log(Object.keys(tonyStark));
// console.log(Object.values(tonyStark));

// console.log(`Hi there, I'm ${tonyStark.fullName} from ${tonyStark.city}, and I'm class ${tonyStark.class}`);

// tonyStark.markAverage = 8;
// tonyStark.country = "Argentina";
// tonyStark.job = "Engineer";
// tonyStark.studies = "Mechanical Engineering";

// console.log(tonyStark);

class AvengerCreator {
    constructor(fullName, classRoom, city, markAverage, country, job, studies) {
    this.fullName = fullName;
    this.classRoom = classRoom;
    this.city = city;
    this.markAverage = markAverage;
    this.country = country;
    this.job = job;
    this.studies = studies;
    this.listOfProperties = function(){
      console.log(this.fullName + `, ` + this.classRoom + `, ` + this.city);
    };
};
}

const bruceBanner =  new AvengerCreator("Hulk", "XV", "NY", 9, "USA", "Doctor", "Medicine");
const thorOdin =  new AvengerCreator("Thor", "XV", "Sky", 8, "World", "Semi God", "N/A");
const captainAmerica =  new AvengerCreator("Captain America", "XVII", "NY", 6, "USA", "Time traveller", "N/A");
const tonyStark = new AvengerCreator("Iron Man", "XVII", "NY", 10, "USA", "Engineer", "MIT");
const rodriCM = new AvengerCreator("Super Drummer", "X", "Mar del Plata", 8, "Argentina", "Programmer", "ISDI");

// console.log(bruceBanner);
// console.log(Object.keys(bruceBanner));
// console.log(Object.values(bruceBanner));

// bruceBanner.listOfProperties();

const superHeroes = [bruceBanner, thorOdin, captainAmerica, tonyStark, rodriCM];

const sameCity = () => {
  const sameCityList = [];
  superHeroes.forEach((superHeroe) => {
    if (superHeroe.city === "NY"){
      sameCityList.push(superHeroe.fullName);
    };
  });
  console.log(`The following ${sameCityList.length} Avengers live in NY:`);
  sameCityList.forEach((singleAvenger) => {
    console.log(singleAvenger);
  });
};

const markAverageOfAll = () => {
  let totalMarks = 0;
  superHeroes.forEach((singleSuperHeroe) => {
    totalMarks = totalMarks + singleSuperHeroe.markAverage;
  });
  const finalAverage = (totalMarks/superHeroes.length).toFixed(2);
  console.log(`The total average of all the avengers is ${finalAverage}.`);
};

const randomCompare = () => {
  const idFirstAv = Math.floor(Math.random()*5);
  let idSecondAv;
  do {
    idSecondAv = Math.floor(Math.random()*5);
  } while (idFirstAv === idSecondAv);
  if(superHeroes[idFirstAv].markAverage < superHeroes[idSecondAv].markAverage){
    console.log(`${superHeroes[idSecondAv].fullName} is better than ${superHeroes[idFirstAv].fullName}`);
  } else if (superHeroes[idFirstAv].markAverage > superHeroes[idSecondAv].markAverage){
    console.log(`${superHeroes[idFirstAv].fullName} is better than ${superHeroes[idSecondAv].fullName}`);
  } else {
    console.log(`${superHeroes[idFirstAv].fullName} and ${superHeroes[idSecondAv].fullName} are equal`);
  }
};

// sameCity();
// markAverageOfAll();
randomCompare();

