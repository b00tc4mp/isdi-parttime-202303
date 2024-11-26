const startCalculator = () => {
    const total = []
    const getFirstNumber = () => {
        const value1 = prompt('Enter one number') * 1
        if (Number.isNaN(value1)) {
            alert('This is not a number! Please enter a number.'),
            getFirstNumber()
        } else {
            total.push(value1)
        }
    }

    getFirstNumber()
    let controlMultiValues = false
    if (total.length <  2) {
        controlMultiValues = true
    }

    const updateOperations = () => {
        console.log(``);
        console.log(`______`);
        console.log(``);
        console.log(`Calculating...`);
        console.log(`...33%`);
        console.log(`......66%`);
        console.log(`..........100%`);
        console.log(`%cYour Numbers: ${total}`, "color:#E12FE1");

        if (controlMultiValues) {
            const sumOperation = (...numbers) => {
                let result = numbers.reduce((a, b) => a + b);
                return Math.round( result * 1000 + Number.EPSILON ) / 1000    
            }
            console.log(`%cSum operation: ${sumOperation(...total)}`, "color:#4AEE4A");

            const substractOperation = (...numbers) => {
                let result = numbers.reduce((a, b) => a - b);
                return Math.round( result * 1000 + Number.EPSILON ) / 1000    
            }
            console.log(`%cSubtract operation: ${substractOperation(...total)}`, "color:#00B8FF");

            const multiplyOperation = (...numbers) => {
                let result = numbers.reduce((a, b) => a * b);
                return Math.round( result * 1000 + Number.EPSILON ) / 1000
            }
            console.log(`%cMultiply operation: ${multiplyOperation(...total)}`, "color:#F48B36");

            const divisionOperation = (...numbers) => {
                let result = numbers.reduce((a, b) => a / b);
                return Math.round( result * 1000 + Number.EPSILON ) / 1000
            }
            console.log(`%cDivision operation: ${divisionOperation(...total)}`, "color:#E2C23D");
        } 
    } 
    const getInput = () => {
        const insertValue = confirm('Do you want to enter another number?') 
        if (insertValue){
            controlMultiValues = true
            value = prompt('Enter another number') * 1
            if (Number.isNaN(value)) {
                alert('This is not a number! Please enter a number.'),
                getInput()
            } else {
                total.push(value)
                updateOperations()
                getInput()
            }
        } else if (total.length <= 1 && insertValue === false) {
            console.log(``);
            console.log(`${total}`)
            console.log(`%cThe result of 0, is 0!`, "color:#E2C23D");
        } else if (total.length === 1 && insertValue === false) {
            const squareRootOperation = (a) => {
                const r2 = Math.sqrt( total )
                console.log(`${total}`)
                return Math.round( r2 * 1000 + Number.EPSILON ) / 1000
            }
            console.log(``);
            console.log(`______`);
            console.log(``);
            console.log(`Calculating...`);
            console.log(`...33%`);
            console.log(`......66%`);
            console.log(`..........100%`);
            console.log(`${total}`)
            console.log(`%cSquare root operation: ${squareRootOperation()}`, "color:#E2C23D");
        }
        if (!insertValue){
            const exit = confirm('Do you want to stop?')
            if (exit){
                const startAgain = confirm('Do you want to start again?') 
                if (startAgain) {
                    startCalculator()
                } else {   
                    console.log('______');
                    console.log('');
                    console.log('Bye! Thanks for playing!')
                }
            } else {
                getInput()
            }
        }
    }
    getInput()
}
startCalculator()