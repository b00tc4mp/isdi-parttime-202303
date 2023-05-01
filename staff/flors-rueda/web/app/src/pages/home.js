import { svg } from '../../assets/svg-paths.js';
import NewPost from '../components/new-post-button.js';
import { Component } from '../library/mew.js';

export default class Home extends Component {
  constructor() {
    super(`<section class="home-page">
                <section class="home-page__main">
                    <h1 class="home-page__main--title">Home</h1>
                    <p class="home-page__main--welcome"></p>
                    <div class="home-page__main--posts-list"></div>
                </section>
            </section>`
    )
    
    const NewPostButton = new NewPost()
    this.add(NewPostButton);
  }

}