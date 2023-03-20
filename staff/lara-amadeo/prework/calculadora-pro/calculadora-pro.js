const addition = (array) => {
    let addTotal = array[0]
    
    for (let i = 1; i < array.length; i++){
         addTotal = addTotal + array[i] 
    }
    return addTotal
}


const subtraction = (array) => {
    let subTotal = array[0]
    
    for (let i = 1; i < array.length; i++){
        subTotal = subTotal - array[i]
    }
    return subTotal
}


const multiplication = (array) => {
    let multiTotal = array[0]
    
    for (let i = 1; i < array.length; i++){
        multiTotal = multiTotal * array[i]
    }
    return multiTotal
}


const division = (array) => {
    let divTotal = array[0]
    
    for (let i = 1; i < array.length; i++){
        divTotal = divTotal / array[i]   
    }    
    return divTotal
}


const getNumbers = (userValues = []) => { 
    let userInput = prompt("Welcome to Miss Calculator! \n\nPlease, enter a number to start calculation. If you want to calculate an square root just enter one number. \n\n When you finish entering numbers, type 'end'")
   
    if (!isNaN(userInput)) {
      userValues.push(Number(userInput))
      userValues = getNumbers(userValues) 
    }  else {
        if (userInput === 'end'){
            return userValues
        } else {
            alert('You entered alphabetic values. Please enter numeric values. Do you want to try again?')
            getNumbers()
          }
        }
    return userValues
} 

const getContinued = () => {
    let answer = prompt("Do you want to make another calculation? \nType 'yes' to continue or 'no' to finish")

    if (answer === 'yes'){
        run()
    } else alert('I hope you enjoyed Miss Calculator, see you soon!')
}

function run(){
    let values = getNumbers()

    if (values.length === 1){
        console.log(Math.sqrt(values))
        getContinued()
    } else {
        console.log('The addition of your numbers is: ' + addition(values))
        console.log('The substraction of your numbers is: ' + subtraction(values))
        console.log('The multiplication of your numbers is: ' + multiplication(values))
        console.log('The division of your numbers is: ' + division(values))
        getContinued()
    }  
}


run()
