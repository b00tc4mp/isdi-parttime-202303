function at(array,index){
    if (index >= 0) {
        for(let i = 0; i < array1.length ; i++){
            if(i === index) {
                return array1[i]
            }
        }
    } else if (index < 0) {
        for(let i = 0; i < array1.length; i++){
            if(i===(array1.length+index)){
                return array1[i]
            }
        }
    }
}


const array1 = [5, 12, 8, 130, 44];

let index = 2;

console.log(at(array1,index))
// Expected output: "Using an index of 2 the item returned is 8"

index = -2;

console.log(at(array1,index))
// Expected output: "Using an index of -2 item returned is 130"
