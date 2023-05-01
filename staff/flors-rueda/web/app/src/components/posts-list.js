import { retrieveUser } from '../logic/retrieve-user.js';
import { toggleFav } from '../logic/toggle-fav.js';
import { toggleLike } from '../logic/toggle-like.js';
import { isPostFavByUser } from '../logic/data/helpers.js';
import { getPostsSorted } from '../logic/retrieve-posts-sorted-by-date.js';
import { getFavPosts } from '../logic/retrieve-fav-posts.js';
import { svg } from '../../assets/svg-paths.js';


export default function initPostsList(userAuth, postModal, type, postContainer = document.querySelector('.home-page__main--posts-list')) {
  const favUnfillPath = svg.emptyStar;
  const favFillPath = svg.fillStar;
  const likeFillPath = svg.heartFill
  const likeUnfillPath = svg.heartEmpty

  const modal = postModal.addPostModal
  const posts = type === 'all'? getPostsSorted() : getPostsSorted(getFavPosts(userAuth));

  const fill = (item) => {
    item.classList.add('filled')
    const path = item.querySelector('path');
    if(item.classList.contains('post__footer--favorite-button')) {
      path.setAttribute('d', favFillPath);
    }
    if(item.classList.contains('post-card__body--like-button')) {
      path.setAttribute('d', likeFillPath);
    }
  };

  const unfill = (item) => {
    item.classList.remove('filled');
    const path = item.querySelector('path');
    if(item.classList.contains('post__footer--favorite-button')) {
      path.setAttribute('d', favUnfillPath);
    }
    if(item.classList.contains('post-card__body--like-button')) {
      path.setAttribute('d', likeUnfillPath);
    }
  }

  const press = (item) => {
    item.classList.contains('filled') ? unfill(item) : fill(item)
  }

  const renderPostHeader = (post, userAuth) => {
    const postAuthor = retrieveUser(post.author);
    let html = `<div class="post-card__header">
                    <div class="post-card__header--author-data">
                    <img class="post-card__header--author-avatar" src="${postAuthor.avatar}" />
                    <p class="post-card__header--author-name">${postAuthor.name}</p>
                    <p class="post-card__header--author-username">${postAuthor.username}</p></div>`;
    if (post.author === userAuth) {
      html += `<svg class="post-card__header--to-edit-post" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path d="M180 1044q-24 0-42-18t-18-42V384q0-24 18-42t42-18h405l-60 60H180v600h600V636l60-60v408q0 24-18 42t-42 18H180Zm300-360Zm182-352 43 42-285 284v86h85l286-286 42 42-303 304H360V634l302-302Zm171 168L662 332l100-100q17-17 42.311-17T847 233l84 85q17 18 17 42.472T930 402l-97 98Z"/></svg>`;
    };
    return html += `</div>`
  }

  const renderPostBody = (post, userAuth) => {
    const isPostLike = (post.likes).includes(userAuth);
    const likePath = isPostLike ? likeFillPath : likeUnfillPath;
    const likeClass =  isPostLike ? 'filled' : ''
    return `<div class="post-card__body--image-container">
      <img class="post-card__body--image-container--image" src="${post.image}" />
      </div>
      <div class="post-card__body--text">${post.text}</div>
      <div class="post-card__body--like">
      <svg class="post-card__body--like-button ${likeClass}" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path d="${likePath}"/></svg>
      <b>${post.likes.length}</b></div>`
  }

  const renderPostFooter = (post, userAuth) => {
    const isPostFav = isPostFavByUser(post.id, userAuth);
    const favPath = isPostFav ? favFillPath : favUnfillPath;
    const favClass =  isPostFav ? 'filled' : '';
    let html = `<div class="post__footer">
      <div class="post__footer--favorite">
      <svg class="post__footer--favorite-button ${favClass}" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path d="${favPath}"/></svg></div>`;
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

  const renderPost = (post, userAuth) => {
    const postArticle = document.createElement('article');
    postArticle.classList.add('post-card');
    let html = renderPostHeader(post, userAuth);
    html += renderPostBody(post, userAuth);
    html += renderPostFooter(post, userAuth)                      
    postArticle.innerHTML = html;
    return postArticle;
  };

  const editPost = (post) => {
    if (!modal) return;
    modal.querySelector('.new-post-image').src = post.image;
    modal.querySelector('.new-post-form').querySelector('textarea[name="post-text"]').value = post.text;
    postModal.openPostModal(post);
  };

  const addPostsList = () => {
    postContainer.innerHTML = '';
    posts.forEach((post) => {
      const postElement = renderPost(post, userAuth);
      postContainer.appendChild(postElement);
      const favButton = postElement.querySelector('.post__footer--favorite-button');
      const likeButton = postElement.querySelector('.post-card__body--like-button');
      favButton.addEventListener('click', (event) => {
        event.preventDefault();
        try {
          press(favButton)
          const fav = toggleFav(post.id, userAuth);
        } catch (error) {
          console.log(error)
        }
      });
      likeButton.addEventListener('click', (event) => {
        event.preventDefault();
        try {
          press(likeButton);
          const likes = toggleLike(post.id, userAuth);
          postElement.querySelector('.post-card__body--like').querySelector('b').innerText = likes
        } catch (error) {
          console.log(error)
        }
      });
      if (userAuth === post.author) {
        const editButton = postElement.querySelector('.post-card__header--to-edit-post');
        editButton.addEventListener('click', (event) => {
          event.preventDefault();
          editPost(post);
        });
      }
    });
  };
  return addPostsList();
}
