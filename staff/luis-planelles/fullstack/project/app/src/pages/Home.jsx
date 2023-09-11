import { useAppContext } from '../hooks'
import logoutUser from '../logic/logoutUser'

const Home = () => {
  const { navigate} = useAppContext()

  const hadleLogOutButton = () =>  {
    logoutUser()
    
    navigate('/login')
  }
  
  return <div className='home page container'>
          <header className='home-header'>
          </header>
            <p>Space pursuit</p>
            <button className='home-header-logout' onClick={hadleLogOutButton}>logout</button>
          <footer className='home-footer'>
          </footer>
        </div>
    }

export default Home