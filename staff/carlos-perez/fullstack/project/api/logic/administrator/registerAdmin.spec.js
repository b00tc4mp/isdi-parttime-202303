const { expect } = require('chai');
const { Administrator } = require('../../data/models');
const mongoose = require('mongoose');
const { cleanUp, generate } = require('../helpers/tests');
require('dotenv').config()
const {
    errors: { AuthError, ContentError, ExistenceError, FormatError, DuplicityError }
} = require('com');
const registerAdmin = require('./registerAdmin');

describe('registerAdmin', () => {
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

    it('should register an Administrator with correct credentials', async () => {

        const admin = generate.Administrator();

        await registerAdmin(admin.name, admin.email, admin.password)

        const adminFound = await Administrator.findOne({ email: admin.email });

        expect(adminFound.email).to.equal(admin.email);
    });

    it('should fail on Administrator already exists', async () => {
        const admin = generate.Administrator();

        await Administrator.create(admin);

        try {
            await registerAdmin(admin.name, admin.email, admin.password);
        } catch (error) {
            expect(error).to.be.instanceOf(DuplicityError);
            expect(error.message).to.equal('user already exists');
        }
    });



    it('should fail on incorrect name format', async () => {
        await expect(() => registerAdmin(3, 'email@email.com', 'password')).to.throw(FormatError, 'name is not a string');
    });

    it('should fail on invalid email type', async () => {
        await expect(() => registerAdmin('Name Name', 3, 'password')).to.throw(TypeError, 'email is not a string');
    });

    it('should fail on invalid password type', async () => {

        await expect(() => registerAdmin('Name Name', 'email@email.com', 3)).to.throw(TypeError, 'password is not a string');
    });
});