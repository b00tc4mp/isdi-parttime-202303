import { saveUsers } from '../data.js'
import {registerUser} from '../logic/register-user.mjs'
import { addOffClass, removeOffClass } from '../ui.js'
import { loginPage } from './login-page.js'

export const registerPage = document.querySelector('.register')
const registerForm = registerPage.querySelector('form')

registerPage.querySelector('form').onsubmit = function (event) {
  event.preventDefault();

  const name = event.target.name.value;
  const email = event.target.email.value;
  const password = event.target.password.value;

  try {
      registerUser(name, email, password);
  
      registerForm.reset()
      addOffClass(registerPage)
      removeOffClass(loginPage)

  } catch (error) {
      if (error.name === 'Error') {
          alert(error.message);
      } else {
          alert('Sorry, something went wrong.')
          console.log(error);
      }
  }
}

registerPage.querySelector('a').onclick = function (event) {
  event.preventDefault()

  addOffClass(registerPage)
  removeOffClass(loginPage)
}
