import authenticateUser from "../logic/authenticateUser"
import { context } from "../ui"
import './pages-styles/Login.css'
import Context from "../AppContext"
import { useContext, useEffect, useState } from "react"
import retrireveRandomMotivationalQuote from "../logic/retrieveRandomMotivationalQuote"
import Form from "../library/Form"
import Input from "../library/Input"
import Button from "../library/Button"
import Container from "../library/Container"

export default function Login ({ onRegisterClick, onLoggedInUser }) {
  const { alert, freeze, unfreeze } = useContext(Context)
  const [quote, setQuote] = useState()

  const handleRegisterClick = (event) => {
    event.preventDefault()

    onRegisterClick()
  }

  const handleLogin = (event) => {
    event.preventDefault()

    const email = event.target.email.value
    const password = event.target.password.value

    try {
      // authenticateUser(email, password, (error, token) => {
      //   if(error) {
      //     alert(error.message, 'error')
      //     console.debug(error.stack)
      //     return
      //   }

      //   context.token = token
        
      //   onLoggedInUser()
      // })

      authenticateUser(email, password)
        .then(token => {
          context.token = token
          onLoggedInUser()
        })
        .catch(error => {
          console.log(error.message)
          alert(error.message, 'error')
          console.debug(error.stack)
        })
        
      } catch (error) {
      alert(error.message, 'error')
      console.debug(error.stack)
    }
  }

  useEffect(() => {
    try {
      freeze()

      retrireveRandomMotivationalQuote((error, newQuote) => {
        unfreeze()
        
        if(error) {
          alert(error.message, 'error')
          console.log(error.stack)
          
          return
        }
        
        setQuote(newQuote)
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

  <p className="text-black">Go to <a className="bg-gray-200 hover:bg-gray-300 rounded cursor-pointer" onClick={handleRegisterClick}>Register</a></p>
</Container>
}