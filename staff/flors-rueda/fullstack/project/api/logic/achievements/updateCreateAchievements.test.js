const { expect } = require('chai');
const updateCreateAchievements = require('./updateCreateAchievements');
const { Achievements } = require('../../data/models');
const mongoose = require('mongoose');
const { cleanUp, generate } = require('../helpers/tests');
const {
    errors: { TypeError, ExistenceError },
} = require('com');
const achievements = require('../../data/achievements');

describe('updateCreateAchievements', () => {
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

    it('should update user create achievements by id with valid userId', async () => {
        const allAchievements = achievements.map(achievement => ({ ...achievement }));

        const userId = new mongoose.Types.ObjectId();

        const userAchievements = generate.achievements(userId, allAchievements);

        await Achievements.create(userAchievements);

        const bombs = 7;
        const life = 67;
        const floors = 99;

        const createData = { bombs, life, floors };

        await updateCreateAchievements(userId.toString(), createData);

        const updatedAchievements = await Achievements.findOne({ user: userId });

        const gameAchievements = updatedAchievements.progressByAchievement.filter(
            achievement => achievement.category === 'create'
        );

        expect(gameAchievements[0].code).to.equal('C01');
        expect(gameAchievements[0].progress).to.equal(1);
        expect(gameAchievements[0].isRankBronzeReached).to.equal(true);
        expect(gameAchievements[1].code).to.equal('C02');
        expect(gameAchievements[1].progress).to.equal(bombs);
        expect(gameAchievements[1].isRankBronzeReached).to.equal(false);
        expect(gameAchievements[2].code).to.equal('C03');
        expect(gameAchievements[2].progress).to.equal(life);
        expect(gameAchievements[2].isRankBronzeReached).to.equal(true);
        expect(gameAchievements[3].code).to.equal('C04');
        expect(gameAchievements[3].progress).to.equal(1);
        expect(gameAchievements[3].isRankBronzeReached).to.equal(true);
        expect(gameAchievements[3].isRankGoldReached).to.equal(true);
    });

    it('should fail on user not found', async () => {
        const id = (new mongoose.Types.ObjectId()).toString();
        const bombs = 7;
        const life = 67;
        const floors = 99;

        const createData = { bombs, life, floors };

        try {
            await updateCreateAchievements(id, createData);
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError);
            expect(error.message).to.equal('user not found');
        }
    });

    it('should fail on invalid id type', async () => {
        const invalidId = 1234;

        try {
            await updateCreateAchievements(invalidId);
        } catch (error) {
            expect(error.message).to.equal('userId is not a string');
        }
    });

    it('should fail on empty id', async () => {
        const emptyId = '   ';
        try {
            await updateCreateAchievements(emptyId);
        } catch (error) {
            expect(error.message).to.equal('userId is empty');
        };
    });

    it('should fail on invalid create data', async () => {
        const id = (new mongoose.Types.ObjectId()).toString();
        const createData = 'wuut?';

        try {
            await updateCreateAchievements(id, createData);
        } catch (error) {
            expect(error.message).to.equal('create data is not a object');
        }
    });

    it('should fail on invalid bombs type', async () => {
        const id = (new mongoose.Types.ObjectId()).toString();
        const bombs = '7';
        const life = 67;
        const floors = 99;

        const createData = { bombs, life, floors };

        try {
            await updateCreateAchievements(id, createData);
        } catch (error) {
            expect(error.message).to.equal('bombs is not a number');
        }
    });

    it('should fail on invalid life type', async () => {
        const id = (new mongoose.Types.ObjectId()).toString();
        const bombs = 7;
        const life = '67';
        const floors = 99;

        const createData = { bombs, life, floors };

        try {
            await updateCreateAchievements(id, createData);
        } catch (error) {
            expect(error.message).to.equal('life is not a number');
        }
    });

    it('should fail on invalid floors type', async () => {
        const id = (new mongoose.Types.ObjectId()).toString();
        const bombs = 7;
        const life = 67;
        const floors = '99';

        const createData = { bombs, life, floors };

        try {
            await updateCreateAchievements(id, createData);
        } catch (error) {
            expect(error.message).to.equal('floors is not a number')
        };
    });

});