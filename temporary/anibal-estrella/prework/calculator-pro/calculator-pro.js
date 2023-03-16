let finalResult = [];
function calculator(nArr) {

  console.log("hola >>>>>>", { nArr }, typeof nArr);
let error=false;
  //ask numbers
  function askNumber(nArr) {
    nArr = prompt(`Please, input numbers separated by spaces`);
    console.log("preguntando >>>>>>", { nArr }, typeof nArr);
    return nArr;
  }

 

  //check input errors
  function errorTest(nArr) {
    console.log("checando errores >>>>>>", { nArr }, typeof nArr);
    if (nArr === ''|| nArr == null) {
      console.log("found errores >>>>>>", { nArr }, typeof nArr);
      alert('Errors Found, try again!')
      return  true;
    } else {
      console.log("Sin errores >>>>>>", { nArr }, typeof nArr);
      return  false;

    }
  };



  //convert promt into numbers
  function convert(x) {
    nArr = x.trim().split(" ");
    nArr = nArr.map((x) => {
      return nArr = Number(x);
    });
    console.log("converting >>>>>>", { nArr }, typeof nArr);

  }

  //if 1 digit enter calculate square root
  function calculate(nArr) {
    if (nArr.length === 1) {
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
    const answer = prompt(`New numbers? y/n`);

    if (answer === "y") {
      console.log(finalResult);
      calculator();
    } else {
      return alert(`Bye!
${finalResult}`);
    }
  };
//Flow
nArr = askNumber(nArr);
error = errorTest(nArr)

while(error){
  console.log({error})
  nArr = askNumber(nArr);
  console.log( error,{ nArr }, typeof nArr);
  error = errorTest(nArr)
  break
} 

while(error == false){
  console.log({error})
    convert(nArr)
    console.log( { nArr }, typeof nArr);
    calculate(nArr)
    console.log( { nArr }, typeof nArr);
    newNumbers(nArr)
    console.log( { nArr }, typeof nArr);
break
  }




}

calculator();