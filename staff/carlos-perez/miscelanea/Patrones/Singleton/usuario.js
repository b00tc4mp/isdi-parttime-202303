import {miAvion} from "./avion.js";

export class Usuario {
    avion;
    constructor() {
        this.avion = miAvion;
    }

    quieroComprarBilletes(billetes) {
        try {this.avion.venderBilletes(billetes);}
        catch(e){alert(e.message);}
        console.log('Billetes comprados');
    }
}