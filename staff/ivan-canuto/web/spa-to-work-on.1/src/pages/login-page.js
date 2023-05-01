import {authenticateUser} from '../logic/authenticate-user.js'
import {addOffClass, removeOffClass, context} from '../ui.js'
import {homePage} from './home-page.js'
import {registerPage} from './register-page.js'
import { renderPosts } from '../logic/render-posts.js'
import { renderUser } from '../logic/render-user.js'
import { renderLikesAndFavs } from '../logic/render-likes-favs.js'

export const loginPage = document.querySelector('.login')
const loginForm = loginPage.querySelector('form')

loginPage.querySelector('form').onsubmit = function (event) {
  event.preventDefault();

  const email = event.target.email.value;
  const password = event.target.password.value;

  try {
      context.userId = authenticateUser(email, password);

      renderUser()
      renderPosts()
      renderLikesAndFavs()
      
      loginForm.reset()
      addOffClass(loginPage)
      removeOffClass(homePage)

  } catch (error) {
      if (error.name === 'Error') {
          alert(error.message);
          console.log(error);
      } else {
          alert('Sorry, something went wrong.')
          console.log(error);
      }
  }
}

loginPage.querySelector('a').onclick = function (event) {
  event.preventDefault()

  addOffClass(loginPage)
  removeOffClass(registerPage)
}
