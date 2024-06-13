import { observer } from "mobx-react-lite"
import { useLoginStore } from "../hook/useLoginStore"
import { ChangeEvent } from "react"


const Login = observer(() => {
    const { loginStore } = useLoginStore()

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        loginStore.setData({ ...loginStore.data, [event.target.name]: event.target.value })
    }
    console.log(JSON.stringify(loginStore.data))

    return (
        <>
            <p>{loginStore.data.email}</p>
            <p>{loginStore.data.password}</p>
            <form action="">
                <input name="email" type="text" placeholder="email" value={loginStore.data.email} onChange={handleChange} />
                <input name="password" type="text" placeholder="pass" value={loginStore.data.password} onChange={handleChange} />
                <button>login!</button>
            </form>
        </>
    )
})

export default Login

