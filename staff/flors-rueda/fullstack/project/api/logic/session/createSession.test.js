const { expect } = require('chai');
const createSession = require('./createSession');
const { Session } = require('../../data/models');
const mongoose = require('mongoose');
const { cleanUp, generate } = require('../helpers/tests');
const {
    errors: { ContentError },
} = require('com');

describe('createSession', () => {
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

    it('should create a new session (if userId does not have one) and add the new id', async () => {
        const socketId = `id${Math.floor(Math.random() * 999)}`;
        const userId = new mongoose.Types.ObjectId();
        const date = Date.now();

        await createSession(userId.toString(), socketId);

        const createdSession = await Session.findOne({ user: userId });

        expect(createdSession.sessions).to.be.an('array');
        expect(createdSession.sessions[0]).to.be.an('object');
        expect(createdSession.sessions[0].socketId).to.equal(socketId);
        expect(createdSession.sessions[0].date.getTime()).to.be.closeTo(date, 10000);
    });

    it('should find the user id session if it does exist and add the new id', async () => {
        const socketId = `id${Math.floor(Math.random() * 999)}`;
        const socketId2 = `id2${Math.floor(Math.random() * 999)}`;
        const socketId3 = `id${Math.floor(Math.random() * 999)}`;
        const userId = new mongoose.Types.ObjectId();
        const date = Date.now();
        const oldSessions = [{ socketId: socketId2, date: date }, { socketId: socketId3, date: date }];

        const session = generate.session(userId, oldSessions);

        await Session.create(session);

        await createSession(userId.toString(), socketId);

        const createdSession = await Session.findOne({ user: userId });

        expect(createdSession.sessions).to.be.an('array');
        expect(createdSession.sessions.length).to.equal(3);
        expect(createdSession.sessions[2]).to.be.an('object');
        expect(createdSession.sessions[2].socketId).to.equal(socketId);
        expect(createdSession.sessions[2].date.getTime()).to.be.closeTo(date, 10000);
    });

    it('should fail on invalid user id type', async () => {
        const socketId = `id${Math.floor(Math.random() * 999)}`;
        const userId = new mongoose.Types.ObjectId();

        await expect(() => createSession(userId, socketId)).to.throw(TypeError, 'userId is not a string');
    });

    it('should fail on empty user id', async () => {
        const socketId = `id${Math.floor(Math.random() * 999)}`;
        const userId = '   ';

        await expect(() => createSession(userId, socketId)).to.throw(ContentError, 'userId is empty');
    });

    it('should fail on invalid user id type', async () => {
        const socketId = Math.floor(Math.random() * 999);
        const userId = (new mongoose.Types.ObjectId()).toString();

        await expect(() => createSession(userId, socketId)).to.throw(TypeError, 'socketId is not a string');
    });

    it('should fail on empty socket id', async () => {
        const socketId = `  `;
        const userId = (new mongoose.Types.ObjectId()).toString();

        await expect(() => createSession(userId, socketId)).to.throw(ContentError, 'socketId is empty');
    });

});