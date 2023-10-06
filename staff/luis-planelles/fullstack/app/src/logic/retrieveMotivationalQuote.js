const retrieveRandomMotivantionalQuote = () => {
  return fetch('https://api.quotable.io/random', {
    headers: {
      'Content-type': 'application/json',
    },
  }).then((res) => {
    if (res.status !== 200) {
      return res.json().then(({ error: message }) => {
        throw new Error(message);
      });
    }
    return res.json().then((data) => {
      const content = data.content;

      return content;
    });
  });
};

export default retrieveRandomMotivantionalQuote;
