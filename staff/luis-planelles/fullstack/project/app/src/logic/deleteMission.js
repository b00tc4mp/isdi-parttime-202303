import { validators } from 'com';
import context from './context';
const { validateId } = validators;

const deleteMission = (missionId) => {
  validateId(missionId, 'mission id');

  return fetch(`${import.meta.env.VITE_API_URL}/mission/delete/${missionId}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${context.token}`,
    },
  }).then((res) => {
    if (res.status !== 204) {
      return res.json().then(({ error: message }) => {
        throw new Error(message);
      });
    }
  });
};
export default deleteMission;
