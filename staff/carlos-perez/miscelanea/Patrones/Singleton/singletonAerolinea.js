import {miAvion} from "./avion.js";
import {Usuario} from "./usuario.js";
import {Agencia} from "./agencia.js";

const avion = miAvion;
const usuario = new Usuario();
const agencia = new Agencia();

usuario.quieroComprarBilletes(3);
console.log(avion.cuantosAsientosQuedan());
agencia.quieroDevolverBilletes(2);
console.log(avion.cuantosAsientosQuedan());
