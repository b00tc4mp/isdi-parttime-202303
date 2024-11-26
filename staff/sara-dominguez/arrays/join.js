function join (newString, joinWith , elements) {
    let newString 
    
    for(let i = 0; i < elements.length; i++) {
       newString = (`${elements[i]}${joinWith}`)
    }
   return newString
}

 