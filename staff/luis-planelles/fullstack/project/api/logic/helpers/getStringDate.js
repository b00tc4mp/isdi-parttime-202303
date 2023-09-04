const { validateDate } = require('com/validators');

/**
 * Formats a Date object as a string in 'YYYY-MM-DD' format.
 * @param {Date} date - The Date object to be formatted.
 * @returns {string} A string representing the date in 'YYYY-MM-DD' format.
 */

const getStringDate = (date) => {
  validateDate(date, 'date');

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate() - 1).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

module.exports = getStringDate;
