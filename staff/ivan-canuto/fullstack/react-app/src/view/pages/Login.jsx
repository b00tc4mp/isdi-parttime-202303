import loginUser from "../../logic/loginUser"
import { useEffect, useState } from "react"
import retrireveRandomMotivationalQuote from "../../logic/retrieveRandomMotivationalQuote"
import { useAppContext, useHandleErrors } from "../hooks"
import { Container, Form, Input, Button } from "../library"
import { Link } from "react-router-dom"

export default function Login () {
  const { alert, freeze, unfreeze, navigate } = useAppContext()
  const [quote, setQuote] = useState()
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

  useEffect(() => {
    try {
      freeze()

      retrireveRandomMotivationalQuote()
      .then(quote => {
        unfreeze()
        
        setQuote(quote.content)
      })
      .catch(error => {
        unfreeze()
        
        alert(error.message, 'error')
        console.log(error.stack)
      })
    } catch (error) {
      unfreeze()

      alert(error.message, 'error')
      console.log(error.stack)
    }
  }, [])

  console.log('login -> render');

  return <Container>
  <h1 className="text-black text-6xl m-4">Login</h1>

  {quote && <p className="w-1/2 text-center m-2 text-lg"><q className="text-black">{quote}</q></p>}

  <Form onSubmit={handleLogin}>
      <Input type="email" name="email" placeholder="email" />
      <Input className="text-black" type="password" name="password" placeholder="password" />
      <Button type="submit">Login</Button>
  </Form>

  <p className="text-black">Go to <Link to="/register" className="bg-gray-200 hover:bg-gray-300 rounded cursor-pointer" >Register</Link></p>
</Container>
}