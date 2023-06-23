import IData from "../model/IData"
import ILoginStore from "../model/ILoginStore"
import { makeAutoObservable } from "mobx"

/*
como mobx es nuevo de momento solo se la forma de crearlo con compos de tipo clase 
con esta i es la nomenclatura que se asigna a una interfaz, y una interfaz es 
 */


class LoginStore implements ILoginStore {
    constructor() { makeAutoObservable(this) } //evita hacer cosas de decoradores 

    data: { email: string, password: string } = {
        email : "",
        password : ""
    }

 // void es un tipado que dice que no va a devolver nada 
    setData = (value:IData):void => {
        this.data = value
    }
}

export default LoginStore




