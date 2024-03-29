import { validators } from 'com';

const { validateId } = validators;

const retrieveParticipant = (missionId, participantId) => {
  validateId(missionId, 'mission id');
  validateId(participantId, 'participant id');

  return fetch(
    `${
      import.meta.env.VITE_API_URL
    }/retrieve-participant/${missionId}/${participantId}`,
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

export default retrieveParticipant;
