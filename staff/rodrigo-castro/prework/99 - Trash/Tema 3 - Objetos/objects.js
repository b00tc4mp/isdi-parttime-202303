const character = {
  firstName: "Jon",
  family: "Snow",
  id: 1,
};

const objectProperties = () => {
  console.log(character.firstName);
  console.log(character.family);
  console.log(character.age);
  console.log("The object has " + propertiesNames.length + " properties.");
  Object.defineProperties(character, {
    fullName: {
      value: fullNameConcat,
    },
    location: {
      value: 'Mar del plata'
    }
  });
  console.log(character.fullName);
  delete character.firstName;
  console.log('Hi there, my name is ' + character.fullName + ' and my age is ' + character.age);
  console.log('I live in ' + character.location);
};

console.log(character.firstName); // "Jon
console.log("Properties of character object are:");
console.log(Object.getOwnPropertyNames(character));

character.family = "Lannister";
delete character.id;
character.age = 25;
let propertiesNames = Object.getOwnPropertyNames(character);
const fullNameConcat = character.firstName + " " + character.family;

objectProperties();
