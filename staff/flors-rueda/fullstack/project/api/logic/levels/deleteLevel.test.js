require('dotenv').config();

const { expect } = require('chai');
const { generate, cleanUp } = require('../helpers/tests');
const deleteLevel = require('./deleteLevel');
const { errors: { TypeError, ExistenceError, ContentError }, assets: { colors } } = require('com');
const mongoose = require('mongoose');
const { Level, User } = require('../../data/models');

describe('deleteLevel', () => {
    afterEach(async () => {
        await cleanUp();
    });

    it('should delete a level by id', async () => {
        const username = `User${Math.floor(Math.random() * 999)}`;
        const password = `Password${Math.random()}`;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const recoveryQuestions = [
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` },
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` }
        ];

        const user = generate.user(username, password, 'beach', color, recoveryQuestions, [], [], [], 50, ['beach']);

        const createdUser = await User.create(user);
        const id = createdUser._id.toString();

        const name = `level-${Math.random()}`;
        const layout = [['empty', 'bomb', 'hole', 'empty', 'dirt', 'bomb', 'dirt', 'empty', 'start'],
        ['life', 'bomb', 'start', 'life', 'bomb', 'empty', 'bomb', 'dirt', 'stonks'],
        ];
        const hp = 1 + Math.floor(Math.random() * 6);
        const date = Date.now();

        const levelData = generate.level(name, layout, hp, id, [], date);
        const createdLevel = await Level.create(levelData);

        await deleteLevel(id, createdLevel._id.toString());

        const deletedLevel = await Level.findById(createdLevel._id.toString());

        expect(deletedLevel).to.not.exist;
    });

    it('should fail on user not found', async () => {
        const id = (new mongoose.Types.ObjectId()).toString();

        try {
            deleteLevel(id, id);
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError);
            expect(error.message).to.equal('user not found');
        }
    });

    it('should fail on level not found', async () => {
        const id = (new mongoose.Types.ObjectId()).toString();
        const username = `User${Math.floor(Math.random() * 999)}`;
        const password = `Password${Math.random()}`;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const recoveryQuestions = [
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` },
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` }
        ];

        const user = generate.user(username, password, 'beach', color, recoveryQuestions, [], [], [], 50, ['beach']);

        const createdUser = await User.create(user);
        const userId = createdUser._id.toString();

        try {
            await deleteLevel(userId, id);
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError);
            expect(error.message).to.equal('level not found');
        }
    });

    it('should fail on invalid id type', async () => {
        const userId = (new mongoose.Types.ObjectId()).toString();
        const invalidId = 1234;

        await expect(() => deleteLevel(userId, invalidId)).to.throw(TypeError, 'levelId is not a string');
    });

    it('should fail on empty id', async () => {
        const userId = (new mongoose.Types.ObjectId()).toString();
        const emptyId = '   ';

        await expect(() => deleteLevel(userId, emptyId)).to.throw(TypeError, 'levelId is empty');
    });


    it('should fail on invalid id type', async () => {
        const userId = 12345;
        await expect(() => deleteLevel(userId)).to.throw(TypeError, 'userId is not a string');
    });

    it('should fail on empty id', async () => {
        const userId = '         '

        await expect(() => deleteLevel(userId)).to.throw(ContentError, 'userId is empty');
    });
});
