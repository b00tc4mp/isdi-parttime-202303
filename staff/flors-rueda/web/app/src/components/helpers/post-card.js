import { registerUser } from '../../logic/register-user.js';
import { isPostFavByUser } from '../../logic/data/helpers.js';
import { svg } from '../../../assets/svg-paths.js';
import { retrieveUser } from '../../logic/retrieve-user.js';


export const renderPostHeader = (post, userAuth) => {
    const postAuthor = retrieveUser(post.author);
    let html = `<div class="post-card__header">
                    <div class="post-card__header--author-data">
                    <img class="post-card__header--author-avatar" src="${postAuthor.avatar}" />
                    <p class="post-card__header--author-name">${postAuthor.name}</p>
                    <p class="post-card__header--author-username">${postAuthor.username}</p></div>`;
    if (post.author === userAuth) {
      html += `<svg class="post-card__header--to-edit-post" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path d="${svg.edit}"/></svg>`;
    };
    return html += `</div>`
  }

export const renderPostBody = (post, userAuth) => {
    const isPostLike = (post.likes).includes(userAuth);
    const likeClass =  isPostLike ? 'filled' : ''
    return `<div class="post-card__body--image-container">
      <img class="post-card__body--image-container--image" src="${post.image}" />
      </div>
      <div class="post-card__body--text">${post.text}</div>
      <div class="post-card__body--like">
      <svg class="post-card__body--like-button ${likeClass}" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path d="${isPostLike ? svg.heartFill : svg.heartEmpty}"/></svg>
      <b>${post.likes.length}</b></div>`
  }

export const renderPostFooter = (post, userAuth) => {
    const isPostFav = isPostFavByUser(post.id, userAuth);
    const favClass =  isPostFav ? 'filled' : '';
    let html = `<div class="post__footer">
      <div class="post__footer--favorite">
      <svg class="post__footer--favorite-button ${favClass}" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path d="${isPostFav ? svg.fillStar : svg.emptyStar}"/></svg></div>`;
    let timeDifference = new Date() - post.date;
    const hours = Math.floor(timeDifference / 3600000);
    if (hours <= 24) {
      const minutes = Math.floor(timeDifference / 60000);
      if (hours > 0)
        html += `<time class="post__footer--date">${hours} hours ago</time></div>`;
      if (hours === 0 && minutes > 0)
        html += `<time class="post__footer--date">${minutes} minutes ago</time>`;
      if (minutes === 0) html += `<time class="post-date">just now</time></div>`;
    } else {
      html += `<time class="post__footer--date">${post.date.toLocaleDateString(
        "en-GB"
      )}</time></div>`;
    }
    return html
  };