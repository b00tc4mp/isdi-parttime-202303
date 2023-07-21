import context from './context';

const retrieveLevels = () => {
  return fetch(`${import.meta.env.VITE_API_URL}/levels`, {
    headers: {
      Authorization: `Bearer ${context.token}`
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Request failed');
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
};

export default retrieveLevels