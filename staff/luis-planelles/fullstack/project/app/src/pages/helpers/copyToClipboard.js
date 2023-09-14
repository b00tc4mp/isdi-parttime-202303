const copyToClipboard = () => {
  const currentURL = window.location.href;

  const tempInput = document.createElement('input');
  tempInput.value = currentURL;
  document.body.appendChild(tempInput);

  tempInput.select();
  document.execCommand('copy');

  document.body.removeChild(tempInput);

  alert('Enlace copiado al portapapeles: ' + currentURL);
};

export default copyToClipboard;
