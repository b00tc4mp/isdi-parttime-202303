import retrievePost from '../../logic/retrieve-post';

const getEditPost = (post, editPostForm) => {
  const foundPost = retrievePost(post.id);

  editPostForm.querySelector('input[type=hidden]').value = post.id;
  editPostForm.querySelector('input[type=url]').value = post.image;
  editPostForm.querySelector('textarea').value = post.text;

  return foundPost;
};

export default getEditPost;
