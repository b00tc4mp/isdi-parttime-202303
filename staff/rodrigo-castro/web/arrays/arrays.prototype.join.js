const elements2 = ['Fire', 'Air', 'Water'];

const join = (array, separator = ',') => {
    let result
    for(let element of array){
        if(result === undefined){
            result = `${element}`
        } else {
            result = `${result}${separator}${element}`
        }
    }
    return result
}

console.log(join(elements2));
// Expected output: "Fire,Air,Water"

console.log(join(elements2, ''));
// Expected output: "FireAirWater"

console.log(join(elements2, '-'));
// Expected output: "Fire-Air-Water"
