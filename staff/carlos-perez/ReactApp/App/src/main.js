//Data

import {users} from "./data.js";

const usersJson = JSON.stringify(users);

const almacen=localStorage;
almacen.users=usersJson;

export let activeUser;

export let context = sessionStorage;


//Logic

import { getPosts} from "./logic/retrievePosts.js";


//Presentation



export function muestraPosts(){
    postListPanel.innerHTML='';
    let posts=getPosts();
    posts.forEach(post => {
        const postItem=document.createElement('article');

        const image = document.createElement('img');
        image.src=post.image;

        const text = document.createElement('p');
        text.innerText = post.text;

        const date= document.createElement('time');
        date.innerText=post.date;

        if (post.author === context.userid) {
            const button = document.createElement('button');
            button.innerText = 'Edit';

            postItem.append(image, text, date, button);
        } else {
            postItem.append(image, text, date);
        }

        postListPanel.appendChild(postItem);
    }
    )
}