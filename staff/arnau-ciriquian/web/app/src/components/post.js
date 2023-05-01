import Component from "../library/composito.js";
import { findUserById } from "../logic/helpers/data-managers.js";
import { context } from "../ui.js";

export default class Post extends Component {
    constructor(post) {
        const user = findUserById(post.author)

        super(
            `<article class="inputs__box--feed">
                <img class="home__post--image" src="${post.image}">
                <p class="text">${post.text}</p>
                <div class="home__post--info">
                    <div class="post__info--user">
                        <img class="post__avatar" src="${user.avatar}">
                        <p class="text">${user.name}</p>
                    </div>
                    <time class="text">${post.date}</time>
                    <img class="like-button" src="./images/heart-empty.png">
                    <p></p>
                    <button class"post__edit--button">Edit</button>
                </div>
            </article>`
        )

        
    }
}

