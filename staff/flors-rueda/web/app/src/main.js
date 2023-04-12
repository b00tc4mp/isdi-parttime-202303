import { loginPage } from './pages/login-page.js';

const checkbox = document.querySelector('.mode-checkbox');

checkbox.addEventListener('change', (event) => {
  event.preventDefault();
  document.body.classList.toggle('dark-mode');
});



