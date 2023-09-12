import { useEffect, useState } from 'react'
import AddMissionModal from '../components/AddMissionModal'
import Missions from '../components/Missions'
import { useAppContext } from '../hooks'
import logoutUser from '../logic/logoutUser'
import retrieveUser from '../logic/retrieveUser'

const Home = () => {
  const { navigate} = useAppContext()

  const [view, setView] = useState('mission'),
    [modal, setModal] = useState(null),
    [lastUpdate, setLastUpdate] = useState(null),
    [user, setUser] = useState(null);

  useEffect(() => {
  
    try {
      retrieveUser()
      .then(setUser)
      .catch(error => alert(error.message))
      
    } catch (error){
      alert(error.message)
      }
    }, [])

  const handleOpenAddMission = () => setModal('add-mission')

  const handleCloseModal = () => setModal(null)
  
  const handleMissionUpdated = () => {
    setModal(null)
    setLastUpdate(Date.now()) 
  };

  const hadleLogOutButton = () =>  {
    logoutUser()
    
    navigate('/login')
  }
  
  return <div className='home page container'>
          <header className='home-header'>
            {user && (
            <nav className="home-header-nav">
              <p>{user.name}</p>
            </nav>
            )}
            <button className='home-header-logout' onClick={hadleLogOutButton}>logout</button>
          </header>
            <p>Space pursuit</p>
            <main>
            {view === 'mission' && (
              <Missions
              />
            )}
            {modal === 'add-mission' && (
              <AddMissionModal 
                onCancel={handleCloseModal} 
                onMissionCreate={handleMissionUpdated}
              />
            )}
            </main>
          <footer className='home-footer'>
          <button className='add-mission-button' onClick={handleOpenAddMission}>+</button>
          </footer>
        </div>
    }

export default Home