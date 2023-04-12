import {authenticateUser} from '../logic/authenticate-user.js'
import {retrieveUser} from '../logic/retrieve-user.js'
import {addOffClass, removeOffClass, context} from '../ui.js'
import {homePage} from './home-page.js'
import {registerPage} from './register-page.js'
import { renderPost } from '../logic/render-post.js'

export const loginPage = document.querySelector('.login')
const loginForm = loginPage.querySelector('form')
const avatarImage = homePage.querySelector('.avatar-image')

loginPage.querySelector('form').onsubmit = function (event) {
  event.preventDefault();

  const email = event.target.email.value;
  const password = event.target.password.value;

  try {
      context.userId = authenticateUser(email, password);

      // This is to get only the username and the user's email.
      let user = retrieveUser(context.userId);
      
      homePage.querySelector('a').textContent = user.name;
      avatarImage.src = user.avatar

      renderPost()

      // posts.forEach(post =>{
      //   if (post.author === user.id) {
      //     renderPost(post.image, post.text, post.id)
      //   }
      // })
      
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
