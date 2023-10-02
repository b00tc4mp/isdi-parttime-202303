import { validators } from 'com';

const { validateId } = validators;

const retrieveMissionEvents = (missionId) => {
  validateId(missionId, 'mission id');

  return fetch(
    `${import.meta.env.VITE_API_URL}/retrieve-mission-events/${missionId}`,
    {
      headers: {
        'Content-type': 'application/json',
      },
    }
  ).then((res) => {
    if (res.status !== 200)
      return res.json().then((error) => {
        throw new Error(error.message);
      });
    return res.json();
  });
};

export default retrieveMissionEvents;
