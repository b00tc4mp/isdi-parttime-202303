
// for of --> item es array[i], lo recorre entero; añadir un const delante
// si no se indica el const, se crea una variable global y no conviene por si entra en conflicto con otras variables.

function includes(array, element) {
    for(const item of array){
        if(item === element){
            return true
        }
    } 
    return false    
}


