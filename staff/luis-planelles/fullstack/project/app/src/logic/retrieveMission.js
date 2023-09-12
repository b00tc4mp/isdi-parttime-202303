import { validators } from 'com';
import context from './context';

const { validateId } = validators;

const retrieveMission = (missionId) => {
  validateId(missionId, 'mission id');

  return fetch(`${import.meta.env.VITE_API_URL}/missions/${missionId}`, {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${context.token}`,
    },
  }).then((res) => {
    if (res.status !== 200)
      return res.json().then((error) => {
        throw new Error(error.message);
      });
    return res.json();
  });
};

export default retrieveMission;
