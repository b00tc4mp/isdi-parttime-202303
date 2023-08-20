const { expect } = require('chai');
const unlockAvatar = require('./unlockAvatar');
const { User } = require('../../data/models');
const mongoose = require('mongoose');
const { cleanUp, generate } = require('../helpers/tests');
const {
    errors: { TypeError, ExistenceError, ContentError, DuplicityError },
    assets: { colors, avatars },
} = require('com');

describe('unlockAvatar', () => {
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

    it('should add the selected new user avatar to unlockAvatars by user id', async () => {
        const username = `User${Math.floor(Math.random() * 999)}`;
        const password = `Password${Math.random()}`;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const recoveryQuestions = [
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` },
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` }
        ];

        const user = generate.user(username, password, 'beach', color, recoveryQuestions, [], [], [], 50, []);

        const createdUser = await User.create(user);
        const id = createdUser._id.toString();
        const avatar = avatars[Math.floor(Math.random() * avatars.length)];

        await unlockAvatar(id, avatar);

        const updatedUser = await User.findById(id);

        expect(updatedUser).to.be.an('object');
        expect(updatedUser).to.have.property('unlockAvatars');
        expect(updatedUser.unlockAvatars).to.include(avatar);
    });

    it('should fail on user not found', async () => {
        const id = (new mongoose.Types.ObjectId()).toString();
        const avatar = avatars[Math.floor(Math.random() * avatars.length)];

        try {
            await unlockAvatar(id, avatar);
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError);
            expect(error.message).to.equal('user not found');
        }
    });

    it('should fail on avatar already unlocked', async () => {
        const username = `User${Math.floor(Math.random() * 999)}`;
        const password = `Password${Math.random()}`;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const recoveryQuestions = [
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` },
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` }
        ];

        const user = generate.user(username, password, 'beach', color, recoveryQuestions, [], [], [], 1, ['basket', 'beach']);

        const createdUser = await User.create(user);
        const id = createdUser._id.toString();
        const avatar = 'beach';

        try {
            await unlockAvatar(id, avatar);
        } catch (error) {
            expect(error).to.be.instanceOf(DuplicityError);
            expect(error.message).to.equal('avatar already unlocked');
        }
    });

    it('should fail on invalid id type', async () => {
        const invalidId = 1234;
        const avatar = avatars[Math.floor(Math.random() * avatars.length)];
        await expect(() => unlockAvatar(invalidId, avatar)).to.throw(TypeError, 'userId is not a string');
    });

    it('should fail on empty id', async () => {
        const emptyId = '   ';
        const avatar = avatars[Math.floor(Math.random() * avatars.length)];
        await expect(() => unlockAvatar(emptyId, avatar)).to.throw(TypeError, 'userId is empty');
    });

    it('should fail on invalid avatar type', async () => {
        const id = (new mongoose.Types.ObjectId()).toString();
        const avatar = 1234;
        await expect(() => unlockAvatar(id, avatar)).to.throw(TypeError, 'avatar is not a string');
    });

    it('should fail on empty avatar', async () => {
        const id = (new mongoose.Types.ObjectId()).toString();
        const avatar = '   ';
        await expect(() => unlockAvatar(id, avatar)).to.throw(ContentError, 'avatar is empty');
    });

    it('should fail on not included avatar', async () => {
        const id = (new mongoose.Types.ObjectId()).toString();
        const avatar = 'black';
        await expect(() => unlockAvatar(id, avatar)).to.throw(ContentError, 'avatar is not included');
    });

});