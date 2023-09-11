import { useState } from 'react';
import { useAppContext } from '../hooks';
import createMission from '../logic/createMission';

const AddMissionModal = ({ onCancel, onMissionCreate }) => {
  const { alert } = useAppContext()

  const [participants, setParticipants] = useState([{ name: '', email: '' }]);

  const handleCancelAddMission = (event) => {
    event.preventDefault()

    onCancel()
  }

  const handleAddParticipant = () => {
    setParticipants([...participants, { name: '', email: '' }]);
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
        setParticipants([{ name: '', email: '' }])
        
        onMissionCreate()
      })
      .catch(error => alert(error.message))

    } catch (error) {
        alert(error.message)
    }
  };

  return <section className="add-Mission container">
      <form className="container" onSubmit={handleCreateMission}>
      <label>
        Travelers:
        <select
          name="traveler"
        >
          <option value="monkey">Monkey</option>
          <option value="robot">Robot</option>
          <option value="dog">Dog</option>
          <option value="billionaire">Billionaire</option>
        </select>
      </label>
      <br />
      <label>
        Destination:
        <select
          name="destination"
        >
          <option value="moon">Moon</option>
          <option value="mars">Mars</option>
          <option value="unexplored_planet">Unexplored Planimageet</option>
        </select>
      </label>
      <br />
        <label>Participants:</label>
        {participants.map((participant, index) => (
          <div key={index}>
            <input
              type="text"
              name={`participants[${index}].name`}
              value={participant.name}
              placeholder="Name"
              onChange={(event) => handleParticipantChange(event, index, 'name')}
            />
            <input
              type="text"
              name={`participants[${index}].email`}
              value={participant.email}
              placeholder="Email"
              onChange={(event) => handleParticipantChange(event, index, 'email')}
            />
            <button
              type="button"
              onClick={() => handleRemoveParticipant(index)}
            >
              Remove
            </button>
          </div>
        ))}
          <button type="button" onClick={handleAddParticipant}>
            Add Participant
          </button>
          <input
            type="hidden"
            name="participants"
            value={JSON.stringify(participants)}
          />
      <br />
      <label>Loser price:</label>
      <textarea className="input" name="price" cols="30" rows="5" placeholder="loser price"></textarea>
      <br />
      <button type="submit">Create Mission</button>
      <button className="button cancel" type="button" onClick={handleCancelAddMission}>Cancel</button>
      </form>
      <br />
  </section>
}

export default AddMissionModal



