let calculator = () => {
  let userNumbers = [];
  let calculate;
  let counter = 0;

  do {
    userNumbers[counter] = +prompt("Insert a number greater than 0.");
    if (
      isNaN(userNumbers[counter]) ||
      userNumbers[counter] === null ||
      userNumbers[counter] === 0
    ) {
      do {
        userNumbers[counter] = +prompt(
          "Option is not correct, you must enter a number greater than 0."
        );
      } while (
        isNaN(userNumbers[counter]) ||
        userNumbers[counter] === null ||
        userNumbers[counter] === 0
      );
    }
    counter++;
    do {
      calculate = prompt(
        "To calculate press C. To enter another number, press any other key."
      );
    } while (calculate === null);
    calculate = calculate.toLowerCase();
  } while (calculate !== "c");
  userResults = [];
  switch (counter) {
    case 1:
      console.log("Number entered is: " + userNumbers[0]);
      userResults.push(Math.sqrt(userNumbers[0]).toFixed(3));
      console.log("Square root is: " + userResults[0]);
      break;
    case 2:
      console.log(
        "Numbers entered are: " +
          userNumbers[0] +
          " and " +
          userNumbers[1] +
          "."
      );
      userResults.push((userNumbers[0] + userNumbers[1]).toFixed(3));
      console.log("The sum is: " + userResults[0]);
      userResults.push((userNumbers[0] - userNumbers[1]).toFixed(3));
      console.log("The subtraction is: " + userResults[1]);
      userResults.push((userNumbers[0] * userNumbers[1]).toFixed(3));
      console.log("The multiplication is: " + userResults[2]);
      userResults.push((userNumbers[0] / userNumbers[1]).toFixed(3));
      console.log("The division is: " + userResults[3]);
      break;
    default:
      let totalSum = 0;
      console.log("Numbers entered are:");
      for (let i = 0; i < userNumbers.length; i++) {
        totalSum = totalSum + userNumbers[i];
        console.log(userNumbers[i]);
      }
      userResults.push((totalSum).toFixed(3));
      console.log("The total sum of the arguments given is: " + userResults[0]);
      break;
  }
  return userResults;
};

let auxiliaryResults = [];
let finalResults = [];
let exit;

do {
  auxiliaryResults = calculator();
  for (i = 0; i < auxiliaryResults.length; i++) {
    finalResults.push(auxiliaryResults[i]);
  }
  do {
  exit = prompt(
    "To exit calculator press E. To continue calculating, press any other key"
  );
  } while (exit === null);
  exit = exit.toLowerCase();
} while (exit !== "e");

console.log("All your results are summarized here:");
for (i = 0; i < finalResults.length; i++) {
  console.log(finalResults[i]);
}
