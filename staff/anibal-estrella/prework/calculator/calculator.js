const emoji = [
    String.fromCodePoint(0x1f920),
    String.fromCodePoint(0x1f913),
    String.fromCodePoint(0x1f616),
    String.fromCodePoint(0x1f916),
    String.fromCodePoint(0x1f3ae),
    String.fromCodePoint(0x2705),
  ];
  
  function calculator(n1, n2) {
    //initiate result
    let result = [];
    let nArr = [n1 * 1, n2 * 1];
  
    //if no number input
    if ((n1 === "" && n2 === "") || (n1 === null && n2 === null)) {
      return alert(`${emoji[3]} OOOPS! 
  You haven't input numbers.`);
    }
    // if either one is a letter
    else if (isNaN(n1) || isNaN(n2)) {
      return alert(`${emoji[3]} 
  One of the numbers is a letter`);
    }
    //if one empty
    else if (n1 === "" || n2 === "" || n1 === null || n2 === null) {
      if (n1) {
        return alert(
          `${emoji[3]} The square root of ${n1} is ${Math.sqrt(n1).toFixed(3)}`
        );
      } else {
        return alert(
          `${emoji[3]} The square root of ${n2} is ${Math.sqrt(n2).toFixed(3)}`
        );
      }
    } else {
      n1 = nArr[0];
      n2 = nArr[1];
  
      let add = nArr[0] + nArr[1];
      let sub = nArr[0] - nArr[1];
      let div = nArr[0] / nArr[1];
      let mul = nArr[0] * nArr[1];
  
      let all = [add, sub, div, mul];
      let allFixed = [];
      //check if has decimals and add results with 3 decimals
      for (let x of all) {
        // if result has decimals and convert decimals to only 3 decimals else add it
        if (x - Math.floor(x) !== 0) {
          //convert all results to 3 decimals Number
          allFixed.push(x.toFixed(3));
        } else {
          allFixed.push(x);
        }
  
        result = [
          ` The addition of ${nArr[0]} + ${nArr[1]} = ${allFixed[0]}`,
          ` The substraction of ${nArr[0]} - ${nArr[1]} = ${allFixed[1]}`,
          ` The divition of ${nArr[0]} / ${nArr[1]} = ${allFixed[2]}`,
          ` The multiplication of ${nArr[0]} * ${nArr[1]} = ${allFixed[3]}`,
        ];
      }
    }
  
    return alert(`${emoji[3]} This is the result: ${result}`);
  }
  calculator(
    prompt(`Please, input a number ${emoji[0]}`),
    prompt(`Well done Einstein! ${emoji[1]} 
  Input another number.`)
  );