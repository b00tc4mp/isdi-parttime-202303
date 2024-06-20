const { expect } = require('chai');
const { Update, Administrator } = require('../../data/models');
const mongoose = require('mongoose');
const { cleanUp, generate } = require('../helpers/tests');
require('dotenv').config()
const {
    errors: { AuthError, ContentError, ExistenceError, FormatError, DuplicityError, TypeError }
} = require('com');
const seeUpdateList = require('./seeUpdateList');

describe('seeUpdateList', () => {
    before(async () => {
        await mongoose.connect(process.env.MONGODB_URL);
    });

    beforeEach(async () => {
        await cleanUp();
    })

    after(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
    });
    
    it('should see updates', async () => {
        const admin = generate.Administrator();
        await Administrator.create(admin);
        const update = generate.Update();

        const adminFound = await Administrator.findOne({ email: admin.email });
        const adminId= adminFound._id.toString();

        await Update.create({author: adminId, title: update.title, image: update.image, text: update.text, rsstext: update.rsstext, date: update.date, visibility: update.visibility})
        const result = await seeUpdateList();
        expect(result).to.be.not.null;
    });
});