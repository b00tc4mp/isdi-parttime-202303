import NewPost from '../components/new-post-button.js';
import Posts from '../components/post-list.js';
import { Component } from '../library/mew.js';
import { getPostsSorted } from '../logic/retrieve-posts-sorted-by-date.js';
import { retrieveUser } from '../logic/retrieve-user.js';
import { context } from '../ui/general-tools.js';

export default class HomeMain extends Component {
    constructor() {
      super(`<section class="home-page__main">
                <h1 class="home-page__main--title">Home</h1>
                <p class="home-page__main--welcome">Welcome, ${retrieveUser(context.userAuth).name}! Check what's going on:</p>
            </section>`
      )
      
      const postList = new Posts(getPostsSorted(), 'home-page__main--posts-list')
      this.add(postList);
    }

    
  
  }


  

