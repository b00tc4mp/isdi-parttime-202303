import NewPost from '../components/new-post-button.js';
import { Component } from '../library/mew.js';
import HomeMain from './home-main.js';

export default class Home extends Component {
  constructor() {
    super(`<section class="home-page">
            </section>`
    )
    

    const homeMain = new HomeMain()
    const newPostButton = new NewPost()
    this.add(homeMain, newPostButton);
  }

}