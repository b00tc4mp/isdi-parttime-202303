const { expect } = require('chai');
const updateCCAchievements = require('./updateCCAchievements');
const { Achievements, User } = require('../../data/models');
const mongoose = require('mongoose');
const { cleanUp, generate } = require('../helpers/tests');
const {
    errors: { ExistenceError },
    assets: { colors }
} = require('com');
const achievements = require('../../data/achievements');

describe('updateCCAchievements', () => {
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

    it('should update user earned cc achievements by id with valid userId', async () => {
        const allAchievements = achievements.map(achievement => ({ ...achievement }));
        const username = `User${Math.floor(Math.random() * 999)}`;
        const password = `Password${Math.random()}`;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const recoveryQuestions = [
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` },
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` }
        ];
        const saves = [];

        const user = generate.user(username, password, 'beach', color, recoveryQuestions, saves, [], [], 1005, ['beach']);

        const createdUser = await User.create(user);

        const userId = createdUser._id;

        const userAchievements = generate.achievements(userId, allAchievements);

        await Achievements.create(userAchievements);

        const cc = 1005;
        const operator = '+';

        await updateCCAchievements(userId.toString(), cc, operator);

        const updatedAchievements = await Achievements.findOne({ user: userId });

        const ccAchievements = updatedAchievements.progressByAchievement.filter(
            achievement => achievement.category === 'cc'
        );

        expect(ccAchievements[0].code).to.equal('CC01');
        expect(ccAchievements[0].progress).to.equal(cc);
        expect(ccAchievements[0].isRankBronzeReached).to.equal(true);
        expect(ccAchievements[1].code).to.equal('CC02');
        expect(ccAchievements[1].progress).to.equal(0);
        expect(ccAchievements[1].isRankBronzeReached).to.equal(false);
        expect(ccAchievements[2].code).to.equal('CC03');
        expect(ccAchievements[2].progress).to.equal(0);
        expect(ccAchievements[2].isRankBronzeReached).to.equal(false);
    });

    it('should update user spending cc achievements by id with valid userId', async () => {
        const allAchievements = achievements.map(achievement => ({ ...achievement }));
        const username = `User${Math.floor(Math.random() * 999)}`;
        const password = `Password${Math.random()}`;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const recoveryQuestions = [
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` },
            { question: `question${Math.random()}`, answer: `answer${Math.random()}` }
        ];
        const saves = [];

        const user = generate.user(username, password, 'beach', color, recoveryQuestions, saves, [], [], 1005, ['beach']);

        const createdUser = await User.create(user);

        const userId = createdUser._id;

        const userAchievements = generate.achievements(userId, allAchievements);

        await Achievements.create(userAchievements);

        const cc = 1005;
        const operator = '-';

        await updateCCAchievements(userId.toString(), cc, operator);

        const updatedAchievements = await Achievements.findOne({ user: userId });

        const ccAchievements = updatedAchievements.progressByAchievement.filter(
            achievement => achievement.category === 'cc'
        );

        expect(ccAchievements[0].code).to.equal('CC01');
        expect(ccAchievements[0].progress).to.equal(0);
        expect(ccAchievements[0].isRankBronzeReached).to.equal(false);
        expect(ccAchievements[1].code).to.equal('CC02');
        expect(ccAchievements[1].progress).to.equal(cc);
        expect(ccAchievements[1].isRankBronzeReached).to.equal(true);
        expect(ccAchievements[2].code).to.equal('CC03');
        expect(ccAchievements[2].progress).to.equal(1);
        expect(ccAchievements[2].isRankBronzeReached).to.equal(true);
        expect(ccAchievements[2].isRankGoldReached).to.equal(true);
    });

    it('should fail on user not found', async () => {
        const id = (new mongoose.Types.ObjectId()).toString();
        const cc = 5005;
        const operator = '-'

        try {
            await updateCCAchievements(id, cc, operator);
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError);
            expect(error.message).to.equal('user not found');
        }
    });

    it('should fail on invalid id type', async () => {
        const invalidId = 1234;

        try {
            await updateCCAchievements(invalidId);
        } catch (error) {
            expect(error.message).to.equal('userId is not a string');
        }
    });

    it('should fail on empty id', async () => {
        const emptyId = '   ';
        try {
            await updateCCAchievements(emptyId);
        } catch (error) {
            expect(error.message).to.equal('userId is empty');
        };
    });

    it('should fail on invalid CC type', async () => {
        const id = (new mongoose.Types.ObjectId()).toString();
        const cc = '1223';
        const operator = '+';

        try {
            await updateCCAchievements(id, cc, operator);
        } catch (error) {
            expect(error.message).to.equal('cc is not a number');
        }
    });

    it('should fail on negative CC type', async () => {
        const id = (new mongoose.Types.ObjectId()).toString();
        const cc = -1223;
        const operator = '+';

        try {
            await updateCCAchievements(id, cc, operator);
        } catch (error) {
            expect(error.message).to.equal('cc value is not correct');
        }
    });

    it('should fail on invalid operator type', async () => {
        const id = (new mongoose.Types.ObjectId()).toString();
        const cc = 1223;
        const operator = 1;

        try {
            await updateCCAchievements(id, cc, operator);
        } catch (error) {
            expect(error.message).to.equal('operator is not a string');
        }
    });

    it('should fail on invalid operator', async () => {
        const id = (new mongoose.Types.ObjectId()).toString();
        const cc = 1223;
        const operator = 'x';

        try {
            await updateCCAchievements(id, cc, operator);
        } catch (error) {
            expect(error.message).to.equal('operator not correct');
        }
    });
});