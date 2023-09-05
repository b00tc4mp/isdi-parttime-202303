const { expect } = require('chai');
const { LyricPost, Administrator } = require('../../data/models');
const mongoose = require('mongoose');
const { cleanUp, generate } = require('../helpers/tests');
require('dotenv').config()
const {
    errors: { AuthError, ContentError, ExistenceError, FormatError, DuplicityError, TypeError }
} = require('com');
const seeLyricPostList = require('./seeLyricPostList');

describe('seeLyricPostList', () => {
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
    
    it('should see events', async () => {
        const result = await seeLyricPostList();
        expect(result).to.be.not.null;
    });
});