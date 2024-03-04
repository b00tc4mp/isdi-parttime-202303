import { useContext } from "react"
import Context from "../../AppContext"
//if youu use "export default" with an arrow function, dont name it, only where receive it
export default () => useContext(Context)