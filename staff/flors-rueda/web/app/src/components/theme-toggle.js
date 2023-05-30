import { svg } from '../../assets/svg-paths';
import { context } from '../ui/general-tools';
import { Component } from '../library/mew.js';

export default class ThemeToggle extends Component {
    constructor() {
      super(`<section class="theme-toggle">
      <input type="checkbox" class="theme-toggle__checkbox" id="checkbox">
      <label for="checkbox" class="theme-toggle__label">
          <i>
              <svg class="theme-toggle__label--moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path d="${svg.sun}" /></svg>
          </i>
          <i>
              <svg class="theme-toggle__label--sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path d="${svg.moon}"/></svg>
          </i>
          <div class="theme-toggle__switch"></div>
      </label>
  </section>`);

  let storedTheme = context.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  if (storedTheme) document.documentElement.setAttribute('data-theme', storedTheme)

  
      this.container.querySelector(".theme-toggle__checkbox").onchange = () => {
        let currentTheme = document.documentElement.getAttribute('data-theme');
        let targetTheme = 'light';
        if (currentTheme === 'light') targetTheme = 'dark';
        document.documentElement.setAttribute('data-theme', targetTheme)
        context.setItem('theme', targetTheme);
      };
    }
  
  }