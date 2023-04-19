function Curri() {
    this.length = 0
}

Curri.of = function(){
    const c = new Curri;

    for(let i=0; i<arguments.length; i++){
        c[i]=arguments[i];

        c.length++;
    }

    return c;
}

Curri.prototype.forEach = function(callback) {
    for (let i = 0; i < this.length; i++) {
        const element = this[i]
        
        callback(element)
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