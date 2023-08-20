import { tokenUtils, validators } from 'com';
const { extractSubFromToken } = tokenUtils;
const { validatePage, validateSort } = validators;
import context from './context';

const retrieveLevels = (sort, page) => {
  validateSort(sort);
  validatePage(page);

  const url = new URL(`${import.meta.env.VITE_API_URL}/levels`);
  url.searchParams.append('sort', sort);
  url.searchParams.append('page', page);

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${context.token}`
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Request failed');
      }
      return response.json();
    })
    .then((data) => {
      for (let level of data.levels) {
        level.isLevelLiked = (level.likes).includes(extractSubFromToken(context.token))
      }
      return data;
    })
    .catch((error) => {
      throw error;
    });
};

export default retrieveLevels