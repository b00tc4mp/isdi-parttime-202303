import { useEffect, useState } from 'react'
import AddMissionModal from '../components/AddMissionModal'
import Missions from '../components/Missions'
import { useAppContext } from '../hooks'
import logoutUser from '../logic/logoutUser'
import retrieveUser from '../logic/retrieveUser'

const Home = () => {
  const { navigate} = useAppContext()

  const [view, setView] = useState('missions'),
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

  const handleOpenAddMission = () => 
    setView('add-mission')

  const handleCloseModal = () => 
    setView('missions')
  
  const handleMissionUpdated = () => {
    setLastUpdate(Date.now()) 
    setView('missions')
  };

  const hadleLogOutButton = () =>  {
    logoutUser()
    
    navigate('/login')
  }
  
  return (
    <div className='min-h-screen bg-gray-100 flex flex-col'>
      <header className='bg-blue-500 p-4 text-white'>
        {user && (
          <nav className='flex justify-between items-center'>
            <p className='text-lg font-serif font-semibold'>{user.name}</p>
            <img
              src='/assets/logo.png'
              style={{ width: '6rem'}} 
            />  
            <button className='text-lg font-serif font-semibold' onClick={hadleLogOutButton}>Logout</button>
          </nav>
        )}
      </header>
      <main className='flex-grow flex justify-center items-center'>
        <div className='flex flex-col items-center'>
          {view === 'missions' && (
            <Missions 
            lastMissionUpdate={lastUpdate}
            />
          )}
          {view === 'add-mission' && (
            <AddMissionModal 
              onCancel={handleCloseModal} 
              onMissionCreate={handleMissionUpdated}
            />
          )}
        </div>
      </main>
      <footer className='bg-blue-500 p-4 text-white'>
        <button
          className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mx-auto'
          onClick={handleOpenAddMission}
        >
          + create new mission
        </button>
      </footer>
    </div>
  );
}

export default Home