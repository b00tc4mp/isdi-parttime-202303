require('dotenv').config();

const { expect } = require('chai');
const createLevel = require('./createLevel');
const mongoose = require('mongoose');
const { cleanUp, generate } = require('../helpers/tests');
const { errors: { ContentError, TypeError, ExistenceError }, assets: { colors } } = require('com');
const { Level, User } = require('../../data/models');

describe('createLevel', () => {
    before((done) => {
        mongoose.connect(process.env.MONGODB_URL);
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function () {
            done();
        });
    });

    afterEach(async () => {
        await cleanUp();
    })

    after(async () => {
        mongoose.connection.db.dropDatabase(function () {
            mongoose.connection.close(done);
        });
    });

    it('should create a level', async () => {
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

        await createLevel(name, layout, hp, id);

        const createdLevel = await Level.findOne({ name });

        expect(createdLevel.name).to.equal(name);
        expect(createdLevel.layout).to.deep.equal(layout);
        expect(createdLevel.hp).to.equal(hp);
        expect(createdLevel.author.toString()).to.equal(id);
        expect(createdLevel.likes).be.an('array');
        expect(createdLevel.date.getTime()).to.be.closeTo(date, 10000);
    });

    it('should fail on user not found', async () => {
        const id = (new mongoose.Types.ObjectId()).toString();
        const name = `level-${Math.random()}`;
        const layout = [['empty', 'bomb', 'hole', 'empty', 'dirt', 'bomb', 'dirt', 'empty', 'start'],
        ['life', 'bomb', 'start', 'life', 'bomb', 'empty', 'bomb', 'dirt', 'stonks'],
        ];
        const hp = 1 + Math.floor(Math.random() * 6);

        try {
            await createLevel(name, layout, hp, id);
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError);
            expect(error.message).to.equal('user not found');
        }
    });

    it('should fail on empty name', async () => {
        const name = '  ';
        const layout = [['empty', 'bomb', 'hole', 'empty', 'dirt', 'bomb', 'dirt', 'empty', 'start'],
        ['life', 'bomb', 'start', 'life', 'bomb', 'empty', 'bomb', 'dirt', 'stonks'],
        ];
        const hp = 1 + Math.floor(Math.random() * 6);
        const author = (new mongoose.Types.ObjectId()).toString()

        await expect(() => createLevel(name, layout, hp, author)).to.throw(Error, 'name is empty');
    });

    it('should fail on invalid name type', async () => {
        const name = 1234;
        const layout = [['empty', 'bomb', 'hole', 'empty', 'dirt', 'bomb', 'dirt', 'empty', 'start'],
        ['life', 'bomb', 'start', 'life', 'bomb', 'empty', 'bomb', 'dirt', 'stonks'],
        ];
        const hp = 1 + Math.floor(Math.random() * 6);
        const author = (new mongoose.Types.ObjectId()).toString()

        await expect(() => createLevel(name, layout, hp, author)).to.throw(TypeError, 'name is not a string');
    });

    it('should fail on invalid layout type', async () => {
        const name = `level-${Math.random()}`;
        const layout = `
            ['empty', 'bomb', 'hole', 'empty', 'dirt', 'bomb', 'dirt', 'empty', 'start'],
            ['life', 'bomb', 'start', 'life', 'bomb', 'empty', 'bomb', 'dirt', 'stonks'],
        `;
        const hp = 1 + Math.floor(Math.random() * 6);
        const author = (new mongoose.Types.ObjectId()).toString()

        await expect(() => createLevel(name, layout, hp, author)).to.throw(TypeError, 'layout is not an array');
    });

    it('should fail on invalid layout length', async () => {
        const name = `level-${Math.random()}`;
        const layout = [];
        const hp = 1 + Math.floor(Math.random() * 6);
        const author = (new mongoose.Types.ObjectId()).toString()

        await expect(() => createLevel(name, layout, hp, author)).to.throw(RangeError, 'layout length should be between 1 and 100');
    });

    it('should fail on invalid floor type', async () => {
        const name = `level-${Math.random()}`;
        const layout = [`'empty', 'bomb', 'hole', 'empty', 'dirt', 'bomb', 'dirt', 'empty', 'start'`, ['life', 'bomb', 'start', 'life', 'bomb', 'empty', 'bomb', 'dirt', 'stonks'],
        ];
        const hp = 1 + Math.floor(Math.random() * 6);
        const author = (new mongoose.Types.ObjectId()).toString()

        await expect(() => createLevel(name, layout, hp, author)).to.throw(TypeError, 'floor is not an array');
    });

    it('should fail on invalid floor length', async () => {
        const name = `level-${Math.random()}`;
        const layout = [['empty', 'bomb', 'hole', 'empty', 'dirt', 'bomb', 'dirt', 'empty', 'start'],
        ['start', 'life', 'bomb', 'empty', 'bomb', 'dirt', 'stonks'],
        ];
        const hp = 1 + Math.floor(Math.random() * 6);
        const author = (new mongoose.Types.ObjectId()).toString()

        await expect(() => createLevel(name, layout, hp, author)).to.throw(RangeError, 'floor length should be 9');
    });

    it('should fail on invalid floor item type', async () => {
        const name = `level-${Math.random()}`;
        const layout = [['empty', 'bomb', 'hole', 'empty', 'dirt', 'bomb', 'dirt', 'empty', 'start'],
        ['bomb', 1, 'start', 'life', 'bomb', 'empty', 'bomb', 'dirt', 'stonks'],
        ];
        const hp = 1 + Math.floor(Math.random() * 6);
        const author = (new mongoose.Types.ObjectId()).toString()

        await expect(() => createLevel(name, layout, hp, author)).to.throw(TypeError, 'floor item is not a string');
    });

    it('should fail on too many start items', async () => {
        const name = `level-${Math.random()}`;
        const layout = [['empty', 'bomb', 'start', 'hole', 'dirt', 'bomb', 'dirt', 'empty', 'start'],
        ['life', 'start', 'start', 'life', 'bomb', 'empty', 'bomb', 'dirt', 'stonks'],
        ];
        const hp = 1 + Math.floor(Math.random() * 6);
        const author = (new mongoose.Types.ObjectId()).toString()

        await expect(() => createLevel(name, layout, hp, author)).to.throw(ContentError, 'invalid start items');
    });

    it('should fail on not enough start items', async () => {
        const name = `level-${Math.random()}`;
        const layout = [['empty', 'bomb', 'dirt', 'empty', 'dirt', 'bomb', 'dirt', 'empty', 'hole'],
        ['life', 'start', 'dirt', 'life', 'bomb', 'empty', 'bomb', 'dirt', 'stonks'],
        ];
        const hp = 1 + Math.floor(Math.random() * 6);
        const author = (new mongoose.Types.ObjectId()).toString()

        await expect(() => createLevel(name, layout, hp, author)).to.throw(ContentError, 'invalid start items');
    });

    it('should fail on not enough hole items', async () => {
        const name = `level-${Math.random()}`;
        const layout = [['empty', 'bomb', 'dirt', 'empty', 'dirt', 'bomb', 'dirt', 'start', 'dirt'],
        ['life', 'start', 'dirt', 'life', 'bomb', 'empty', 'bomb', 'dirt', 'stonks'],
        ];
        const hp = 1 + Math.floor(Math.random() * 6);
        const author = (new mongoose.Types.ObjectId()).toString()

        await expect(() => createLevel(name, layout, hp, author)).to.throw(ContentError, 'invalid hole items');
    });

    it('should fail on hole items on last floor', async () => {
        const name = `level-${Math.random()}`;
        const layout = [['empty', 'bomb', 'dirt', 'empty', 'hole', 'bomb', 'dirt', 'start', 'dirt'],
        ['life', 'start', 'dirt', 'life', 'bomb', 'empty', 'bomb', 'hole', 'stonks'],
        ];
        const hp = 1 + Math.floor(Math.random() * 6);
        const author = (new mongoose.Types.ObjectId()).toString

        await expect(() => createLevel(name, layout, hp, author)).to.throw(ContentError, 'invalid hole items');
    });

    it('should fail on hole stonks in incorrect floor', async () => {
        const name = `level-${Math.random()}`;
        const layout = [['empty', 'bomb', 'dirt', 'empty', 'hole', 'bomb', 'stonks', 'start', 'dirt'],
        ['life', 'start', 'dirt', 'life', 'bomb', 'empty', 'bomb', 'hole', 'life'],
        ];
        const hp = 1 + Math.floor(Math.random() * 6);
        const author = (new mongoose.Types.ObjectId()).toString()

        await expect(() => createLevel(name, layout, hp, author)).to.throw(ContentError, 'invalid stonks items');
    });

    it('should fail on too many stonks in last floor', async () => {
        const name = `level-${Math.random()}`;
        const layout = [['empty', 'bomb', 'dirt', 'empty', 'hole', 'bomb', 'dirt', 'start', 'dirt'],
        ['life', 'start', 'dirt', 'life', 'stonks', 'empty', 'bomb', 'stonks', 'life'],
        ];
        const hp = 1 + Math.floor(Math.random() * 6);
        const author = (new mongoose.Types.ObjectId()).toString()

        await expect(() => createLevel(name, layout, hp, author)).to.throw(ContentError, 'invalid stonks items');
    });

    it('should fail on invalid hp type', async () => {
        const name = `level-${Math.random()}`;
        const layout = [['empty', 'bomb', 'hole', 'empty', 'dirt', 'bomb', 'dirt', 'empty', 'start'],
        ['life', 'bomb', 'start', 'life', 'bomb', 'empty', 'bomb', 'dirt', 'stonks'],
        ];
        const hp = 'not a number';
        const author = (new mongoose.Types.ObjectId()).toString()

        await expect(() => createLevel(name, layout, hp, author)).to.throw(TypeError, 'hp is not a number');
    });

    it('should fail on invalid hp range', async () => {
        const name = `level-${Math.random()}`;
        const layout = [['empty', 'bomb', 'hole', 'empty', 'dirt', 'bomb', 'dirt', 'empty', 'start'],
        ['life', 'bomb', 'start', 'life', 'bomb', 'empty', 'bomb', 'dirt', 'stonks'],
        ];
        const hp = 9;
        const author = (new mongoose.Types.ObjectId()).toString()

        await expect(() => createLevel(name, layout, hp, author)).to.throw(RangeError, 'invalid hp value');
    });


    it('should fail on invalid author type', async () => {
        const name = `level-${Math.random()}`;
        const layout = [['empty', 'bomb', 'hole', 'empty', 'dirt', 'bomb', 'dirt', 'empty', 'start'],
        ['life', 'bomb', 'start', 'life', 'bomb', 'empty', 'bomb', 'dirt', 'stonks'],
        ];
        const hp = 1 + Math.floor(Math.random() * 6);
        const author = 12345

        await expect(() => createLevel(name, layout, hp, author)).to.throw(TypeError, 'authorId is not a string');
    });

    it('should fail on empty id', async () => {
        const name = `level-${Math.random()}`;
        const layout = [['empty', 'bomb', 'hole', 'empty', 'dirt', 'bomb', 'dirt', 'empty', 'start'],
        ['life', 'bomb', 'start', 'life', 'bomb', 'empty', 'bomb', 'dirt', 'stonks'],
        ];
        const hp = 1 + Math.floor(Math.random() * 6);
        const author = '         '

        await expect(() => createLevel(name, layout, hp, author)).to.throw(ContentError, 'authorId is empty');
    });


});
