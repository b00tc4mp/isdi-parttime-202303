import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import retrieveMissions from '../logic/retrieveMissions';
import updateMission from '../logic/updateMission';
import { context } from '../ui';
import Mission from './Mission';


const Missions = ({lastMissionUpdate }) => {
    const [missions, setMissions] = useState();
    const [missionStatus, setMissionStatus] = useState()

    useEffect(() => handleRefreshMission(), [])

    const handleRefreshMission = () => {
      try {
        retrieveMissions(context.token)
          .then(async (missions) => {
            for (const mission of missions) {
              if (mission.status === 'in_progress') {
                await updateMission(mission.id);
                setMissionStatus(mission.status)
              }
            }
            setMissions(missions);
          })
          .catch((error) => alert(error));
      } catch (error) {
        alert(error.message);
      }
    };
    
    useEffect(() =>{
        if(lastMissionUpdate) handleRefreshMission()
    }, [lastMissionUpdate]);

    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {missions &&
            missions.map((mission) => (
              <Link to={`/mission/${mission.id}`} key={mission.id}>
                <Mission mission={mission} />
              </Link>
            ))}
        </section>
      );
    };


export default Missions