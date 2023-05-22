import { isPostPublished } from './helpers';

//TODO Fix validators to only synchronous stuff

export const validatePostText = (text) => {
  if (typeof text !== 'string') throw new Error('text is not a string');
  if (!text.trim().length) throw new Error('text is empty');
  if (text.length > 180) throw new Error('text is exceeds max characters')
};

export const validatePostImage = (url) => {
  if (typeof url !== 'string') throw new Error('url is not a string');
  if (!url.trim().length) throw new Error('url is empty');
  const regexRule = /^\s*(?:(?:[A-Za-z0-9+/]{4})+\s*)*[A-Za-z0-9+/]*={0,2}\s*$/;
  if (regexRule.test(url)) throw new Error('is not an image url');
};

export const validatePostAuthor = (post, userId) => {
  if (post.author !== userId) throw new Error('user is not the original author of the post');
};

export const validatePostExists = (postId) => {
  if (!isPostPublished(postId)) throw new Error('post does not exist');
}