require('dotenv').config();

const { expect } = require('chai');
const retrieveLevels = require('./retrieveLevels');
const context = require('../context');
const { MongoClient } = require('mongodb');
const { cleanUp, generate } = require('../helpers/tests');

describe('retrieveLevels', () => {
    let client;
    let db;

    before(async () => {
        client = await MongoClient.connect(process.env.MONGODB_URL);
        db = client.db();
        context.levels = db.collection('levels');
    });

    after(async () => {
        await client.close();
    });

    afterEach(async () => {
        await cleanUp();
    });

    it('should retrieve levels', async () => {
        const name = `level-${Math.random()}`;
        const layout = [
            ['empty', 'bomb', 'hole', 'empty', 'dirt', 'bomb', 'dirt', 'empty', 'start'],
            ['life', 'bomb', 'start', 'life', 'bomb', 'empty', 'bomb', 'dirt', 'stonks'],
        ];
        const id = `id-${Math.random()}`;

        const level = generate.level(name, layout, id);


        await context.levels.insertOne(level);

        const levels = await retrieveLevels();

        expect(levels).to.have.lengthOf(1);
        expect(levels[0].name).to.equal(name);
        expect(levels[0]._id).to.be.undefined;
        expect(levels[0].id).to.exist;
        expect(levels[0].id).to.be.a('string');
        expect(levels[0].id).to.equal(level._id.toString());
    });

    it('should retrieve no levels if database is empty', async () => {
        const levels = await retrieveLevels();
        expect(levels).to.have.lengthOf(0);
    });
});


