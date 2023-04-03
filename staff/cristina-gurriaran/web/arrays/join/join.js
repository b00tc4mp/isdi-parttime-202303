const array = ['Fire', 'Air', 'Water'];

console.log(elements.join());
// Expected output: "Fire,Air,Water"

console.log(elements.join(''));
// Expected output: "FireAirWater"

console.log(elements.join('-'));
// Expected output: "Fire-Air-Water"



function join(array,separator){
    let string = ''

   

    if(separator === undefined){
        for(let i=0; i < array.length; i++){
            string = string + array[i]
        }   
        return string
    }

}

const elements = ['Fire', 'Air', 'Water'];
separator = ''
join(elements, separator)

