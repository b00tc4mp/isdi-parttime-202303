import Context from "../Context.js"
import { useContext } from "react"


export default function Home() {
    const { loaderOn, LoaderOff } = useContext(Context)

    return <>
        <p className="title">Home! to be constructed</p>
    </>
}