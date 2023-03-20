let calculator = () => {
  let number1;
  number1 = +prompt("Insert first number:");
  if (isNaN(number1) || number1 === null || number1 === 0) {
    do {
      number1 = +prompt(
        "Option is not correct, you must enter a number greater than 0."
      );
    } while (isNaN(number1) || number1 === null || number1 === 0);
  }
  let insertSecond;
  do {
    insertSecond = prompt("Do you want to insert a second number? Y/N");
    insertSecond = insertSecond.toLowerCase();
    if (insertSecond === "y") {
      let number2;
      number2 = +prompt("Insert second number");
      if (isNaN(number2) || number2 === null || number2 === 0) {
        do {
          number2 = +prompt(
            "Option is not correct, you must enter a number greater than 0."
          );
        } while (isNaN(number2) || number2 === null || number2 === 0);
      }
      console.log("Numbers entered are: " + number1 + " and " + number2 + ".");
      let userResults = [];
      userResults.push(number1 + number2);
      console.log("The sum is: " + userResults[0]);
      userResults.push(number1 - number2);
      console.log("The subtraction is: " + userResults[1]);
      userResults.push(number1 * number2);
      console.log("The multiplication is: " + userResults[2]);
      userResults.push(number1 / number2);
      console.log("The division is: " + userResults[3]);
    } else if (insertSecond === "n") {
      console.log("Number entered is: " + number1);
      let userResults = [];
      userResults.push(Math.sqrt(number1));
      console.log("Square root is: " + userResults[0]);
    }
  } while (insertSecond !== "y" && insertSecond !== "n");
};
