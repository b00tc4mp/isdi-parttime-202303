class Curri {
    constructor () {
        if (arguments.length === 1 && typeof arguments[0] === 'number') {
            this.length = arguments[0]
        } else {
            for (let i = 0; i < arguments.length; i++)
                this[i] = arguments[i]

            this.length = arguments.length
        }
    }


    static of() {
        const c = new Curri

        for (let i = 0; i < arguments.length; i++) {
            c[i] = arguments[i]

            c.length++
        }

        return c
    }


    push(...elements) {
        for (let i = 0; i < elements.length; i++) {
            this[this.length] = elements[i]
            this.length++
        }
        return this.length
    }

    at(index) {
        if (index < 0 ) index = this.length + index
        
        return this[index]
    }

    concat(curri1, curri2) {
        let newCurri = new Curri()
        for (let i = 0 ; i < curri1.length; i++) { 
            newCurri[newCurri.length] = curri1[i]
            newCurri.length++
        }
        for (let i = 0 ; i < curri2.length; i++) {
            newCurri[newCurri.length] = curri2[i]
            newCurri.length++
        }
        return newCurri
    }

    every(callback) {
        for (let i = 0 ; i < this.length; i++)
            if (!callback(this[i])) 
                return false
                
        return true
    }

    fill(element, first, last) {
        if (first === undefined) first = 0
        if (last === undefined) last = this.length
        for(let i = first; i<last ; i++)
            this[i] = element

        return this
    }

    filter(callback) {
        const filtered = new Curri()

        for (let i = 0 ; i < this.length; i++) {
            const element =  this[i]

            if (callback(element)) {
                filtered[filtered.length]=element
                filtered.length++
            }
        }
            
        return filtered
    }

    find(callback) { 
        for (let i = 0 ; i < this.length; i++) {
            const element =  this[i]

            if(callback(element)) 
                return element
        }
        return undefined
    }

    findIndex(callback) {
        for(let i = 0 ; i < this.length; i++) 
            if (callback(this[i])) return i
        
        return -1
    }

    forEach(callback) {
        for (let i = 0 ; i < this.length; i++)  
            callback(this[i])
    }

    includes(element) {
        for (let i = 0 ; i < this.length; i++)  
            if (this[i] === element)
                return true

        return false
    }

    indexOf(element, ini) {
        if (ini === undefined) ini = 0
        if (ini < 0) 
            ini = this.length + ini

        for ( let i = ini; i < this.length; i++)
            if (this[i] === element)
                return i

        return -1
    }
}

export default Curri