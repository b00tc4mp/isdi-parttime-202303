const { expect } = require('chai');
const cleanSession = require('./cleanSession');
const { Session } = require('../../data/models');
const mongoose = require('mongoose');
const { cleanUp, generate } = require('../helpers/tests');
const {
    errors: { ContentError, ExistenceError },
} = require('com');

describe('cleanSession', () => {
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

    it('should clean all old sessions and session id', async () => {
        const socketId = `id${Math.floor(Math.random() * 999)}`;
        const socketId2 = `id2${Math.floor(Math.random() * 999)}`;
        const socketId3 = `id${Math.floor(Math.random() * 999)}`;
        const userId = new mongoose.Types.ObjectId();
        const date = Date.now();
        const oldDate = new Date('July 20, 1995 11:24:00');
        const oldSessions = [{ socketId: socketId, date: oldDate }, { socketId: socketId2, date: oldDate }, { socketId: socketId3, date: date }];

        const session = generate.session(userId, oldSessions);

        await Session.create(session);

        await cleanSession(userId.toString());

        const createdSession = await Session.findOne({ user: userId });

        expect(createdSession.sessions).to.be.an('array');
        expect(createdSession.sessions.length).to.equal(1);
        expect(createdSession.sessions[0]).to.be.an('object');
        expect(createdSession.sessions[0].socketId).to.equal(socketId3);
        expect(createdSession.sessions[0].date.getTime()).to.be.closeTo(date, 10000);
    });

    it('should fail on user not found', async () => {
        const userId = (new mongoose.Types.ObjectId()).toString();
        const socketId = (new mongoose.Types.ObjectId()).toString();

        try {
            await cleanSession(userId, socketId);
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError);
            expect(error.message).to.equal('user not found');
        }
    });

    it('should fail on invalid user id type', async () => {
        const userId = new mongoose.Types.ObjectId();
        await expect(() => cleanSession(userId)).to.throw(TypeError, 'userId is not a string');
    });

    it('should fail on empty user id', async () => {
        const userId = '   ';
        await expect(() => cleanSession(userId)).to.throw(ContentError, 'userId is empty');
    });

});