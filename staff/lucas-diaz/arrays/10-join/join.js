/*
concatena y devuelve una string con todos los elementos del array, separados por el "separador" si es que lo tenemos 

excepciones
- si el array es de 1 elemento devuelve el elemento en una string sin hacer na 
- si el lenght del array es 0 se devuevle --> ""
- si un element del array es null o undefined, lo transforma en "" 
*/

export default function join(array, separator){
    let result = ""
    let separatorItem = separator 
    if (separatorItem === undefined){
        separatorItem = ","
    }
    if (separatorItem === ""){
        separator = "";
    }
    if (typeof separatorItem !== "string"){
        separatorItem = "" + separator;
    }
    if (array.length === 0){
        return ""; 
    }
    if (array.length === 1){
        return "" + array[0];
    }

    for (const element in array){
        
        if (array[element] === null || array[element] === undefined){
            array[element] = " ";
        }
        
        result += array[element];

        if (element === `${array.length -1}`){
            continue
        }
        result += separatorItem;
    }
    return result;
}