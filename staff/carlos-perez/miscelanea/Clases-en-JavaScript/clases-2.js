//Métodos estáticos

class Rectangulo{

    constructor(ladoG, ladoP){
        this.ladoGrande=parseInt(ladoG);
        this.ladoPequenho=parseInt(ladoP);
    }

    static area(ladoGrande,ladoPequenho){
        return ladoGrande*ladoPequenho;
    }

    dameArea(){
        return this.ladoGrande*this.ladoPequenho;
    }

    //Getters y Setters

    get getLadoGrande(){
        return this.ladoGrande;
    }

    get getLadoPequenho(){
        return this.ladoPequenho;
    }

    set setLadoGrande(ladoG){
        this.ladoGrande=ladoG;
    }

    set setLadoPequenho(ladoP){
        this.ladoPequenho=ladoP;
    }
}

console.log(Rectangulo.area(3,2)); //6

const miForma= new Rectangulo(4,5);
console.log(miForma.dameArea()); //20

console.log(miForma.getLadoGrande); //4
miForma.setLadoGrande=5;
console.log(miForma.getLadoGrande); //5