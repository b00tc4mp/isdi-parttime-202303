import { login } from './pages/login-page.mjs';

const checkbox = document.querySelector('.mode-checkbox');

checkbox.addEventListener('change', (event) => {
  event.preventDefault();
  document.body.classList.toggle('dark-mode');
});



