import {posts} from "../data.js"

export function getPosts(){
const orderedPosts = [];

for(let i=posts.length-1; i>=0; i--){
orderedPosts.push(posts[i]);
}

return orderedPosts;
}