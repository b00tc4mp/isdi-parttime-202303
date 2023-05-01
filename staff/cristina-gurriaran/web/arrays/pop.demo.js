function pop(array){
    const lastElement = array[array.length - 1]
    array.length = array.length - 1
    return lastElement
}



const plants = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato']

console.log(pop(plants))
// Expected output: "tomato"

console.log(plants)
// Expected output: Array ["broccoli", "cauliflower", "cabbage", "kale"]

console.log(pop(plants))
// Expected output: "kale"

console.log(plants)
// Expected output: Array ["broccoli", "cauliflower", "cabbage"]