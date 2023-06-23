import React from "react"
import ILoginStore from "../model/ILoginStore"
import LoginStore from "../store/LoginStore"
// creamos contextos para modulos porque queremos hacer viajar la info fuera de ese modulo 
export const LoginContext = React.createContext({
    loginStore: new LoginStore() as ILoginStore
})

export const useLoginStore = () => React.useContext(LoginContext)



/*
Estamos creando un cajon para almacenar calcetines , en el que dentro vamos a guardar calcetines, cada store 
es un calcetin (Aqui le hemos llamado login context porque la vamos a usar en este modulo). 
 */