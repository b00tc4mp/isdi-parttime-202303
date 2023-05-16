import {posts} from "../data.js"

export function retrievePosts(){
    return posts().toReversed();
}