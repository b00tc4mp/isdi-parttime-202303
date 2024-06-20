const { expect } = require('chai');
const { LyricPost, Administrator } = require('../../data/models');
const mongoose = require('mongoose');
const { cleanUp, generate } = require('../helpers/tests');
require('dotenv').config()
const {
    errors: { AuthError, ContentError, ExistenceError, FormatError, DuplicityError, TypeError }
} = require('com');
const createLyricPost = require('./createLyricPost');

describe('createLyricPost', () => {
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

    it('should create a Lyric Post with correct credentials', async () => {

        const admin = generate.Administrator();
        await Administrator.create(admin);
        const lyricpost = generate.LyricPost();

        const adminFound = await Administrator.findOne({ email: admin.email });
        const adminId= adminFound._id.toString();

        await createLyricPost(adminId, lyricpost.title, lyricpost.media, lyricpost.text, lyricpost.songInfo, lyricpost.visibility);

        expect(LyricPost.find()).to.be.not.null;
    });

    
    it('should fail if the admin does not exist', async () => {
        const admin = generate.Administrator();
        await Administrator.create(admin);
        const lyricpost = generate.LyricPost();

        const adminFound = await Administrator.findOne({ email: admin.email });
        const adminId= adminFound._id.toString();

        try{createLyricPost('64f71960afe8291e1e4b9643', lyricpost.title, lyricpost.media, lyricpost.text, lyricpost.songInfo, lyricpost.visibility)}
        catch (error){
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal('Admin does not exist')
        }
    });

    
    it('should fail on incorrect id format', async () => {
        const lyricpost = generate.LyricPost();
        await expect(() => createLyricPost('id', lyricpost.title, lyricpost.media, lyricpost.text, lyricpost.songInfo, lyricpost.visibility)).to.throw(FormatError, 'admin id does not have 24 characters');
    });

    it('should fail on invalid title type', async () => {
        const lyricpost = generate.LyricPost();
        await expect(() => createLyricPost('64f71960afe8291e1e4b9643', 3 , lyricpost.media, lyricpost.text, lyricpost.songInfo, lyricpost.visibility)).to.throw(TypeError, 'title is not a string');
    });

    it('should fail on invalid text type', async () => {
        const lyricpost = generate.LyricPost();
        await expect(() => createLyricPost('64f71960afe8291e1e4b9643', lyricpost.title , lyricpost.media, 3 , lyricpost.songInfo, lyricpost.visibility)).to.throw(TypeError, 'text is not a string');
    });

    it('should fail on invalid song information type', async () => {
        const lyricpost = generate.LyricPost();
        await expect(() => createLyricPost('64f71960afe8291e1e4b9643', lyricpost.title , lyricpost.media, lyricpost.text , 3, lyricpost.visibility)).to.throw(TypeError, 'Song Information is not a string');
    });

    it('should fail on invalid song information type', async () => {
        const lyricpost = generate.LyricPost();
        await expect(() => createLyricPost('64f71960afe8291e1e4b9643', lyricpost.title , 3 , lyricpost.text , lyricpost.songInfo, lyricpost.visibility)).to.throw(TypeError, 'media is not a string');
    });
});