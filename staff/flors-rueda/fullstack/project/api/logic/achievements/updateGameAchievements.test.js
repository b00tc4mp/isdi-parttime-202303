const { expect } = require('chai');
const updateGameAchievements = require('./updateGameAchievements');
const { Achievements } = require('../../data/models');
const mongoose = require('mongoose');
const { cleanUp, generate } = require('../helpers/tests');
const {
    errors: { TypeError, ExistenceError },
} = require('com');
const achievements = require('../../data/achievements');

describe('updateGameAchievements', () => {
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

    it('should update user game achievements by id with valid userId', async () => {
        const allAchievements = achievements.map(achievement => ({ ...achievement }));

        const userId = new mongoose.Types.ObjectId();

        const userAchievements = generate.achievements(userId, allAchievements);

        await Achievements.create(userAchievements);

        const stonks = 1;
        const holes = 7;
        const bombs = 527;
        const life = 7;
        const cc = 125;

        const gameData = { stonks, holes, bombs, life, cc };

        await updateGameAchievements(userId.toString(), gameData);

        const updatedAchievements = await Achievements.findOne({ user: userId });

        const gameAchievements = updatedAchievements.progressByAchievement.filter(
            achievement => achievement.category === 'game'
        );

        expect(gameAchievements[0].code).to.equal('G01');
        expect(gameAchievements[0].progress).to.equal(1);
        expect(gameAchievements[0].isRankReached).to.equal(false);
        expect(gameAchievements[1].code).to.equal('G02');
        expect(gameAchievements[1].progress).to.equal(holes);
        expect(gameAchievements[1].isRankReached).to.equal(false);
        expect(gameAchievements[2].code).to.equal('G03');
        expect(gameAchievements[2].progress).to.equal(1);
        expect(gameAchievements[2].isRankReached).to.equal(false);
        expect(gameAchievements[3].code).to.equal('G04');
        expect(gameAchievements[3].progress).to.equal(bombs);
        expect(gameAchievements[3].isRankReached).to.equal(true);
        expect(gameAchievements[3].completed).to.equal(true);
        expect(gameAchievements[4].code).to.equal('G05');
        expect(gameAchievements[4].progress).to.equal(1);
        expect(gameAchievements[4].isRankReached).to.equal(true);
        expect(gameAchievements[4].completed).to.equal(false);
        expect(gameAchievements[5].code).to.equal('G06');
        expect(gameAchievements[5].progress).to.equal(cc);
        expect(gameAchievements[5].isRankReached).to.equal(false);
        expect(gameAchievements[5]);
    });

    it('should fail on user not found', async () => {
        const id = (new mongoose.Types.ObjectId()).toString();
        const stonks = 1;
        const holes = 7;
        const bombs = 527;
        const life = 7;
        const cc = 125;

        const gameData = { stonks, holes, bombs, life, cc };

        try {
            await updateGameAchievements(id, gameData);
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError);
            expect(error.message).to.equal('user not found');
        }
    });

    it('should fail on invalid id type', async () => {
        const invalidId = 1234;

        try {
            await updateGameAchievements(invalidId);
        } catch (error) {
            expect(error.message).to.equal('userId is not a string');
        }
    });

    it('should fail on empty id', async () => {
        const emptyId = '   ';
        try {
            await updateGameAchievements(emptyId);
        } catch (error) {
            expect(error.message).to.equal('userId is empty');
        };
    });

    it('should fail on invalid game data', async () => {
        const id = (new mongoose.Types.ObjectId()).toString();
        const gameData = 'wuut?';

        try {
            await updateGameAchievements(id, gameData);
        } catch (error) {
            expect(error.message).to.equal('game data is not a object');
        };
    });

    it('should fail on invalid stonks type', async () => {
        const id = (new mongoose.Types.ObjectId()).toString();
        const stonks = 'nope';
        const holes = 7;
        const bombs = 527;
        const life = 7;
        const cc = 125;

        const gameData = { stonks, holes, bombs, life, cc };

        try {
            await updateGameAchievements(id, gameData);
        } catch (error) {
            expect(error.message).to.equal('stonks is not a number');
        };
    });

    it('should fail on invalid holes type', async () => {
        const id = (new mongoose.Types.ObjectId()).toString();
        const stonks = 1;
        const holes = '7';
        const bombs = 527;
        const life = 7;
        const cc = 125;

        const gameData = { stonks, holes, bombs, life, cc };

        try {
            await updateGameAchievements(id, gameData);
        } catch (error) {
            expect(error.message).to.equal('holes is not a number');
        };
    });

    it('should fail on invalid bombs type', async () => {
        const id = (new mongoose.Types.ObjectId()).toString();
        const stonks = 1;
        const holes = 7;
        const bombs = '527';
        const life = 7;
        const cc = 125;

        const gameData = { stonks, holes, bombs, life, cc };

        try {
            await updateGameAchievements(id, gameData);
        } catch (error) {
            expect(error.message).to.equal('bombs is not a number');
        };
    });

    it('should fail on invalid life type', async () => {
        const id = (new mongoose.Types.ObjectId()).toString();
        const stonks = 1;
        const holes = 7;
        const bombs = 527;
        const life = '7';
        const cc = 125;

        const gameData = { stonks, holes, bombs, life, cc };

        try {
            await updateGameAchievements(id, gameData);
        } catch (error) {
            expect(error.message).to.equal('life is not a number');
        };
    });

    it('should fail on invalid cc type', async () => {
        const id = (new mongoose.Types.ObjectId()).toString();
        const stonks = 1;
        const holes = 7;
        const bombs = 527;
        const life = 7;
        const cc = '125';

        const gameData = { stonks, holes, bombs, life, cc };

        try {
            await updateGameAchievements(id, gameData);
        } catch (error) {
            expect(error.message).to.equal('cc is not a number');
        };
    });

});