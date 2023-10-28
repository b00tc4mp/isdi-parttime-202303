const { expect } = require('chai');
const { Message, Administrator } = require('../../data/models');
const mongoose = require('mongoose');
const { cleanUp, generate } = require('../helpers/tests');
require('dotenv').config()
const {
    errors: { AuthError, ContentError, ExistenceError, FormatError, DuplicityError, TypeError }
} = require('com');
const seeMessageList = require('./seeMessageList');

describe('seeMessageList', () => {
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

    it('should see Message list', async () => {

        const admin = generate.Administrator();
        await Administrator.create(admin);
        const message = generate.Message();
        
        const adminFound = await Administrator.findOne({ email: admin.email });
        const adminId= adminFound._id;

        await Message.create({author: message.author, email: message.email, title: message.title, text: message.text, status: message.status})
        await expect(seeMessageList(adminId.toString())).to.be.not.null;

    });
   

    it('should fail on incorrect Admin id format', async () => {
        const admin = generate.Administrator();
        await Administrator.create(admin);
        const message = generate.Message();
        
        const adminFound = await Administrator.findOne({ email: admin.email });
        const adminId= adminFound._id;

        await Message.create({author: message.author, email: message.email, title: message.title, text: message.text, status: message.status})
        const messageFound = await Message.findOne({ title: message.title });
        const messageId=messageFound._id.toString();
        await expect(() => seeMessageList('id')).to.throw(FormatError, 'id does not have 24 characters');
    });


});