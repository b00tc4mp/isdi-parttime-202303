import context from './context';

const retrieveUser = () => {
  return fetch(`${import.meta.env.VITE_API_URL}/users`, {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${context.token}`,
    },
  }).then((res) => {
    if (res.status !== 200)
      return res.json().then(({ error: message }) => {
        throw new Error(message);
      });
    return res.json();
  });
};

export default retrieveUser;
