import { useState } from 'react';
import { useAppContext } from '../hooks';
import createMission from '../logic/createMission';

const AddMissionModal = ({ onCancel, onMissionCreate }) => {
  const { alert } = useAppContext()

  const [participants, setParticipants] = useState([{ name: ''}]);

  const handleCancelAddMission = (event) => {
    event.preventDefault()

    onCancel()
  }

  const handleAddParticipant = () => {
    setParticipants([...participants, { name: ''}]);
  };

  const handleParticipantChange = (event, index, field) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index][field] = event.target.value;

    setParticipants(updatedParticipants);
  };

  const handleRemoveParticipant = (index) => {
    const updatedParticipants = [...participants];
    updatedParticipants.splice(index, 1);
    
    setParticipants(updatedParticipants);
  };

  const handleCreateMission = (event) => {
    event.preventDefault()

    const traveler = event.target.traveler.value,
      destination = event.target.destination.value,
      loserPrice = event.target.price.value;

    let participants = event.target.participants.value

    const parsedParticipants = JSON.parse(participants);

    try {
      createMission(traveler, destination, parsedParticipants, loserPrice)
      .then(() => {
        setParticipants([{ name: ''}])
        
        onMissionCreate()
      })
      .catch(error => alert(error.message))

    } catch (error) {
        alert(error.message)
    }
  };

  return (
    <section className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Create Mission</h2>
  
        <form className="space-y-4" onSubmit={handleCreateMission}>
          <div>
            <label htmlFor="traveler" className="block text-sm font-medium text-gray-700">
              Travelers
            </label>
            <select
              className="border border-gray-300 rounded-md p-2 w-full"
              name="traveler"
              id="traveler"
            >
              <option value="monkey">Monkey</option>
              <option value="robot">Robot</option>
              <option value="dog">Dog</option>
              <option value="billionaire">Billionaire</option>
            </select>
          </div>
          <div>
            <label htmlFor="destination" className="block text-sm font-medium text-gray-700">
              Destination
            </label>
            <select
              className="border border-gray-300 rounded-md p-2 w-full"
              name="destination"
              id="destination"
            >
              <option value="moon">Moon</option>
              <option value="mars">Mars</option>
              <option value="unexplored_planet">Unexplored Planet</option>
            </select>
          </div>
          <div>
            <label htmlFor="participants" className="block text-sm font-medium text-gray-700">
              Participants
            </label>
            {participants.map((participant, index) => (
              <div key={index} className="space-y-2">
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  name={`participants[${index}].name`}
                  value={participant.name}
                  placeholder="Name"
                  onChange={(event) => handleParticipantChange(event, index, 'name')}
                />
                <button
                  type="button"
                  className="bg-red-500 text-white px-2 py-1 rounded-md"
                  onClick={() => handleRemoveParticipant(index)}
                >
                  Remove
                </button>
              </div>
                ))}
                <input
                  type="hidden"
                  name="participants"
                  value={JSON.stringify(participants)}
                />
 
            <button
              type="button"
              className="bg-blue-500 text-white px-2 py-1 rounded-md"
              onClick={handleAddParticipant}
            >
              Add Participant
            </button>
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Loser price
            </label>
            <textarea
              className="border border-gray-300 rounded-md p-2 w-full"
              name="price"
              id="price"
              cols="30"
              rows="5"
              placeholder="Loser price"
            ></textarea>
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md w-full"
            >
              Create Mission
            </button>
            <button
              type="button"
              className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-md w-full"
              onClick={handleCancelAddMission}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
  
}

export default AddMissionModal




