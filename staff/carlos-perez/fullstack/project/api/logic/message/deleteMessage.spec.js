const { expect } = require('chai');
const { Message, Administrator } = require('../../data/models');
const mongoose = require('mongoose');
const { cleanUp, generate } = require('../helpers/tests');
require('dotenv').config()
const {
    errors: { AuthError, ContentError, ExistenceError, FormatError, DuplicityError, TypeError }
} = require('com');
const deleteMessage = require('./deleteMessage');

describe('deleteMessage', () => {
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
    
    it('should delete an message with correct credentials', async () => {

        const admin = generate.Administrator();
        await Administrator.create(admin);
        const message = generate.Message();
        
        const adminFound = await Administrator.findOne({ email: admin.email });
        const adminId= adminFound._id;

        await Message.create({author: message.author, email: message.email, title: message.title, text: message.text, status: message.status})
        const messageFound = await Message.findOne({ title: message.title });
        const messageId=messageFound._id.toString();
        await deleteMessage(adminId.toString(), messageId);
        const result = await Message.find();
        expect(result.length).to.equal(0);
    });

    it('should fail if the admin does not exist', async () => {
        const admin = generate.Administrator();
        await Administrator.create(admin);
        const message = generate.Message();
        
        const adminFound = await Administrator.findOne({ email: admin.email });
        const adminId= adminFound._id;

        await Message.create({author: message.author, email: message.email, title: message.title, text: message.text, status: message.status})
        const messageFound = await Message.findOne({ title: message.title });
        const messageId=messageFound._id.toString();
        try{deleteMessage('64f71960afe8291e1e4b9643', messageId)}
        catch (error){
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).equals('Administrator not found!')
        }
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
        await expect(() => deleteMessage('id', messageId)).to.throw(FormatError, 'Administrator ID does not have 24 characters');
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
        await expect(() => deleteMessage('64f71960afe8291e1e4b9643', 'id')).to.throw(FormatError, 'Message ID does not have 24 characters');
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
        try{deleteMessage('64f71960afe8291e1e4b9643', '64f71960afe8291e1e4b9643')}
        catch (error){
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error).equals('message not found')
        }
    });
    
});