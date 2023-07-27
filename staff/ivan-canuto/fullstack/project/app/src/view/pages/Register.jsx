import { Link } from 'react-router-dom'
import { useAppContext } from "../hooks"
import { useHandleErrors } from '../hooks'
import { Container, Form, Input, Button } from '../library'
import { registerUser } from '../../logic'

export default function Register() {
    const { navigate } = useAppContext()
    const handleErrors = useHandleErrors()

    const handleRegisterIn = (event) => {
        event.preventDefault()

        const name = event.target.name.value
        const email = event.target.email.value
        const password = event.target.password.value

        handleErrors(async () => {
            await registerUser(name, email, password)

            navigate('/login')
        })
    }


    return <Container className="w-screen h-screen bg-white flex flex-col items-center justify-center bg-[url(src/images/wallpaper.jpg)] bg-cover bg-center">
        <div className='flex justify-center items-center w-11/12'>
            <div className="w-4/5 h-[500px] bg-white rounded-[10px] border border-black flex flex-col items-center justify-center">
                <Form className="flex flex-col gap-4 w-80 items-center mt-2 mb-4" onSubmit={handleRegisterIn}>
                    <img className="max-w-[140px] h-[140px] rounded-full absolute top-[1%]" src="src/images/logo-login&register.jpg" />
                    <div className="h-[54px] text-black text-4xl font-normal">Register</div>
                    <Input className="w-full h-12 border-black border-2 rounded-lg p-4" name='name' placeholder="Name" />
                    <Input className="w-full h-12 border-black border-2 rounded-lg p-4" type="email" name='email' placeholder="Email" />
                    <Input className="w-full h-12 border-black border-2 rounded-lg p-4" type="password" name='password' placeholder="Password" />
                    <Button className="w-2/3 text-xl bg-blue-200">Register</Button>
                </Form>
                <div className="flex gap-6 mt-6">
                    <div className="text-center"><span className="text-black text-base font-normal">Already have an account?<br />Go to </span><Link to="/login" className="text-sky-500 text-base font-bold">Login</Link></div>
                </div>
            </div>
        </div>
    </Container>
}