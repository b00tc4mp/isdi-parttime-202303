import { validators } from 'com';
import context from './context';

const { validateId } = validators;

const updateMission = (missionId) => {
  validateId(missionId, 'mission id');

  return fetch(`${import.meta.env.VITE_API_URL}/missions/update/${missionId}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${context.token}`,
    },
  }).then((res) => {
    if (res.status !== 204)
      return res.json().then((error) => {
        throw new Error(error.message);
      });
  });
};

export default updateMission;
