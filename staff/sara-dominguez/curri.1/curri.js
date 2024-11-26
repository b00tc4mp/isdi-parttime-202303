
function Curri() {
    this.length = 0
}


//.forEach
 Curri.prototype.forEach = function(callback) {
    for (let i = 0; i < this.length; i++) {
        const element = this[i]
        
        callback(element)
    }
}


//.map
 Curri.prototype.map = function map(callback) {
    const mapped = new Curri

    for (let i = 0; i < this.length; i++) {
        const element = this[i]
        
        mapped[mapped.length] = callback(element)
        mapped.length++
    }

    return mapped
}

//.push
 Curri.prototype.push = function(object,...elements) {
    for(let i = 0; i < object.length; i++) {
        const element = object[i];
        this[this.length] = element
        this.length ++   
    }
    return this.length
}

//.pop

 Curri.prototype.pop = function() {
    const last = this[this.length -1]
    delete this[this.length - 1]
    this.length --
    
    return last
}

//.some
 Curri.prototype.some = function (callback){
    for(let i = 0; i < this.length; i++) {
        const element = this[i]
        if(callback(element) === true) {
            console.log(true)
            return true
        } 
    }
    console.log(false)
}


//.every
 Curri.prototype.every = function (callback) {
    for(let i = 0; i < this.length; i++) {
        const element = this[i]
        while(callback(element) === false) {
            console.log(false)
            return false
        }
    }  
    return true
}

//.concat
Curri.prototype.concat = function (anotherCurry){

    const a = new Curri
    for(let i = 0; i <this.length; i++){
     a[i] = this[i] 
     a.length++
    }
    for(let j = 0; j <anotherCurry.length; j++){
     a[a.length] =  anotherCurry[j] 
     a.length++
    }
    console.log(a)
    return a
 }
 

//.fill

Curri.prototype.fill = function (elementToInclude, startIndexeElement, finalIndexElement){
    if((!finalIndexElement || finalIndexElement === ' ') && (!startIndexeElement || startIndexeElement === ' ')){
        
        finalIndexElement = this.length;
        startIndexeElement = 0; 
        for (let i = startIndexeElement; i < finalIndexElement; i++){
            this[i] = elementToInclude;
        }
        return this;
    }
    
    if(!finalIndexElement || finalIndexElement === ' '){
        finalIndexElement = this.length;
        for (let i = startIndexeElement; i < finalIndexElement; i++){
            this[i] = elementToInclude;
        }
        return this;
    }

    

    for (let i = startIndexeElement; i < finalIndexElement; i++){
        this[i] = elementToInclude;
    }
        return this;
}
// .includes
{
    Curri.prototype.includes = function (element,fromIndex) {
        if(fromIndex < 0){
            for(let i= this.length + fromIndex; i< this.length; i++){
                if(this[i]=== element){
                    return true
                }
            }
        }
        if(fromIndex >= 0) {
            for(let i= 0 + fromIndex; i< this.length; i++){
                
                if(this[i]=== element){
                    return true
                }
            } 
        }
        if(fromIndex === undefined || !fromIndex ) {
            for(let i= 0; i< this.length; i++){
                if(this[i] === element){
                    return true
                }
                
            } 
        }
        return false
    }
}

// .indexOf
{
    Curri.prototype.indexOf = function (element, position) {

    if(position === 0 || !position || position === ' ') {
        for(let i = 0; i < this.length; i++){
            if(element === this[i]) {
                return i    
            }
        }
        return -1
    }

    if(position < 0) {
        for(let i = (this.length + position); i < this.length; i++){
            if(element === this[i]) {
             return i
            }
        }
        return -1
    }
      

    if(position > this.length) {
        return -1
    }
   
    if(position < this.length){
        for(let i = position; i < this.length; i++){
            if(element === this[i]) {   
                return i
            }
        }
        return -1
    }
}
}
// .lastIndexOf
{
    Curri.prototype.lastIndexOf = function (element) {
 
        for (let i = this.length - 1; i >= 0; i--) {
            if (this[i] === element) {
                return i;
            }
        }
        return -1;
    }
    

}

// .reverse
{
    Curri.prototype.reverse = function (input, reversed) {
      
        if (reversed === ' ' ||!reversed){
            console.log(input, this)
            return this
        }
        if (reversed){
            const reversedCurri = new Curri
            
            for (let i = 0; i < this.length; i++) {
                reversedCurri[this.length-i - 1]= this[i]
                reversedCurri.length ++;
            }
            console.log(input, reversedCurri)
            return reversedCurri
        }
                
    }
           
}
//. toReversed
{
    Curri.prototype.toReversed = function (input, reversed) {
      
        if (reversed === ' ' ||!reversed){
            console.log(input, this)
            return this
        }
        if (reversed){
            const reversedCurri = new Curri
            
            for (let i = 0; i < this.length; i++) {
                reversedCurri[this.length-i - 1]= this[i]
                reversedCurri.length ++;
            }
            console.log(input, reversedCurri)
            return reversedCurri
        }          
    }    
}
//.shift
{
    Curri.prototype. shift = function (){
        const firstElement = this[0];
        const newCurri = new Curri
      
        for(let i = 0; i < this.length; i++){ 
    
          if(i === 0){
            this[0] = firstElement
            console.log (`firstElement: ${firstElement}`)
            
            }
            if(i !== 0){
                newCurri[i-1]= this[i]
                newCurri.length += 1
            }
        }
        console.log(newCurri)
        this.length = newCurri.length
    
        for(let i = 0; i < newCurri.length; i++){ 
            this[i] = newCurri[i]
            
        } 
        return newCurri
    }
}
// .at

Curri.prototype.at = function(index){
    if(index > 0){ 
      const element = this[index]
       return element
    }
    if(index < 0){
        const element= this[this.length + index]
        return element
    }
}



// TODO implement more Curri methods (same as this methods)

export default Curri 