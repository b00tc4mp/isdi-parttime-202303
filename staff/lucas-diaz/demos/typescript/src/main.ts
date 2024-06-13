//! VARIABLES 
let texto: string = "hola";
let numero: number = 5;
let verdadero: boolean = true;
let cualquiera: any = "podems meter lo que sea";

type letrasONumeros = string | number;
type signType = "suma" | "resta"

let operacion:signType = "suma" 


//! FUNCIONES
const calculadora = (a:number , b:number , op:signType):number => {
  if (op === "suma") return a + b
  
  return a - b
}

//! OBJETOS 
type person = {
  name:string
  surname:string
} 
const objWrapper = (name:string, surname:string):person => {
  return {
    name,
    surname
  }
}
console.log(objWrapper("lucas", "diaz"))

//! CLASES & Interfaces 
export default interface IRopa{
  getColor(): string
  getPrice(): number
}

class Camiseta implements IRopa{
  private color:string 
  private price:number

  constructor(color:string, price:number){
    this.color = color
    this.price = price
  }

  public getColor(){
    return this.color
  }
  public getPrice(){
    return this.price
  }
}

const camisa = new Camiseta("red", 5000)












