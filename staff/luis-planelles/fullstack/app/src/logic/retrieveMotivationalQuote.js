const retrieveRandomMotivantionalQuote = (callback) => {
  var xhr = new XMLHttpRequest();

  xhr.onload = () => {
    const { content } = JSON.parse(xhr.response);

    callback(null, content);
  };

  xhr.onerror = () => {
    callback(new Error('connection error'));
  };

  xhr.open('GET', 'https://api.quotable.io/random');
  xhr.send();
};

export default retrieveRandomMotivantionalQuote;
