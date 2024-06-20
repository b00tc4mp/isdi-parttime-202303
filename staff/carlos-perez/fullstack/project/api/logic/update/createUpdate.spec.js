const { expect } = require('chai');
const { Update, Administrator } = require('../../data/models');
const mongoose = require('mongoose');
const { cleanUp, generate } = require('../helpers/tests');
require('dotenv').config()
const {
    errors: { AuthError, ContentError, ExistenceError, FormatError, DuplicityError, TypeError }
} = require('com');
const createUpdate = require('./createUpdate');

describe('createUpdate', () => {
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

    it('should create an Update with correct credentials', async () => {

        const admin = generate.Administrator();
        await Administrator.create(admin);
        const update = generate.Update();

        const adminFound = await Administrator.findOne({ email: admin.email });
        const adminId= adminFound._id.toString();

        await createUpdate(adminId, update.title, update.image, update.text, update.rsstext, update.visibility);

        expect(Update.find()).to.be.not.null;
    });

    it('should fail if the admin does not exist', async () => {
        const admin = generate.Administrator();
        await Administrator.create(admin);
        const update = generate.Update();
        
        try{createUpdate('64f71960afe8291e1e4b9643', update.title, update.image, update.text, update.rsstext, update.visibility)}
        catch (error){
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal('Admin does not exist')
        }
    });

        
    
    it('should fail on incorrect id format', async () => {
        const update = generate.Update();
        await expect(() => createUpdate('id', update.title, update.image, update.text, update.rsstext, update.visibility)).to.throw(FormatError, 'admin id does not have 24 characters');
    });

    it('should fail on invalid title type', async () => {
        const update = generate.Update();
        await expect(() => createUpdate('64f71960afe8291e1e4b9643', 3, update.image, update.text, update.rsstext, update.visibility)).to.throw(TypeError, 'title is not a string');
    });

    it('should fail on invalid text type', async () => {
        const update = generate.Update();
        await expect(() => createUpdate('64f71960afe8291e1e4b9643', update.title, update.image, 3 , update.rsstext, update.visibility)).to.throw(TypeError, 'text is not a string');
    });

    it('should fail on invalid rsstext type', async () => {
        const update = generate.Update();
        await expect(() => createUpdate('64f71960afe8291e1e4b9643', update.title, update.image, update.text , 3 , update.visibility)).to.throw(TypeError, 'rss text is not a string');
    });

    it('should fail on invalid image type', async () => {
        const update = generate.Update();
        await expect(() => createUpdate('64f71960afe8291e1e4b9643', update.title, 3, update.text, update.rsstext, update.visibility)).to.throw(TypeError, 'image url is not a string');
    });

});