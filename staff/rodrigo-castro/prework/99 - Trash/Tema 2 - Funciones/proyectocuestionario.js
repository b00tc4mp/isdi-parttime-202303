const getUserAge = () => {
    let birthYear = prompt('Year of birth');

    if(typeof +birthYear !== "number"){
        birthYear = prompt('Age must be a number. Try again');
    }
    const year = new Date()
    return year.getFullYear() - +birthYear;
}

const getHobbies = () => {
    const hobbies = [];
//    debugger;
    let hobby;
    do{
        hobby = prompt('Hobby');
        if (hobby !== null && hobby !== ''){
//            debugger;
            hobbies.push(hobby);
        }
    } while (hobby !== null);
    return hobbies;
};

console.log(getUserAge());
const userHobbies = getHobbies();

userHobbies.forEach((hobby) => console.log(hobby));

//for (let i = 0; i < userHobbies.length; i++){
//    console.log(userHobbies[i]);
//}

//console.log(getHobbies());

