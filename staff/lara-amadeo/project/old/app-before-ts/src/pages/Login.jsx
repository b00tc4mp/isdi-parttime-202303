import Context from "../Context.js"
import { useContext } from "react"


export default function Login() {
    const { loaderOn, LoaderOff } = useContext(Context)

    loaderOn()
    return <>
    </>
}