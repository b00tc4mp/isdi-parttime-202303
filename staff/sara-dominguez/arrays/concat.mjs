
function concat(...elements){
   const arrayConcated = []
   for(let i = 0; i < elements.length; i++) {
         let element = elements[i]
            if(element === Number){
               arrayConcated[arrayConcated.length] = element
            }else{
               for (let j = 0; j < element.length; j++){
                  let elem = element[j]
                  arrayConcated[arrayConcated.length] =elem
               }
            }
      
   }
   return arrayConcated
}


/*
function concat(array3, array1, array2){
   for(let i = 0; i <array1.length; i++){
    array3[array3.length] = array1[i] 
   }
   for(let j = 0; j <array2.length; j++){
    array3[array3.length] =  array2[j] 
   }
   
   return array3
}
*/
export default concat