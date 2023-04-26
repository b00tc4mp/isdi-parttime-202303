
function join(array,separator = ','){
    let string = ''

    for(let i=0; i < array.length; i++){
        string += array[i] 
        if(i < array.length - 1) string += separator 
        }   
    return string

}

const elements = ['Fire', 'Air', 'Water'];

console.log(join(elements))
// Expected output: "Fire,Air,Water"

console.log(join(elements, ''))
// // Expected output: "FireAirWater"

console.log(join(elements,'-'))
// // Expected output: "Fire-Air-Water"


