const { expect } = require('chai');
const { Message, Administrator } = require('../../data/models');
const mongoose = require('mongoose');
const { cleanUp, generate } = require('../helpers/tests');
require('dotenv').config()
const {
    errors: { AuthError, ContentError, ExistenceError, FormatError, DuplicityError, TypeError }
} = require('com');
const readMessage = require('./readMessage');

describe('readMessage', () => {
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

    it('should read a Message', async () => {

        const admin = generate.Administrator();
        await Administrator.create(admin);
        const message = generate.Message();
        
        const adminFound = await Administrator.findOne({ email: admin.email });
        const adminId= adminFound._id;

        await Message.create({author: message.author, email: message.email, title: message.title, text: message.text, status: message.status})
        const messageFound = await Message.findOne({ title: message.title });
        const messageId=messageFound._id.toString();
       // const result = await readMessage(adminId.toString(), messageId)
        await expect(readMessage(adminId.toString(), messageId)).to.be.not.null;

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
        await expect(() => readMessage('id', messageId)).to.throw(FormatError, 'administrator id does not have 24 characters');
    });

    it('should fail on incorrect Message id format', async () => {
        const admin = generate.Administrator();
        await Administrator.create(admin);
        const message = generate.Message();
        
        const adminFound = await Administrator.findOne({ email: admin.email });
        const adminId= adminFound._id;

        await Message.create({author: message.author, email: message.email, title: message.title, text: message.text, status: message.status})
        const messageFound = await Message.findOne({ title: message.title });
        const messageId=messageFound._id.toString();
        await expect(() => readMessage(adminId.toString(), 'id')).to.throw(FormatError, 'message id does not have 24 characters');
    });

    it('should fail on not existing message', async () => {
        const admin = generate.Administrator();
        await Administrator.create(admin);
        const message = generate.Message();
        
        const adminFound = await Administrator.findOne({ email: admin.email });
        const adminId= adminFound._id;

        await Message.create({author: message.author, email: message.email, title: message.title, text: message.text, status: message.status})
        const messageFound = await Message.findOne({ title: message.title });
        const messageId=messageFound._id.toString();
        try{readMessage(adminId.toString(), '64f71960afe8291e1e4b9643')}
        catch (error){
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error).equals('This message does not exist')
        }
    });
    it('should fail on not existing Admin', async () => {
        const admin = generate.Administrator();
        await Administrator.create(admin);
        const message = generate.Message();
        
        const adminFound = await Administrator.findOne({ email: admin.email });
        const adminId= adminFound._id;

        await Message.create({author: message.author, email: message.email, title: message.title, text: message.text, status: message.status})
        const messageFound = await Message.findOne({ title: message.title });
        const messageId=messageFound._id.toString();
        try{readMessage('64f71960afe8291e1e4b9643', '64f71960afe8291e1e4b9643')}
        catch (error){
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error).equals('Admin does not exist')
        }
    });
});