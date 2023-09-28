import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppContext } from '../hooks';
import participantFeedback from '../logic/parcipantFeedback';
import retrieveMission from '../logic/retrieveMission';

const ParticipantConfirmation = () => {
  const { missionId, participantId } = useParams();
  const { navigate} = useAppContext()
  
  const [mission, setMission] = useState();

  useEffect(() => {
      try {
        retrieveMission(missionId)
          .then((mission) => {
            setMission(mission);
          })
          .catch((error) => alert(error));
      } catch (error) {
        alert(error.message);
      }
  }, []);

  const handleConfirmParticipant = (event) => {
    event.preventDefault()

    const confirmation = event.target.confirmation.value,
      feedback = event.target.feedback.value

    try {
      participantFeedback(participantId, missionId, confirmation, feedback)
      .catch(error => alert(error.message))

    } catch (error) {
        alert(error.message)
    }
    navigate(`/mission/${missionId}`)
  };

  return (
    <section className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
      {mission && (
        <div className="mb-4">
          <p className="text-lg">
            <strong>Hello mate.</strong> <br /> <br /> Your friend <strong>{mission.creatorName} </strong> 
              has sent a rocket with a {mission.traveler[0].race} to {mission.destination} and wants to bet 
               against you a <strong>{mission.loserPrice}</strong> that the 
            {mission.traveler[0].race} reaches its destination. <br /><br /> If it succeeds, you pay, 
            but if the mission fails to complete, your friend pays.
          </p>
          <br />
          <p className="text-lg">
            The success of the mission will depend on space and meteorological events that occur 
            on real time, and we will keep you informed through reports from <a className="text-blue-500 hover:underline" href="https://ccmc.gsfc.nasa.gov/tools/DONKI/" target="_blank" rel="noopener noreferrer">NASA's API</a>.
          </p>
          <br />
          <p className="text-lg">
            <a className="text-blue-500 hover:underline" href="http://localhost:5173/" target="_blank" rel="noopener noreferrer">Space Pursuit</a> is the app that he has used.
          </p>
        </div>
      )}
        <form className="space-y-4" onSubmit={handleConfirmParticipant}>
          <div>
            <label htmlFor="confirmation" className="block text-sm font-medium text-gray-700">
              Do you want to participate in the mission?
            </label>
            <select
              className="border border-gray-300 rounded-md p-2 w-full"
              name="confirmation"
              id="confirmation"
            >
              <option value="accept">Accept</option>
              <option value="decline">Decline</option>
            </select>
          </div>
          <div>
            <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">
              Feedback?
            </label>
            <textarea
              className="border border-gray-300 rounded-md p-2 w-full"
              name="feedback"
              id="price"
              cols="30"
              rows="5"
              placeholder="Feedback"
            ></textarea>
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md w-full"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </section>
  );
  
}

export default ParticipantConfirmation

