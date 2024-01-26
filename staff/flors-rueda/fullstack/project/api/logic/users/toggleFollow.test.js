const { expect } = require('chai');
const toggleFollow = require('./toggleFollow');
const { User } = require('../../data/models');
const mongoose = require('mongoose');
const { cleanUp, generate } = require('../helpers/tests');
const {
    errors: { TypeError, ContentError, ExistenceError },
    assets: { colors },
} = require('com');

describe('toggleFollow', () => {
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

    it('should update the presence of the user id in the follows array and change followers number of the user being followed object', async () => {
        const username = `User${Math.floor(Math.random() * 999)}`;
        const password = `Password${Math.random()}`;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const recoveryQuestions = [
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` },
        ];

        const user = generate.user(username, password, 'beach', color, recoveryQuestions, [], [], [], 2, ['beach']);

        const followedUser = await User.create(user);
        const followedUserId = followedUser._id.toString();

        const username2 = `User${Math.floor(Math.random() * 999)}`;
        const password2 = `Password${Math.random()}`;
        const color2 = colors[Math.floor(Math.random() * colors.length)];
        const recoveryQuestions2 = [
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` },
        ];

        const user2 = generate.user(username2, password2, 'beach', color2, recoveryQuestions2, [], [], [], 5, ['beach']);
        const followerUser = await User.create(user2);
        const followerUserId = (followerUser._id).toString();

        await toggleFollow(followerUserId, followedUserId);

        const updatedFollowedUser = await User.findById(followedUserId);
        const updatedFollowerUser = await User.findById(followerUserId);

        expect((updatedFollowerUser.follows).includes(followedUserId)).to.be.true;
        expect((updatedFollowedUser.followers).includes(followerUserId)).to.be.true;

        await toggleFollow(followerUserId, followedUserId);

        const updatedFollowedUserAgain = await User.findById(followedUserId);
        const updatedFollowerUserAgain = await User.findById(followerUserId);

        expect((updatedFollowerUserAgain.follows).includes(followedUserId)).to.be.false;
        expect((updatedFollowerUserAgain.follows).includes(followerUserId)).to.be.false;

    });

    it('should fail on followerUser not found', async () => {
        const id = (new mongoose.Types.ObjectId()).toString();

        try {
            await toggleFollow(id, id);
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError);
            expect(error.message).to.equal('followerUser not found');
        }
    });

    it('should fail on followedUser not found', async () => {
        const username = `User${Math.floor(Math.random() * 999)}`;
        const password = `Password${Math.random()}`;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const recoveryQuestions = [
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` },
        ];

        const user = generate.user(username, password, 'beach', color, recoveryQuestions, [], [], [], 2, ['beach']);

        const followerUser = await User.create(user);
        const followerUserId = followerUser._id.toString();

        const followedUserId = (new mongoose.Types.ObjectId()).toString();

        try {
            await toggleFollow(followerUserId, followedUserId);
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError);
            expect(error.message).to.equal('followedUser not found');
        }
    });

    it('should fail on invalid follower userId type', async () => {
        const follower = 1234;
        const followed = (new mongoose.Types.ObjectId()).toString();
        try {
            await toggleFollow(follower, followed);
            throw new Error('Test should have thrown a TypeError');
        } catch (error) {
            expect(error.message).to.equal('follower userId is not a string');
        }
    });

    it('should fail on empty follower userId', async () => {
        const follower = '  ';
        const followed = (new mongoose.Types.ObjectId()).toString();
        try {
            await toggleFollow(follower, followed);
            throw new Error('Test should have thrown a ContentError');
        } catch (error) {
            expect(error).to.be.instanceOf(ContentError);
            expect(error.message).to.equal('follower userId is empty');
        }
    });

    it('should fail on invalid followed userId type', async () => {
        const follower = (new mongoose.Types.ObjectId()).toString();
        const followed = 1234;
        try {
            await toggleFollow(follower, followed);
            throw new Error('Test should have thrown a TypeError');
        } catch (error) {
            expect(error.message).to.equal('followed userId is not a string');
        }
    });

    it('should fail on empty userId', async () => {
        const follower = (new mongoose.Types.ObjectId()).toString();
        const followed = '   ';
        try {
            await toggleFollow(follower, followed);
            throw new Error('Test should have thrown a ContentError');
        } catch (error) {
            expect(error).to.be.instanceOf(ContentError);
            expect(error.message).to.equal('followed userId is empty');
        }
    });

});