const { NasaEvent } = require('../../data/models');
const {
  errors: { ConnectionError, ContentError },
  validators: { validateText, validateObject },
} = require('com');

/**
 * Saves NASA event data to a database based on the provided response and event type.
 * @param {Object} res - The HTTP response object from the NASA endpoint.
 * @param {string} event - The type of NASA event ('massEjection', 'geoStorm', or 'solarFlare').
 *
 * @throws {TypeError} If event param is not an string or res param is not a object.
 * @throws {ContentError} If there are issues with parsing the response body or database operations.
 * @throws {ConnectionError} If the HTTP response status code is not 200.
 * @throws {ContentError} If there are issues with parsing the response body or database operations.
 */

const saveNasaData = (res, event) => {
  validateObject(res, 'response');
  validateText(event, 'event');

  return (async () => {
    if (res.status === 200) {
      const resBody = await res.text();

      if (resBody) {
        try {
          data = JSON.parse(resBody);

          for (const item of data) {
            let eventDate;

            if (event === 'massEjection' || event === 'geoStorm') {
              eventDate = item.startTime;
            } else if (event === 'solarFlare') {
              eventDate = item.beginTime;
            } else {
              eventDate = item.eventTime;
            }

            const newEvent = {
              date: new Date(eventDate),
              event,
              link: item.link,
            };

            await NasaEvent.create(newEvent);
          }
        } catch (error) {
          throw new ContentError(
            `invalid response body: ${resBody} from ${event} response status ${res.status}`
          );
        }
      }
    } else {
      throw new ConnectionError(
        `nasa endpoint to ${event} response status: ${res.status}`
      );
    }
  })();
};

module.exports = saveNasaData;
