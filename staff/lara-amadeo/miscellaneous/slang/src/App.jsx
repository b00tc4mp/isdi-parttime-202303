import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


export default function App() {
  const [count, setCount] = useState(0)

  return (
    <>
 
      <h1>Slang conversor</h1>
      <form>
        <label htmlFor="text">Escribe la frase a convertir</label>
      <input name='text'></input>
      </form>
    </>
  )
}
