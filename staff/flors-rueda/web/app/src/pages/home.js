import Navbar from '../components/navbar.js';
import { Component } from '../library/mew.js';

export default class Home extends Component {
  constructor() {
    super(`<section class="home-page">
                <section class="home-page__main off">
                    <h1 class="home-page__main--title">Home</h1>
                    <p class="home-page__main--welcome"></p>
                    <div class="home-page__main--posts-list"></div>
                </section>
            </section>`
    )

    const navbar = new Navbar
    this.add(navbar);
  }

}