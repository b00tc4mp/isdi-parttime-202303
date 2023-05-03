import { svg } from '../../assets/svg-paths.js';
import { Component } from '../library/mew.js';
import { clearForms, context, resetAlert } from '../ui/general-tools.js';

export default class NewPost extends Component {
    constructor() {
      super(`<section class="home-page__new-post">
                <button class="home-page__new-post--button">
                        <svg class="home-page__new-post--svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path d="${svg.plus}" /></svg>
                    </button>
                </section>`
        );

      this.container.querySelector('button').onclick = event => {
        event.preventDefault();
        clearForms();
        delete context.userAuth
      }
        
    }

    onLogoutClick() {
      throw new Error("not overridden");
    }
  
  }