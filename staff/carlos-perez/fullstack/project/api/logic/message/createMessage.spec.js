const { expect } = require('chai');
const { Message, Administrator } = require('../../data/models');
const mongoose = require('mongoose');
const { cleanUp, generate } = require('../helpers/tests');
require('dotenv').config()
const {
    errors: { AuthError, ContentError, ExistenceError, FormatError, DuplicityError, TypeError }
} = require('com');
const createMessage = require('./createMessage');

describe('createMessage', () => {
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

    it('should create a Message', async () => {

        const message = generate.Message();

        await createMessage(message.author, message.email, message.title, message.text, message.status );

        expect(Message.find()).to.be.not.null;
    });


    it('should fail on invalid title type', async () => {
        const message = generate.Message();
        await expect(() => createMessage(message.author, message.email, 3, message.text, message.status )).to.throw(TypeError, 'title is not a string');
    });

    it('should fail on invalid text type', async () => {
        const message = generate.Message();
        await expect(() => createMessage(message.author, message.email, message.title, 3 , message.status )).to.throw(TypeError, 'text is not a string');
    });

    it('should fail on invalid author type', async () => {
        const message = generate.Message();
        await expect(() => createMessage(3, message.email, message.title, message.text, message.status )).to.throw(TypeError, 'author is not a string');
    });

    it('should fail on invalid email type', async () => {
        const message = generate.Message();
        await expect(() => createMessage(message.author, 3 , message.title, message.text, message.status )).to.throw(TypeError, 'email is not a string');
    });

});