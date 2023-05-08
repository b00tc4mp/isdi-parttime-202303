import { posts } from "./data/posts/data";
import { retrieveUser } from "./retrieve-user";


export const retrievePostInfo = (id) => {
  const postData =  posts.filter((post) => post.id === id)[0];
  const authorData = retrieveUser(postData.author);
  return {postData, authorData};
}