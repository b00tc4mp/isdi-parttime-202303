import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import retrieveMissions from '../logic/retrieveMissions';
import { context } from '../ui';
import Mission from './Mission';


const Missions = () => {
    const [missions, setMissions] = useState();

    const updateMissions = () => {
      try {
        retrieveMissions(context.token)
        .then(missions => setMissions(missions))
        .catch(error => alert(error))
      } catch (error) {
        alert(error.message);
      }
    };
  
    useEffect(() => {
      const missionInterval = setInterval(updateMissions, 15000);
      updateMissions();
  
      return () => clearInterval(missionInterval);
    }, []);
  

    const handleDeleteMission = () => updateMissions()

    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {missions &&
            missions.map((mission) => (
              <Link to={`/mission/${mission._id.toString()}`} key={mission._id.toString()}>
                <Mission 
                mission={mission}
                onDelete={handleDeleteMission}
                />
              </Link>
            ))}
        </section>
      );
    };


export default Missions