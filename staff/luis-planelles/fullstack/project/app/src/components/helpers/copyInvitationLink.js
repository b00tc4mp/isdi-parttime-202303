const copyInvitationLink = (link) => {
  const currentURL = window.location.href;
  const input = document.createElement('input');
  input.value = currentURL + link;
  document.body.appendChild(input);
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);

  alert('Link copied to clickboard: ' + currentURL + link);
};

export default copyInvitationLink;
