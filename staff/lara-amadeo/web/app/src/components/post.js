import { Component } from "../library/master-component.js"
import { users } from "../data.js"
import { context } from "../ui.js"
import likeAndUnlike  from '../logic/likeAndUnlikePost.js'
import { formatPostDate } from "../logic/formatPostDate.js"
import { retrieveUser } from "../logic/helpers/data-managers.js"
import saveAndUnsavePost from "../logic/saveAndUnsavePost.js"

const _users = users()
const userLogged = _users.find(_user => _user.id === context.userId)

export class Post extends Component{
    constructor(post){
        super(`
        <div class="post">
            <div class="header-post">
                <div class="post-user-data">

                    <img class="post-avatar" src="${(_users.find((_user => _user.id === post.author))).avatar}">
                    <div class="post-user-data-info">
                        <p class="post-user-data-info-username small-text-bold">pedro</p>
                        <p class="post-user-data-info-time tiny-text">${formatPostDate(post.date)}</p>
                    </div>

                </div>
                <button class="button-XS secondary-button">Edit post</button>
            </div>

            <div class="post-image">
                <img class="user-post-image" src="${post.image}"
            </div>

            <div class="post-caption">

                <p class="post-caption-text small-text">${post.text}</p>

                <div class="post-action-icons">
                    <div class="icon-s-container">
                        <span class="save-icon material-symbols-rounded icon-s pointer ${userLogged.savedPosts && userLogged.savedPosts.includes(post.id)? 'save-icon-filled' : ''}">bookmark</span>
                    </div>

                    <div class="icon-s-container">
                        <span class="like-icon material-symbols-rounded icon-s pointer ${post.likes && post.likes.includes(context.userId)? 'like-icon-filled' : ''}">favorite</span>
                    </div>
                </div>

            </div>

        </div>
        `)

        this.container.querySelector('.like-icon').onclick = () => {
            likeAndUnlike(post, context.userId)

            this.onLikeButton()
        }

        this.container.querySelector('.save-icon').onclick = () => {
            saveAndUnsavePost(post, context.userId)

            this.onSaveButton()
        }
    }

    onLikeButton() {
        throw new Error ('not overriden')
    }

    onSaveButton() {
        throw new Error('not overriden')
    }
}