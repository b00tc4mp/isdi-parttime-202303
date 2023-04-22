
// for of --> item es array[i], lo recorre entero; añadir un const delante
// si no se indica el const, se crea una variable global y no conviene por si entra en conflicto con otras variables.

function includes(array, element, fromIndex) {
    if(fromIndex < 0){
        for(let i= array.length + fromIndex; i< array.length; i++){
            if(array[i]=== element){
                return true
            }
        }
    }
    if(fromIndex >= 0) {
        for(let i= 0 + fromIndex; i< array.length; i++){
            
            if(array[i]=== element){
                return true
            }
        } 
    }
    if(fromIndex === undefined || !fromIndex ) {
        for(let i= 0; i< array.length; i++){
            if(array[i] === element){
                return true
            }
            
        } 
    }
    return false
}

export default includes

