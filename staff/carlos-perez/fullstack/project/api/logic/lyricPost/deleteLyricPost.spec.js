const { expect } = require('chai');
const { LyricPost, Administrator } = require('../../data/models');
const mongoose = require('mongoose');
const { cleanUp, generate } = require('../helpers/tests');
require('dotenv').config()
const {
    errors: { AuthError, ContentError, ExistenceError, FormatError, DuplicityError, TypeError }
} = require('com');
const deleteLyricPost = require('./deleteLyricPost');

describe('deleteLyricPost', () => {
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
    
    it('should delete a LyricPost with correct credentials', async () => {

        const admin = generate.Administrator();
        await Administrator.create(admin);
        const lyricpost = generate.LyricPost();
        
        const adminFound = await Administrator.findOne({ email: admin.email });
        const adminId= adminFound._id;

        await LyricPost.create({author: adminId, title: lyricpost.title, media: lyricpost.media, text: lyricpost.text, songInfo: lyricpost.songInfo, date: lyricpost.date , visibility: lyricpost.visibility})
        const postFound = await LyricPost.findOne({ title: lyricpost.title });
        const postId=postFound._id.toString();
        await deleteLyricPost(adminId.toString(), postId);
        const result = await LyricPost.find();
        expect(result.length).to.equal(0);
    });

    
    it('should fail if the admin does not exist', async () => {
        const admin = generate.Administrator();
        await Administrator.create(admin);
        const lyricpost = generate.LyricPost();
        
        const adminFound = await Administrator.findOne({ email: admin.email });
        const adminId= adminFound._id;

        await LyricPost.create({author: adminId, title: lyricpost.title, media: lyricpost.media, text: lyricpost.text, songInfo: lyricpost.songInfo, date: lyricpost.date , visibility: lyricpost.visibility})
        const postFound = await LyricPost.findOne({ title: lyricpost.title });
        const postId=postFound._id.toString();
        try{deleteLyricPost('64f71960afe8291e1e4b9643', postId)}
        catch (error){
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.be('Administrator not found!')
        }
    });

    
    
    it('should fail on incorrect Admin id format', async () => {
        const admin = generate.Administrator();
        await Administrator.create(admin);
        const lyricpost = generate.LyricPost();
        
        const adminFound = await Administrator.findOne({ email: admin.email });
        const adminId= adminFound._id;

        await LyricPost.create({author: adminId, title: lyricpost.title, media: lyricpost.media, text: lyricpost.text, songInfo: lyricpost.songInfo, date: lyricpost.date , visibility: lyricpost.visibility})
        const postFound = await LyricPost.findOne({ title: lyricpost.title });
        const postId=postFound._id.toString();
        await expect(() => deleteLyricPost('id', postId)).to.throw(FormatError, 'Administrator ID does not have 24 characters');
    });

    
    it('should fail on incorrect Lyric Post id format', async () => {
        const admin = generate.Administrator();
        await Administrator.create(admin);
        const lyricpost = generate.LyricPost();
        
        const adminFound = await Administrator.findOne({ email: admin.email });
        const adminId= adminFound._id;

        await LyricPost.create({author: adminId, title: lyricpost.title, media: lyricpost.media, text: lyricpost.text, songInfo: lyricpost.songInfo, date: lyricpost.date , visibility: lyricpost.visibility})
        const postFound = await LyricPost.findOne({ title: lyricpost.title });
        const postId=postFound._id.toString();
        await expect(() => deleteLyricPost('64f71960afe8291e1e4b9643', 'id')).to.throw(FormatError, 'lyricPost ID does not have 24 characters');
    });
    
    it('should fail on not existing lyric post', async () => {
        const admin = generate.Administrator();
        await Administrator.create(admin);
        const lyricpost = generate.LyricPost();
        
        const adminFound = await Administrator.findOne({ email: admin.email });
        const adminId= adminFound._id;

        await LyricPost.create({author: adminId, title: lyricpost.title, media: lyricpost.media, text: lyricpost.text, songInfo: lyricpost.songInfo, date: lyricpost.date , visibility: lyricpost.visibility})
        const postFound = await LyricPost.findOne({ title: lyricpost.title });
        const postId=postFound._id.toString();
        try{deleteLyricPost('64f71960afe8291e1e4b9643', '64f71960afe8291e1e4b9643')}
        catch (error){
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal('lyricPost not found')
        }
    });
    
});