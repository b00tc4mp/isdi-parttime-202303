const { expect } = require('chai');
const authenticateAdministrator = require('./authenticateAdmin');
const { Administrator } = require('../../data/models');
const mongoose = require('mongoose');
const { cleanUp, generate } = require('../helpers/tests');
require('dotenv').config()
const {
    errors: { AuthError, ContentError, ExistenceError, FormatError }
} = require('com');
const bcrypt = require('bcryptjs');
const authenticateAdmin = require('./authenticateAdmin');

describe('authenticateAdmin', () => {
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

    it('should login a Administrator with correct credentials', async () => {

        const admin = generate.Administrator();

        await Administrator.create(admin);

        const adminId = await authenticateAdmin(admin.email, 'password');

        expect(adminId).to.be.a('string').and.not.empty;
    });

    it('should fail on Administrator not found', async () => {
        const adminName = `Administrator${Math.floor(Math.random() * 999)}`;
        const email =`${adminName}@${adminName}.com`
        const password = `Password${Math.random()}`;
        

        try {
            await authenticateAdmin(email, password);
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError);
            expect(error.message).to.equal('user not found');
        }
    });

    it('should fail on wrong credentials', async () => {
        const admin = generate.Administrator();

        await Administrator.create(admin);


        try {
            await authenticateAdmin(admin.email, 'wrongpassword');
        } catch (error) {
            expect(error).to.be.instanceOf(AuthError);
            expect(error.message).to.equal('wrong credentials');
        }
    });

    it('should fail on invalid email type', async () => {
        const password = `Password${Math.random()}`;
        const email =Math.floor(Math.random() * 999);

        await expect(() => authenticateAdmin(email, password)).to.throw(TypeError, 'email is not a string');
    });


    it('should fail on empty email', async () => {
        const password = `Password${Math.random()}`;
        const email =''

        await expect(() => authenticateAdmin(email, password)).to.throw(ContentError, 'email is empty');
    });

    it('should fail on incorrect email format', async () => {
        const adminName = `Administrator${Math.floor(Math.random() * 999)}`;
        const password = `Password${Math.random()}`;
        const email =`${adminName}${adminName}.com`


        await expect(() => authenticateAdmin(email, password)).to.throw(FormatError, 'email is no valid');
    });

    it('should fail on invalid password type', async () => {
        const adminName = `Administrator${Math.floor(Math.random() * 999)}`;
        const password = Math.random();
        const email =`${adminName}@${adminName}.com`

        await expect(() => authenticateAdmin(email, password)).to.throw(TypeError, 'password is not a string');
    });

    it('should fail on password too short', async () => {
        const adminName = `Administrator${Math.floor(Math.random() * 999)}`;
        const password = '';
        const email =`${adminName}@${adminName}.com`

        await expect(() => authenticateAdministrator(email, password)).to.throw(RangeError, 'password length lower than 8 characters');
    });
});