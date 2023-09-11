import { useState } from 'react'
import AddMissionModal from '../components/AddMissionModal'
import { useAppContext } from '../hooks'
import logoutUser from '../logic/logoutUser'

const Home = () => {
  const { navigate} = useAppContext()

  const [modal, setModal] = useState(null),
    [lastUpdate, setLastUpdate] = useState(null)


  const handleOpenAddPost = () => setModal('add-mission')

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
          </header>
            <p>Space pursuit</p>
            <main>
            {modal === 'add-mission' && (
              <AddMissionModal 
                onCancel={handleCloseModal} 
                onMissionCreate={handleMissionUpdated}
              />
            )}
            </main>
            <button className='home-header-logout' onClick={hadleLogOutButton}>logout</button>
          <footer className='home-footer'>
          <button className='add-mission-button' onClick={handleOpenAddPost}>+</button>
          </footer>
        </div>
    }

export default Home