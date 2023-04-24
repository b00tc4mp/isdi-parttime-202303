const alert = document.createElement('div');
alert.classList.add('alert');

export const createAlert = (content)=> {
  document.body.appendChild(alert)
  alert.textContent = content;
  setTimeout(()=>{
    alert.remove()
  },1500)
}
