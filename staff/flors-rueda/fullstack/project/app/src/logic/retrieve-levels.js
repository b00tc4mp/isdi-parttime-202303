import { validators } from 'com';
import { extractSubFromToken } from './tokenUtils/tokenUtils';
const { validatePage, validateSort } = validators;
import context from './context';

/**
 * Retrieves levels with specified sorting and pagination parameters.
 *
 * @param {string} sort - The sorting parameter for the retrieved levels.
 * @param {number} page - The pagination parameter for the retrieved levels.
 * @returns {[object]} A Promise that resolves with retrieved levels information.
 * @throws {Error} If the validation of the sorting parameter or page fails, or if the request fails.
 */

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