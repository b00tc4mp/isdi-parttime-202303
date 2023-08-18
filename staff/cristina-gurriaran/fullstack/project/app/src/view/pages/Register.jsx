import registerUser from '../../logic/registerUser'
import { Container, Form, Input, Button } from '../library'
import { useAppContext , useHandleErrors } from '../hooks'
import { Link } from 'react-router-dom'

export default function Register() {
    console.log('Register -> render')

    const { navigate } = useAppContext()
    const handleErrors = useHandleErrors()

    const handleRegister = (event) => {
        event.preventDefault()

        const name = event.target.name.value
        const email = event.target.email.value
        const password = event.target.password.value

        handleErrors(async () => {
            await registerUser(name, email, password)

            navigate('/login')
        })
    }
    
    return <Container>
        <h1 className ='title'> Sign up </h1>

        <h2> Already have an account? <Link to="/login" className="text-blue-500 hover:underline"> Log in </Link></h2>

        <Form onSubmit={handleRegister}>
            <Input type='name' name='name' placeholder='Name*'/>
            <Input type='email' name='email' placeholder='Email address*'/>
            <Input  type='password' name='password' placeholder='Password (8+ characters)*'/>
            <Button className='button' type='submit'> Create an account </Button>
        </Form>
    </Container>
}

