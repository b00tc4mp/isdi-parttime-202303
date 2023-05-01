import { svg } from "../../assets/svg-paths";
import { Component } from "../library/mew.js";

export default class Navbar extends Component {
  constructor() {
    super(`<header class="nav-header">
                <button class="nav-header__menu">
                    <span class="nav-header__menu-line"></span>
                    <span class="nav-header__menu-line"></span>
                    <span class="nav-header__menu-line"></span>
                </button>
                <nav class="nav-header__navbar">
                    <button class="nav-header__logout">
                        <svg class="nav-header__logout--icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path/d="${svg.logout}"></svg>
                    </button>
                    <button class="nav-header__to-user-profile">
                        <svg class="nav-header__to-user-profile--icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path d="${svg.userProfile}" /></svg>
                    </button>
                    <button class="nav-header__to-home">
                        <svg class="nav-header__to-home--icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path/ d="${svg.home}"></svg>
                    </button>
                </nav>
            </header>`);

    const toggleNav = this.container.querySelector('.nav-header__menu');
    const nav = this.container.querySelector('.nav-header__navbar');

    toggleNav.addEventListener('click', (event)  => {
        event.preventDefault();
        toggleNav.classList.toggle('close')
        nav.classList.toggle('show')
      })
  }
}
