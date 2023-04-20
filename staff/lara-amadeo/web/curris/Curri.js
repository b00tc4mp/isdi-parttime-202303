
export default function Curri() {
    
    
    if(arguments.length === 1 && typeof arguments[0] === 'number'){
        this.length = arguments[0]
    } else{
        for(let i = 0; i < arguments.length; i++){
            this[i] = arguments[i]
        }
        this.length = arguments.length
    }
}

Curri.prototype.forEach = function(callback) {
    for (let i = 0; i < this.length; i++) {
        const element = this[i]
        
        callback(element, i, this)
    }
}

Curri.prototype.map = function map(callback) {
    const mapped = new Curri

    for (let i = 0; i < this.length; i++) {
        const element = this[i]
        
        mapped[mapped.length] = callback(element)
        mapped.length++
    }

    return mapped
}

Curri.prototype.concat = function(...objs){
    let newCurri = new Curri

    for (let i = 0; i < this.length; i++){
        newCurri[i] = this[i]
        newCurri.length++
    }

    for(let obj of objs){
        for (let i = 0; i < obj.length; i++){
            newCurri[newCurri.length] = obj[i]
            newCurri.length++
        }
    }
  return newCurri
}

Curri.prototype.fill = function(value, start, end){

    if(start === NaN && end === NaN) return this

    else if (start === NaN) return this

    else if(!start && !end){
        for(let i = 0; i < this.length; i++){
            this[i] = value
        } return this
    }

    else if(!end || end === NaN){
        const startPosition = start >= 0 ? start : this.length + start

        if(startPosition >= this.length) return this

        for(let i = startPosition; i < this.length; i++){
            this[i] = value
        } return this
    }

    else {
        const startPosition = start >= 0 ? start : this.length + start
        const endPosition = end >= 0 ? end : this.length + end

        if(startPosition >= this.length) return this

        for(let i = startPosition; i < endPosition; i++ ){
            this[i] = value
        } return this
    }
}

Curri.prototype.find = function(callback) {
    for(let i = 0; i < this.length; i++){
        if(callback(this[i])) 
        return this[i]
    } return undefined
}

Curri.prototype.includes = function(element){
    for (let i = 0; i < this.length; i++) {
        if (this[i] === element) {
            return true
        }
    } return false
}

Curri.prototype.indexOf = function(element, fromIndex){
    let value

    if (!fromIndex){
        for(let i = 0; i < this.length; i++){
            if(this[i] === element){
                value = i
                return value
            }
        } return value ? value : -1
    } else {
        if (fromIndex >= 0){
            for (let i = fromIndex; i < this.length; i++){
               if(this[i] === element){
                value = i
                return value ? value : -1 
               }
            }
        } else {
            const positiveIndex = -1*fromIndex
            const initialPosition = this.length - positiveIndex
            for (let i = initialPosition; i < this.length; i++){
                if(this[i] === element){
                    value = i
                    return value
                }
            } return  value ? value : -1 
        }
    }
}

Curri.prototype.join = function(separator) {
    let newArray = ''
 if (separator === '') {
    for(let i = 0; i < this.length; i++){
        newArray = newArray + this[i]
    }
}
     else if(!separator){
        for(let i = 0; i < this.length; i++){        
            newArray = newArray + this[i] + (i < this.length-1 ? ',' : '')
        }
     }
    else {
        for(let i = 0; i < this.length; i++){        
            newArray = newArray + this[i] + (i < this.length-1 ? separator : '')
        }
    } return newArray
}


Curri.isCurri = function(collection){
    
    if(collection.constructor === Curri) return true

    else return false
}

// Curri.prototype.lastIndexOf = function(element, lessThanPosition){
//     let value

//     if(!lessThanPosition){
//         for(let i = this.length - 1; i >= 0; --i){
//             if(this[i] === element) {
//                 value = i
//                 return value
//             }
//         } return value ? value : -1
//     } else {
//         if (lessThanPosition >= 0){
//             for(let i = lessThanPosition; i >= 0; --i){
//                 if (this[i] === element){
//                     value = i
//                     return value
//                 }
//             } return -1
//         } else {
//             const initialPosition = this.length + lessThanPosition
//             for(let i = initialPosition; i >= 0; --i){
//                 if(this[i] === element){
//                     value = i
//                     return value
//                 }
//             } return -1
//         }
//     }
// }