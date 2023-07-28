import { Link } from 'react-router-dom'
import { loginUser } from '../../logic'
import { useAppContext } from "../hooks"
import { useHandleErrors } from '../hooks'
import { Container, Form, Input, Button } from '../library'

export default function Login() {
    const { navigate } = useAppContext()
    const handleErrors = useHandleErrors()

    const handleLogin = (event) => {
        event.preventDefault()

        const email = event.target.email.value
        const password = event.target.password.value

        handleErrors(async () => {
            await loginUser(email, password)

            navigate('/')
        })

    }

    console.log('login -> render');

    return <Container className="w-screen h-screen bg-white flex flex-col items-center justify-center bg-[url(src/images/wallpaper.jpg)] bg-cover bg-center">
        <div className='flex justify-center items-center w-11/12 pt-8'>
            <div className="w-4/5 h-[500px] bg-white rounded-[10px] border border-black flex flex-col items-center justify-center">
                <img className="max-w-[140px] h-[140px] mt-[-100px] rounded-full" src="src/images/logo-login&register.jpg" />
                <Form className="flex flex-col gap-4 w-80 items-center my-5" onSubmit={handleLogin}>
                    <div className="h-[54px] text-black text-4xl font-normal">WELCOME</div>
                    <Input className="w-4/5 h-12 border-black border-2 rounded-lg p-4" type="email" name="email" placeholder="Email" />
                    <Input className="w-w-4/5 h-12 border-black border-2 rounded-lg p-4" type="password" name="password" placeholder="Password" />
                    <Button className="w-2/3 text-xl bg-blue-200">Login</Button>
                </Form>
                <div className="flex flex-col gap-1 mt-6 items-center">
                    <div className="text-center"><span className="text-black text-base font-normal">Don’t have an account?<br />Go to </span><Link to="/register" className="text-sky-500 text-base font-bold">Register</Link></div>
                    <div className="w-[60px] h-[0px] border border-black"></div>
                    <div className='text-center'><span className="text-black text-base font-normal">Forgot your password?<br />Click </span><span className="text-sky-500 text-base font-bold">here</span></div>
                </div>
            </div>
        </div>
    </Container>
}