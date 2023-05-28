function reverse(array){
    let newArray = []
    let index = 0

    for (let i = array.length-1; i >= 0; --i){
        newArray[index] = array[i]
        index++
    }

    for (let i = 0; i < newArray.length; i++){
        array[i] = newArray[i]
    }
    
    return array
}

const array1 = ['one', 'two', 'three'];
console.log(reverse(array1))
// Expected output: "reversed:" Array ["three", "two", "one"]

console.log(array1);
// Expected output: "array1:" Array ["three", "two", "one"]


