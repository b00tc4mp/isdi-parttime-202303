const { expect } = require('chai');
const { Update, Administrator } = require('../../data/models');
const mongoose = require('mongoose');
const { cleanUp, generate } = require('../helpers/tests');
require('dotenv').config()
const {
    errors: { AuthError, ContentError, ExistenceError, FormatError, DuplicityError, TypeError }
} = require('com');
const deleteUpdate = require('./deleteUpdate');

describe('deleteUpdate', () => {
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
    
    it('should delete an Update with correct credentials', async () => {

        const admin = generate.Administrator();
        await Administrator.create(admin);
        const update = generate.Update();
        
        const adminFound = await Administrator.findOne({ email: admin.email });
        const adminId= adminFound._id;

        await Update.create({author: adminId, title: update.title, image: update.image, text: update.text, rsstext: update.rsstext, date: update.date, visibility: update.visibility })
        const updateFound = await Update.findOne({ title: update.title });
        const updateId=updateFound._id.toString();
        await deleteUpdate(adminId.toString(), updateId);
        const result = await Update.find();
        expect(result.length).to.equal(0);
    });

    it('should fail if the admin does not exist', async () => {
        const admin = generate.Administrator();
        await Administrator.create(admin);
        const update = generate.Update();
        
        const adminFound = await Administrator.findOne({ email: admin.email });
        const adminId= adminFound._id;

        await Update.create({author: adminId, title: update.title, image: update.image, text: update.text, rsstext: update.rsstext, date: update.date, visibility: update.visibility })
        const updateFound = await Update.findOne({ title: update.title });
        const updateId=updateFound._id.toString();
        try{deleteUpdate('64f71960afe8291e1e4b9643', updateId)}
        catch (error){
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).equals('Administrator not found!')
        }
    });
    
    it('should fail on incorrect Admin id format', async () => {
        const admin = generate.Administrator();
        await Administrator.create(admin);
        const update = generate.Update();
        
        const adminFound = await Administrator.findOne({ email: admin.email });
        const adminId= adminFound._id;

        await Update.create({author: adminId, title: update.title, image: update.image, text: update.text, rsstext: update.rsstext, date: update.date, visibility: update.visibility })
        const updateFound = await Update.findOne({ title: update.title });
        const updateId=updateFound._id.toString();
        await expect(() => deleteUpdate('id', updateId)).to.throw(FormatError, 'Administrator ID does not have 24 characters');
    });

    

    it('should fail on incorrect Update id format', async () => {
        const admin = generate.Administrator();
        await Administrator.create(admin);
        const update = generate.Update();
        
        const adminFound = await Administrator.findOne({ email: admin.email });
        const adminId= adminFound._id;

        await Update.create({author: adminId, title: update.title, image: update.image, text: update.text, rsstext: update.rsstext, date: update.date, visibility: update.visibility })
        const updateFound = await Update.findOne({ title: update.title });
        const updateId=updateFound._id.toString();
        await expect(() => deleteUpdate('64f71960afe8291e1e4b9643', 'id')).to.throw(FormatError, 'Update ID does not have 24 characters');
    });
    
    
    it('should fail on not existing event', async () => {
        const admin = generate.Administrator();
        await Administrator.create(admin);
        const update = generate.Update();
        
        const adminFound = await Administrator.findOne({ email: admin.email });
        const adminId= adminFound._id;

        await Update.create({author: adminId, title: update.title, image: update.image, text: update.text, rsstext: update.rsstext, date: update.date, visibility: update.visibility })
        const updateFound = await Update.findOne({ title: update.title });
        const updateId=updateFound._id.toString();
        try{deleteUpdate('64f71960afe8291e1e4b9643', '64f71960afe8291e1e4b9643')}
        catch (error){
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error).equals('Update not found')
        }
    });
});