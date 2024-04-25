import { context } from '../ui/general-tools.js';
import { toggleOff } from '../ui/general-tools.js'
import initProfileButtons from '../components/profile-buttons.js';

export const profilePage = document.querySelector('.user-profile');
export const profileButtons = document.querySelector('.profile-buttons');
export const toggle = document.querySelector('.mode-toggle');
export const favoritesPage = document.querySelector('.favorites');

initProfileButtons(context, profilePage)

const toggleLightToggle = document.querySelector('.hide-mode-toggle');
toggleLightToggle.textContent = (toggle.classList).contains('off') ? 'hide light switch' : 'show light switch'

toggleLightToggle.addEventListener('click', (event) => {
  event.preventDefault();
  toggleOff(toggle);
  toggleLightToggle.textContent === 'hide light switch' ? toggleLightToggle.textContent = 'show light switch' : toggleLightToggle.textContent = 'hide light switch'
});




