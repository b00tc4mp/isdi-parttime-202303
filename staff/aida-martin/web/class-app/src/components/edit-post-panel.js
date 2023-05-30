import { Component } from "../library/composito.js";

export default class EditPostPanel extends Component {
  constructor() {
    super(`<div class="edit-post-modal">
    <form class="edit-post-form form">
      <h2>EDIT YOUR POST</h2>
      <input class="input" type="hidden" name="postId" />
      <input
        class="input"
        type="url"
        name="image"
        placeholder="Image url"
      />
      <textarea
        class="textarea"
        name="text"
        cols="30"
        rows="10"
        placeholder="Text"
      ></textarea>

      <p class="edit-post-error error off"></p>

      <button class="button" type="submit">UPDATE</button>
      <button class="button cancel" type="button">CANCEL</button>
    </form>
  </div>`);

    // document.body.classList.add("scroll-lock");
  }
}
