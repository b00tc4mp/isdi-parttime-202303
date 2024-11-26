import { useState } from 'react'
import { useMemo } from 'react'
import './style.css'
import { PrimeNums } from './PrimeNums'

export default function Home() {

  const [counter, setCounter] = useState(0)

  const handleIncrement = () => {
    setCounter(counter + 1)
  }

  const handleDecrement = () => {
    setCounter(counter - 1)
  }

  const primeNums = useMemo(() => {
        return <PrimeNums />
  }, [])

  
  return (
    <>
    {console.log('----------------------------------')}
    {console.log('Printing counter number')}
      <div className='container'>
        <h1>UseMemo</h1>
        <div className="card">
          <button onClick={handleDecrement}>-</button>
          <div className='counter'>
            <p className='counter-label'>{counter}</p>
          </div>
          <button onClick={handleIncrement}>+</button>
        </div>
        {/* <PrimeNums /> */}
        {primeNums}
      </div>
    </>
  )
}