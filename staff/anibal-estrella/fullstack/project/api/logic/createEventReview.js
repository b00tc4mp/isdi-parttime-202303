const {
    errors: { ExistenceError, ContentError },
    validators: { validateText, validateUrl, validateId, validateEuroPrice }
} = require('com');

const { User, Event } = require('../data-project/models.js');

module.exports = (event, author, text, lineUp, dates, place, price, score, image, audio, video) => {
    validateId(userId, 'user id');
    validateUrl(image, 'Image URL');
    validateText(text, 'Event\'s text');
    validateEuroPrice(price, 'Event\'s price in euro');

    let priceInCents;

    if (price) {
        priceInCents = parseInt(price.replace(',', ''), 10);
    } else {
        priceInCents = 0;  // Default to 0 if price is not provided
    }

    return User.findById(userId)
        .then(user => {
            if (!user) throw new ExistenceError(`user with id ${userId} does not exist`);
            return Event.create({
                author: userId,
                event, text, lineUp, dates, place, score, image, audio, video,
                price: priceInCents
            });
        })
        .then(() => { });
}