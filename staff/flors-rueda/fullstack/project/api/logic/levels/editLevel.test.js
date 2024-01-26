require('dotenv').config();

const { expect } = require('chai');
const { generate, cleanUp } = require('../helpers/tests');
const editLevel = require('./editLevel');
const { errors: { TypeError, ExistenceError, ContentError }, assets: { colors } } = require('com');
const mongoose = require('mongoose');
const { Level, User } = require('../../data/models');

describe('editLevel', () => {
    afterEach(async () => {
        await cleanUp();
    });

    it('should edit a level by id', async () => {
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

        const newLayout = [['life', 'bomb', 'bomb', 'empty', 'dirt', 'hole', 'dirt', 'empty', 'start'],
        ['life', 'bomb', 'start', 'life', 'bomb', 'bomb', 'life', 'dirt', 'stonks'],
        ];
        const newName = `name-${Math.random()}`;
        const newHp = 1 + Math.floor(Math.random() * 6);

        await editLevel(createdLevel._id.toString(), id, newLayout, newName, newHp);

        const editedLevel = await Level.findById(createdLevel._id.toString());

        expect(editedLevel.name).to.equal(newName);
        expect(editedLevel.layout).to.deep.equal(newLayout);
        expect(editedLevel.hp).to.equal(newHp);
        expect(editedLevel.author.toString()).to.equal(id);
        expect(editedLevel.likes).be.an('array');
        expect(editedLevel.date.getTime()).to.be.closeTo(date, 10000);
    });

    it('should fail on user not found', async () => {
        const id = (new mongoose.Types.ObjectId()).toString();
        const newLayout = [['life', 'bomb', 'bomb', 'empty', 'dirt', 'hole', 'dirt', 'empty', 'start'],
        ['life', 'bomb', 'start', 'life', 'bomb', 'bomb', 'life', 'dirt', 'stonks'],
        ];
        const newHp = 1 + Math.floor(Math.random() * 6);

        try {
            editLevel(id, id, newLayout, 'newName', newHp);
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError);
            expect(error.message).to.equal('user not found');
        }
    });

    it('should fail on level not found', async () => {
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

        const id = (new mongoose.Types.ObjectId()).toString();
        const newLayout = [['life', 'bomb', 'bomb', 'empty', 'dirt', 'hole', 'dirt', 'empty', 'start'],
        ['life', 'bomb', 'start', 'life', 'bomb', 'bomb', 'life', 'dirt', 'stonks'],
        ];
        const newHp = 1 + Math.floor(Math.random() * 6);

        try {
            editLevel(id, userId, newLayout, 'name', newHp);
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError);
            expect(error.message).to.equal('level not found');
        }
    });

    it('should fail on invalid id type', async () => {
        const userId = (new mongoose.Types.ObjectId()).toString();
        const invalidId = 1234;
        const newLayout = [['life', 'bomb', 'bomb', 'empty', 'dirt', 'hole', 'dirt', 'empty', 'start'],
        ['life', 'bomb', 'start', 'life', 'bomb', 'bomb', 'life', 'dirt', 'stonks'],
        ];
        const newHp = 1 + Math.floor(Math.random() * 6);

        await expect(() => editLevel(invalidId, userId, newLayout, 'newName', newHp)).to.throw(TypeError, 'levelId is not a string');
    });

    it('should fail on empty id', async () => {
        const userId = (new mongoose.Types.ObjectId()).toString();
        const emptyId = '   ';
        const newLayout = [['life', 'bomb', 'bomb', 'empty', 'dirt', 'hole', 'dirt', 'empty', 'start'],
        ['life', 'bomb', 'start', 'life', 'bomb', 'bomb', 'life', 'dirt', 'stonks'],
        ];
        const newName = `name-${Math.random()}`;
        const newHp = 1 + Math.floor(Math.random() * 6);

        await expect(() => editLevel(emptyId, userId, newLayout, newName, newHp)).to.throw(TypeError, 'levelId is empty');
    });


    it('should fail on invalid id type', async () => {
        const userId = 12345;
        const id = (new mongoose.Types.ObjectId()).toString();
        const newLayout = [['life', 'bomb', 'bomb', 'empty', 'dirt', 'hole', 'dirt', 'empty', 'start'],
        ['life', 'bomb', 'start', 'life', 'bomb', 'bomb', 'life', 'dirt', 'stonks'],
        ];
        const newName = `name-${Math.random()}`;
        const newHp = 1 + Math.floor(Math.random() * 6);

        await expect(() => editLevel(id, userId, newLayout, newName, newHp)).to.throw(TypeError, 'authorId is not a string');
    });

    it('should fail on empty id', async () => {
        const userId = '         '
        const id = (new mongoose.Types.ObjectId()).toString();
        const newLayout = [['life', 'bomb', 'bomb', 'empty', 'dirt', 'hole', 'dirt', 'empty', 'start'],
        ['life', 'bomb', 'start', 'life', 'bomb', 'bomb', 'life', 'dirt', 'stonks'],
        ];
        const newName = `name-${Math.random()}`;
        const newHp = 1 + Math.floor(Math.random() * 6);

        await expect(() => editLevel(id, userId, newLayout, newName, newHp)).to.throw(ContentError, 'authorId is empty');
    });
});
