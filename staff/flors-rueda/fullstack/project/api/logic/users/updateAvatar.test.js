const { expect } = require('chai');
const updateAvatar = require('./updateAvatar');
const { User } = require('../../data/models');
const mongoose = require('mongoose');
const { cleanUp, generate } = require('../helpers/tests');
const {
    errors: { TypeError, ContentError, ExistenceError },
    assets: { colors, avatars },
} = require('com');

describe('updateAvatar', () => {
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

    it('should update user avatar with valid userId', async () => {
        const username = `User${Math.floor(Math.random() * 999)}`;
        const password = `Password${Math.random()}`;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const avatar = avatars[Math.floor(Math.random() * avatars.length)];
        const recoveryQuestions = [
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` },
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` }
        ];

        const user = generate.user(username, password, avatar, color, recoveryQuestions, [], [], [], 1, ['basket', 'beach', 'blue', 'candy', 'dark', 'disco', 'lava', 'leopard', 'pink', 'rainbow', 'tennis', 'wood']);

        const createdUser = await User.create(user);
        const id = createdUser._id.toString();

        const newAvatar = avatars[Math.floor(Math.random() * avatars.length)];

        await updateAvatar(id, newAvatar);

        const updatedUser = await User.findById(id);

        expect(updatedUser).to.be.an('object');
        expect(updatedUser).to.have.property('avatar', newAvatar)
    });

    it('should fail on user not found', async () => {
        const id = (new mongoose.Types.ObjectId()).toString();
        const avatar = avatars[Math.floor(Math.random() * avatars.length)];

        try {
            await updateAvatar(id, avatar);
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError);
            expect(error.message).to.equal('user not found');
        }
    });

    it('should fail on avatar not available', async () => {
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
        const avatar = 'wood';

        try {
            await updateAvatar(id, avatar);
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError);
            expect(error.message).to.equal('avatar not available');
        }
    });

    it('should fail on invalid id type', async () => {
        const invalidId = 1234;
        const avatar = avatars[Math.floor(Math.random() * avatars.length)];
        await expect(() => updateAvatar(invalidId, avatar)).to.throw(TypeError, 'userId is not a string');
    });

    it('should fail on empty id', async () => {
        const emptyId = '   ';
        const avatar = avatars[Math.floor(Math.random() * avatars.length)];
        await expect(() => updateAvatar(emptyId, avatar)).to.throw(TypeError, 'userId is empty');
    });

    it('should fail on invalid avatar type', async () => {
        const id = (new mongoose.Types.ObjectId()).toString();
        const avatar = Math.floor(Math.random() * avatars.length);

        await expect(() => updateAvatar(id, avatar)).to.throw(TypeError, 'avatar is not a string');
    });

    it('should fail on empty avatar', async () => {
        const id = (new mongoose.Types.ObjectId()).toString();
        const avatar = '   ';

        await expect(() => updateAvatar(id, avatar)).to.throw(ContentError, 'avatar is empty');
    });

    it('should fail on not included avatar', async () => {
        const id = (new mongoose.Types.ObjectId()).toString();
        const avatar = 'black';

        await expect(() => updateAvatar(id, avatar)).to.throw(ContentError, 'avatar is not included');
    });

});