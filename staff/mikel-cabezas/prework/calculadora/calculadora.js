const startCalc = () => { // Start the application
    // Define the first value of the operation with a prompt method (required)
    const value1 = prompt('Enter one number') * 1

    // Define the second value as null and if secondValue true return a prompt method for reassign second value (required)
    let value2 = null
    const secondValue = confirm('Do you want to enter a second number')
    if (secondValue){
        value2 = prompt('Enter a second number') * 1
    }
    // Sum function with conditional if is NaN or values are false
    const sumCalc = (a, b) => {
        const sum = a + b
        return Math.round( sum * 1000 + Number.EPSILON ) / 1000
    }
    // Rest function with conditional if is NaN or values are false
    const restCalc = (a, b) => {
        const rest = a - b
        return Math.round( rest * 1000 + Number.EPSILON ) / 1000
    }
    // multiply function with conditional if is NaN or values are false
    const multiplyCalc = (a, b) => {
        const multiply = a * b
        return Math.round( multiply * 1000 + Number.EPSILON ) / 1000
    }
    // Division function with conditional if is NaN or values are false
    const divisionCalc = (a, b) => {
        const division = a / b
        return Math.round( division * 1000 + Number.EPSILON ) / 1000
    }
    // Square root function with conditional if is NaN or values are false
    const sqrtCalc = (a) => {
        const r2 = Math.sqrt( a )
        return Math.round( r2 * 1000 + Number.EPSILON ) / 1000
    }

    // Variables of the result of calc
    const sumResult = sumCalc(value1, value2)
    const restResult = restCalc(value1, value2)
    const multiplyResult = multiplyCalc(value1, value2)
    const divisionResult = divisionCalc(value1, value2)
    const sqrtResult = sqrtCalc(value1)
    const operations = ['sum', 'rest', 'multiplication', 'division', 'sqrt']

    // Variable and conditionals for push all the results
    let allResults = []
    if (value1 && value2){
        allResults.push(sumResult, restResult, multiplyResult, divisionResult)
    } else if (value2 === 0 ){
        allResults.push(sumResult, restResult, multiplyResult, divisionResult)
    } else if (value2 === null ){
        allResults.push(sqrtResult)
    } 

    // Conditional with functions for print results
    if(Number.isNaN(value1) || Number.isNaN(value2)){ // Conditional for check if the value is a number or not
        return 'This is not a number! Please enter a number.'
    } else if (value1 && value2 === null) { // Function for print square root of value 1
        const printResults = () => {
            console.log('The square root of ' + value1 + ' is ' + allResults[0]) 
        }
        printResults ()
    } else if (value1 === 0 && value2 === 0){ // Function for print result if all values are true
        const printResults = () => {
            for (i = 0; i < allResults.length; i++) {
                for (j = 0; j < operations.length; j++) {}
                console.log('The ' + operations[i] + ' of ' + value1 + ' and ' + value2 + ' is ' + allResults[i]) 
            }
        }
        printResults ()    
    } else if (value1 === 0) { // Function for print 0 if value 1 is 0
        const printResults = () => {
            console.log('The square root of ' + value1 + ' is ' + allResults[0]) 
        }
        printResults ()
    } else if (secondValue === false) { // Function for print result if value 2 are 0
        const printResults = () => {
            console.log('The square root of ' + value1 + ' is ' + allResults[0]) 
        }
        printResults ()
    } else if (value2 === 0) { // Function for print result if value 2 are 0
        const printResults = () => {
            for (i = 0; i < allResults.length; i++) { 
                for (j = 0; j < operations.length; j++) {}
                console.log('The ' + operations[i] + ' of ' + value1 + ' and ' + value2 + ' is ' + allResults[i]) 
            }
        }
        printResults ()
    } else if (value1 && value2){ // Function for print result if all values have numbers
        const printResults = () => {
            for (i = 0; i < allResults.length; i++) {
                for (j = 0; j < operations.length; j++) {}
                console.log('The ' + operations[i] + ' of ' + value1 + ' and ' + value2 + ' is ' + allResults[i]) 
            }
        }
        printResults ()
    } 
}
startCalc() // Start calc function