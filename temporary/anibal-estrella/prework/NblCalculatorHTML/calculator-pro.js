let finalResult = [];
function calculator(nArr) {
  //ask numbers
  function askNumber(nArr) {
    nArr = prompt(`Please, input numbers separated by spaces`);
    return nArr;
  }

  //check input errors
  function errorTest(nArr) {
    if (nArr === "" || nArr == null) {
      alert("Errors Found, try again!");
      return true;
    } else {
      return false;
    }
  }

  //convert promt into numbers
  function convert(x) {
    nArr = x.trim().split(" ");
    nArr = nArr.map((x) => {
      return (nArr = Number(x));
    });
  }

  //check if NaN Error
  function isSingleNaN(nArr) {
    if (isNaN(nArr)) {
      alert("Errors Found, try again!");
      return true;
    } else {
      return false;
    }
  }

  //check if NaN Error
  function isArrayNaN(nArr) {
    
    
    
    if ( nArr.reduce(
        
        (previousValue, currentValue) => isNaN(currentValue)) ){
          console.log("0000checkiiiinggggggg!", { nArr });
        error = true;
      } else {
        console.log("checkiiiinggggggg!", { nArr });
        error = false;
      }
    
  }

  //if 1 digit enter calculate square root
  function calculate(nArr) {
    error=errorTest(nArr) // test si es undefine o null
   error = isArrayNaN(nArr) 
    if (nArr.length === 1 && error == !true) {
      if (Math.sqrt(nArr) - Math.floor(Math.sqrt(nArr)) !== 0) {
        return alert(
          ` The square root of ${nArr} is ${Math.sqrt(nArr).toFixed(3)}`
        );
      } else {
        return alert(` The square root of ${nArr} is ${Math.sqrt(nArr)}`);
      }
    } else {
      //do operations
     

      const sum = nArr.reduce(
        (previousValue, currentValue) => previousValue + currentValue
      );

      const sub = nArr.reduce(
        (previousValue, currentValue) => previousValue - currentValue
      );

      const mult = nArr.reduce(
        (previousValue, currentValue) => previousValue * currentValue
      );
      const div = nArr.reduce(
        (previousValue, currentValue) => previousValue / currentValue
      );

      const all = [sum, sub, mult, div];
      const allFixed = [];
      //check if has decimals and add results with 3 decimals
      for (let x of all) {
        // if result has decimals and convert decimals to only 3 decimals else add it
        if (x - Math.floor(x) !== 0) {
          //convert all results to 3 decimals Number
          allFixed.push(x.toFixed(3));
        } else {
          allFixed.push(x);
        }
      }
      finalResult += [
        `The addition between ${nArr} = ${allFixed[0]}`,
        ` The substraction between ${nArr} = ${allFixed[1]}`,
        ` The multiplication between ${nArr} = ${allFixed[2]}`,
        ` The dividion between ${nArr} = ${allFixed[3]}`,
      ];
      console.log(finalResult);
    }
  }
  //ask for new nnumbers
  function newNumbers() {
    const answer = prompt(`The result is: 
${finalResult}

New numbers? y/n`);

    if (answer === "y") {
      console.log(finalResult);
      calculator();
    } else {
      return alert(`Bye!
${finalResult}`);
    }
  }
  //Flow
  console.log("begins!");
  nArr = askNumber(nArr);

  do {
    convert(nArr);
    calculate(nArr);
    newNumbers(nArr);
    break;
  } while (error == false);

  while (error) {
    console.log("2", errorTest(nArr));
    nArr = askNumber(nArr);
    convert(nArr);
    calculate(nArr);
    newNumbers(nArr);
    break;
  }
}

calculator();
