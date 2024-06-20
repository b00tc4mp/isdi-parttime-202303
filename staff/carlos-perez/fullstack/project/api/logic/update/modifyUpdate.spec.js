const { expect } = require('chai');
const { Update, Administrator } = require('../../data/models');
const mongoose = require('mongoose');
const { cleanUp, generate } = require('../helpers/tests');
require('dotenv').config()
const {
    errors: { AuthError, ContentError, ExistenceError, FormatError, DuplicityError, TypeError }
} = require('com');
const modifyUpdate = require('./modifyUpdate');

describe('modifyEvent', () => {
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
    
    it('should modify an Event with correct credentials', async () => {

        const admin = generate.Administrator();
        await Administrator.create(admin);
        const update = generate.Update();

        const adminFound = await Administrator.findOne({ email: admin.email });
        const adminId= adminFound._id.toString();

        await Update.create({author: adminId, title: update.title, image: update.image, text: update.text, rsstext: update.rsstext, date: update.date, visibility: update.visibility})
        const updateFound = await Update.findOne({ title: update.title });
        const updateId=updateFound._id.toString();

        await modifyUpdate(adminId, updateId, 'prueba', update.image, update.text, update.rsstext, update.visibility );
        
        const updateMod = await Update.findOne({ title: 'prueba' });

        expect(updateMod.title).to.equal('prueba');
    });
    

    it('should fail if the admin does not exist', async () => {
        const admin = generate.Administrator();
        await Administrator.create(admin);
        const update = generate.Update();

        const adminFound = await Administrator.findOne({ email: admin.email });
        const adminId= adminFound._id.toString();

        await Update.create({author: adminId, title: update.title, image: update.image, text: update.text, rsstext: update.rsstext, date: update.date, visibility: update.visibility})
        const updateFound = await Update.findOne({ title: update.title });
        const updateId=updateFound._id.toString();
        try{modifyUpdate('64f71960afe8291e1e4b9643', updateId, 'prueba', update.image, update.text, update.rsstext, update.visibility )}
        catch (error){
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.be('Admin does not exist')
        }
    });

    
    it('should fail on incorrect Admin id format', async () => {
        const admin = generate.Administrator();
        await Administrator.create(admin);
        const update = generate.Update();

        const adminFound = await Administrator.findOne({ email: admin.email });
        const adminId= adminFound._id.toString();

        await Update.create({author: adminId, title: update.title, image: update.image, text: update.text, rsstext: update.rsstext, date: update.date, visibility: update.visibility})
        const updateFound = await Update.findOne({ title: update.title });
        const updateId=updateFound._id.toString();
        await expect(() => modifyUpdate('id', updateId, 'prueba', update.image, update.text, update.rsstext, update.visibility ).to.throw(FormatError, 'Administrator ID does not have 24 characters'));
    });

    
    it('should fail on incorrect Update id format', async () => {
        const admin = generate.Administrator();
        await Administrator.create(admin);
        const update = generate.Update();

        const adminFound = await Administrator.findOne({ email: admin.email });
        const adminId= adminFound._id.toString();

        await Update.create({author: adminId, title: update.title, image: update.image, text: update.text, rsstext: update.rsstext, date: update.date, visibility: update.visibility})
        const updateFound = await Update.findOne({ title: update.title });
        const updateId=updateFound._id.toString();
        
        await expect(() => modifyUpdate('64f71960afe8291e1e4b9643', 'id', 'prueba', update.image, update.text, update.rsstext, update.visibility )).to.throw(FormatError, 'update id does not have 24 characters');
    });
     
    
    it('should fail on not existing event', async () => {
        const admin = generate.Administrator();
        await Administrator.create(admin);
        const update = generate.Update();

        const adminFound = await Administrator.findOne({ email: admin.email });
        const adminId= adminFound._id.toString();

        await Update.create({author: adminId, title: update.title, image: update.image, text: update.text, rsstext: update.rsstext, date: update.date, visibility: update.visibility})
        const updateFound = await Update.findOne({ title: update.title });
        const updateId=updateFound._id.toString();
        
        try{modifyUpdate('64f71960afe8291e1e4b9643', '64f71960afe8291e1e4b9643', 'prueba', update.image, update.text, update.rsstext, update.visibility )}
        catch (error){
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.be('This event does not exist')
        }
    });

    
    it('should fail on incorrect title format', async () => {
        const update = generate.Update();
        await expect(() => modifyUpdate('64f71960afe8291e1e4b9643', '64f71960afe8291e1e4b9643', 3, update.image, update.text, update.rsstext, update.visibility )).to.throw(TypeError, 'title is not a string');
    });

    it('should fail on incorrect text format', async () => {
        const update = generate.Update();
        await expect(() => modifyUpdate('64f71960afe8291e1e4b9643', '64f71960afe8291e1e4b9643', update.title, update.image, 3, update.rsstext, update.visibility )).to.throw(TypeError, 'text is not a string');
    });

    it('should fail on incorrect rss text format', async () => {
        const update = generate.Update();
        await expect(() => modifyUpdate('64f71960afe8291e1e4b9643', '64f71960afe8291e1e4b9643',update.title , update.image, update.text, 3, update.visibility )).to.throw(TypeError, 'rss text is not a string');
    });

    it('should fail on invalid image type', async () => {
        const update = generate.Update();
        await expect(() =>  modifyUpdate('64f71960afe8291e1e4b9643', '64f71960afe8291e1e4b9643',update.title , 3 , update.text, update.rsstext, update.visibility )).to.throw(TypeError, 'image url is not a string');
    });

    
});