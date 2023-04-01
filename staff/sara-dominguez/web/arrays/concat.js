function concat(array3, array1, array2){
   for(let i = 0; i <array1.length; i++){
    array3[array3.length] = array1[i] 
   }
   for(let j = 0; j <array2.length; j++){
    array3[array3.length] =  array2[j] 
   }
   
   return array3
}