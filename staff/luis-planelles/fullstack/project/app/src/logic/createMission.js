import { validators } from 'com';
import context from './context';
const {
  validateTraveler,
  validateDestination,
  validateParticipants,
  validateText,
} = validators;

const createMission = (traveler, destination, participants, loserPrice) => {
  validateTraveler(traveler);
  validateDestination(destination);
  validateParticipants(participants);
  validateText(loserPrice, 'loser price');

  return (async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/missions`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${context.token}`,
      },
      body: JSON.stringify({ traveler, destination, participants, loserPrice }),
    });

    if (res.status !== 201) {
      return res.json().then((error) => {
        throw new Error(error.message);
      });
    }
  })();
};

export default createMission;
