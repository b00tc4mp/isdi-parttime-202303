
export default class Curri {
    
    constructor(){
        if(arguments.length === 1 && typeof arguments[0] === 'number'){
            this.length = arguments[0]
        } else{
            for(let i = 0; i < arguments.length; i++){
                this[i] = arguments[i]
            }
            this.length = arguments.length
        }

    }

    forEach(callback) {
        for (let i = 0; i < this.length; i++) {
            const element = this[i]
                
            callback(element, i, this)
        }
    }

    map(callback){
        const mapped = new Curri

        for (let i = 0; i < this.length; i++) {
            const element = this[i]
            
            mapped[mapped.length] = callback(element)
            mapped.length++
        }
        return mapped
    }

    concat(...objs){
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

    fill(value, start, end){
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

    find(callback){
        for(let i = 0; i < this.length; i++){
            if(callback(this[i])) 
            return this[i]
        } return undefined
    }

    includes(element){
        for (let i = 0; i < this.length; i++) {
            if (this[i] === element) {
                return true
            }
        } return false
    }

    indexOf(element, fromIndex){
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

    join(separator){
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

    isCurri(collection){
        if(collection.constructor === Curri) return true

        else return false
    }

    lastIndexOf(element, lessThanPosition){
        let value

        if(!lessThanPosition){
            for(let i = this.length-1; i >= 0; --i){
                if(this[i] === element) {
                    value = i
                    return value
                }
            } return value ? value : -1
        } else {
            if (lessThanPosition >= 0){
                for(let i = lessThanPosition; i >= 0; --i){
                    if (this[i] === element){
                        value = i
                        return value
                    }
                } return -1
            } else {
               const initialPosition = this.length + lessThanPosition
                for(let i = initialPosition; i >= 0; --i){
                    if(this[i] === element){
                        value = i
                        return value
                    }
                } return -1
            }
        }
    }

    reduce(callback, initialValue){
        const hasInitialValue = initialValue !== undefined

        let accum = hasInitialValue ? initialValue : this[0]
    
        for (let i = hasInitialValue ? 0 : 1; i < this.length; i++)
            accum = callback(accum, this[i])
    
        return accum
    }

    reverse(){
        let newCurri = new Curri
        let index = 0
        for (let i = this.length-1; i >= 0; --i){
            newCurri[index] = this[i]
            index++
            newCurri.length++
        }

        for (let i = 0; i < newCurri.length; i++){
            this[i] = newCurri[i]
        }
        
        return this
    }

    shift(){
        let removed
        if(this.length === 0) return undefined

        else {
            removed = this[0]
            for(let i = 1; i < this.length; i++){
                this[i-1] = this[i]
            } 
            delete this[this.length - 1]
            this.length = this.length-1
            return removed
        }
    }

    slice(start, end){
        let newArray = new Curri

        if(!start && !end || start < -this.length) { 
            let initialPosition = 0
            let index = 0

            for(let i = initialPosition; i < this.length; i++){
                newArray[index] = this[i]
                index++
            }
                return newArray
        }

        else if(!end){
            let initialPosition = start >= 0 ? start : start + this.length
            let index = 0

            for(let i = initialPosition; i < this.length; i++){
                newArray[index] = this[i]
                index++
            }
                return newArray
        } 
        
        else { 
            let initialPosition = start >= 0 ? start : start + this.length
            let endPosition = end >= 0 ? end : end + this.length
            let index = 0

            for(let i = initialPosition; i < endPosition; i++){
                newArray[index] = this[i]
                index++
            }
                return newArray
        }
    }

    some(callback){
        for(let i = 0; i < this.length; i++){
            if(callback(this[i])) 
            return true
        } return false
    }

    unshift(...elements){
        let newCurri = new Curri
        let index = 0
        for(let i = 0; i < elements.length; i++){
            newCurri[index] = elements[i]
            index++
            newCurri.length++
        }
    
        for(let i = 0; i < this.length; i++){
            newCurri[newCurri.length] = this[i]
            newCurri.length++
        }
        
        for(let i = 0; i < newCurri.length; i++)
            this[i] = newCurri[i]
    
        return newCurri.length
    }
}
