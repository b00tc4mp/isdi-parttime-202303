// some --> si alguno de los elementos del array cumple la condicion marcada en la callback

function some (array, callback) {
    for(let i = 0; i < array.length; i++) {
        const element = array[i]
        if(callback(element) === true) {
            console.log(true)
            return true
        } 
    }
    console.log(false)
}

export default some