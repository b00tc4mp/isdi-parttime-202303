import { svg } from '../../assets/svg-paths';
import { Component } from '../library/mew';


export default class Alert extends Component {
  constructor(color, message, title) {
    super(`<section class="alert ${color}">
                    <div class="alert__left">
                        <svg class="alert__left--reaction" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path d="${color === 'danger' ? svg.ko : svg.happy}"/></svg>
                    </div>
                    <div class="alert__right">
                        <h2 class="alert__right--title">${title}</h2>
                        <p class="alert__right--message">${message}</p>
                        <span class="alert__right--close">ok, I get it</span>
                    </div>
                </section>`);

    this.container.querySelector(".alert__right--close").onclick = () => {
      this.onCloseClick();
    };
  }

  onCloseClick() {
    throw new Error("not overridden");
  }
}
