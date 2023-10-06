const copyToClipboard = () => {
  const currentURL = window.location.href;

  const tempInput = document.createElement('input');
  tempInput.value = currentURL;
  document.body.appendChild(tempInput);

  tempInput.select();
  document.execCommand('copy');

  document.body.removeChild(tempInput);

  alert('Link copied to clickboard: ' + currentURL);
};

export default copyToClipboard;
