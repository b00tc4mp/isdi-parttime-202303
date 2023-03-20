const generateCard = () =>{
    let firstline = getFirstLine()
    let secondline = getSecondLine()
    let thirdline = getThirdLine()
    
    console.log('Your card is this: ')
    console.log(firstline.join(' | ') + '\n' + secondline.join(' | ') + '\n' + thirdline.join(' | '))

    return [firstline, secondline, thirdline]
}

const [line1, line2, line3] = generateCard();

console.log(line1);
console.log(line2);
console.log(line3);