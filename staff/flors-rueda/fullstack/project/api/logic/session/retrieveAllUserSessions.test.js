const { expect } = require('chai');
const retrieveAllUserSessions = require('./retrieveAllUserSessions');
const { Session } = require('../../data/models');
const mongoose = require('mongoose');
const { cleanUp, generate } = require('../helpers/tests');
const {
    errors: { ContentError, ExistenceError },
} = require('com');

describe('retrieveAllUserSessions', () => {
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

    it('should retrieve all socket ids of sessions by user id', async () => {
        const socketId = `id${Math.floor(Math.random() * 999)}`;
        const socketId2 = `id2${Math.floor(Math.random() * 999)}`;
        const socketId3 = `id${Math.floor(Math.random() * 999)}`;
        const userId = new mongoose.Types.ObjectId();
        const date = Date.now();
        const allSessions = [{ socketId: socketId, date: date }, { socketId: socketId2, date: date }, { socketId: socketId3, date: date }];

        const session = generate.session(userId, allSessions);

        await Session.create(session);

        const fetchedSessions = await retrieveAllUserSessions(userId.toString());

        expect(fetchedSessions).to.be.an('array');
        expect(fetchedSessions.length).to.equal(3);
        expect(fetchedSessions).to.deep.equal([socketId, socketId2, socketId3]);
    });

    it('should fail on user not found', async () => {
        const userId = (new mongoose.Types.ObjectId()).toString();

        try {
            await retrieveAllUserSessions(userId);
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError);
            expect(error.message).to.equal('user not found');
        }
    });

    it('should fail on invalid user id type', async () => {
        const userId = new mongoose.Types.ObjectId();

        await expect(() => retrieveAllUserSessions(userId)).to.throw(TypeError, 'userId is not a string');
    });

    it('should fail on empty user id', async () => {
        const userId = '   ';

        await expect(() => retrieveAllUserSessions(userId)).to.throw(ContentError, 'userId is empty');
    });
});