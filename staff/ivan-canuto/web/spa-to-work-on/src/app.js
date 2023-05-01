import { Component } from "./library/composito.js";
import { context } from "./ui.js";
import Login from "./pages/login.js"
import Register from "./pages/register.js";
import Home from "./pages/home.js";
import Profile from "./components/profile.js";
import AddPost from "./components/add-post.js";
import EditPost from "./components/edit-post.js";

export default class App extends Component {
  constructor() {
    super('<div></div>')
    
    const login = new Login
    const register = new Register
    // const profile = new Profile
    // const addPost = new AddPost
    // const editPost = new EditPost

    login.onRegisterClick = () => {
      this.remove(login)
      this.add(register)
    }

    register.onLoginClick = () => {
      this.remove(register)
      this.add(login)
    }
    
    login.onAuthenticated = () => {
      const home = new Home;
      this.remove(login)
      this.add(home)
    }
    
    // home.showAddPost = () => {
    //   this.add(addPost)
    //   document.body.classList.toggle('fixed-scroll')
    // }
    
    // home.showProfile = () => {
    //   this.add(profile)
    //   const usersApp = users()
    //   const user = usersApp.find(user => user.id === context.userId)
    //   this.container.querySelector('input[name="avatarUrl"]').value = user.avatar
    //   document.body.classList.toggle('fixed-scroll')
    // }

    // home.returnLogin = () => {
    //   this.remove(home)
    //   this.add(login)
    // }

    // profile.removeProfile = () => {
    //   this.remove(profile)
    // }

    // addPost.removeAddPost = () => {
    //   this.remove(addPost)
    // }
    
    // editPost.removeEditPost = () => {
    //   this.remove(editPost)
    // }

    if(context.userId) {
      const home = new Home
      this.add(home)
    } else {
      this.add(login)
    }
  }
}