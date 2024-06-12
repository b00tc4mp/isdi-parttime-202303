import {miAvion} from "./avion.js";

export class Agencia {
    avion;

    constructor() {
        this.avion = miAvion;
    }

    quieroDevolverBilletes(billetes) {
        try{this.avion.devuelveBilletes(billetes);}
        catch(e){alert(e.message);}
        console.log('Billetes devueltos');
    }
}