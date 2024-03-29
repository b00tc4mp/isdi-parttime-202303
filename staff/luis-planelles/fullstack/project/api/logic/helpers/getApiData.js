const { validateText } = require('com/validators');

/**
 * Fetches data from a NASA API endpoint, processes.
 * @param {string} eventType - The type of event to fetch data for (e.g., 'massEjection').
 * @param {string} endpoint - The API endpoint URL to fetch data from.
 * @throws {Error} Throws an error if there's an issue with fetching or processing the data.
 * @returns {object} Returns response object get from api.
 */

const getApiData = async (eventType, endpoint) => {
  validateText(eventType, 'eventType');
  validateText(endpoint, 'endpoint');

  let res;

  try {
    res = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    throw new Error(
      `Error fetching ${eventType} data from NASA: ${error.message}`
    );
  }

  return res;
};

module.exports = getApiData;
