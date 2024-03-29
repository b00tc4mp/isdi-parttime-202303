const xhr = new XMLHttpRequest();

xhr.onload = () => {
  const data = JSON.parse(xhr.response);

  console.log(data.hello);
};

xhr.open('GET', 'http://localhost:4321/helloworld');
xhr.send();
