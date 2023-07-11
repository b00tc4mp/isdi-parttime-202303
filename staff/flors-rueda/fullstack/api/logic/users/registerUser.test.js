require('dotenv').config();
const { expect } = require('chai')
const { readFile, writeFile } = require('fs')
const registerUser = require('./registerUser')

describe('registerUser', () => {
    beforeEach(done => writeFile('./data/users.json', '[]', 'utf8', error => done(error)))

    it('should succeed on new user', done => {
        const username = `name${Math.floor(Math.random() * (100))}`;
        const mail = `e-${Math.random()}@mail.com`;
        const password = `Password${Math.random()}`;
        const repeatPassword = password;

        registerUser(mail, username, password, repeatPassword, error => {
            expect(error).to.be.null

            readFile('./data/users.json', 'utf8', (error, json) => {
                expect(error).to.not.be.instanceOf(Error);

                const users = JSON.parse(json);

                let user = users.find(user => user.mail === mail);

                expect(user).to.exist;
                expect(user.id).to.be.a('string');
                expect(user.name).to.equal(username);
                expect(user.username).to.equal(`@${username.toLowerCase()}`);
                expect(user.mail).to.equal(mail);
                expect(user.password).to.equal(password);
                expect(user.joined).to.be.closeTo(Date.now(), 1000);
                expect(user.favs).to.have.lengthOf(0);

                done();
            })
        })
    })

    it('should fail on existing user mail', done => {
        const username = `name${Math.floor(Math.random() * (100))}`;
        const mail = `e-${Math.random()}@mail.com`;
        const password = `Password${Math.random()}`;
        const repeatPassword = password;

        const users = [{ username, mail, password }]
        const json = JSON.stringify(users)

        writeFile('./data/users.json', json, 'utf8', error => {
            expect(error).to.be.null

            registerUser(mail, username, password, repeatPassword, error => {
                expect(error).to.be.instanceOf(Error);
                expect(error.message).to.equal(`user with mail ${mail} already exists`);

                done();
            })
        })
    })

    it('should fail on existing user username', done => {
        const username = `name${Math.floor(Math.random() * (100))}`;
        const mail = `e-${Math.random()}@mail.com`;
        const password = `Password${Math.random()}`;
        const repeatPassword = password;

        const users = [{ username: `@${username.toLowerCase()}`, password }]
        const json = JSON.stringify(users)

        writeFile('./data/users.json', json, 'utf8', error => {
            expect(error).to.be.null;

            registerUser(mail, username, password, repeatPassword, error => {
                expect(error).to.be.an.instanceOf(Error);
                expect(error.message).to.equal(`user with username ${username} already exists`);

                done();
            })
        })
    })

    it('should fail on invalid mail format', () =>
        expect(() => registerUser('notamail', 'testusername', 'Password123', 'Password123', () => { })).to.throw(Error, 'mail format is not valid')
    )

    it('should fail on empty mail', () =>
        expect(() => registerUser('  ', 'testusername', 'Password123', 'Password123', () => { })).to.throw(Error, 'mail is empty')
    )

    it('should fail on invalid mail type', () =>
        expect(() => registerUser(1234, 'testusername', 'Password123', 'Password123', () => { })).to.throw(Error, 'mail is not an string')
    )

    it('should fail on empty username', () =>
        expect(() => registerUser('test@mail.com', '  ', 'Password123', 'Password123', () => { })).to.throw(Error, 'username is empty')
    )

    it('should fail on invalid username type', () =>
        expect(() => registerUser('test@mail.com', 1234, 'Password123', 'Password123', () => { })).to.throw(Error, 'username is not a string')
    )

    it('should fail on invalid password type', () =>
        expect(() => registerUser('test@mail.com', 'testusername', 1234, 'Password123', () => { })).to.throw(Error, 'password is not a string')
    )

    it('should fail on empty password', () =>
        expect(() => registerUser('test@mail.com', 'testusername', '  ', 'Password123', () => { })).to.throw(Error, 'password is empty')
    )

    it('should fail on invalid repeat password type', () =>
        expect(() => registerUser('test@mail.com', 'testusername', 'Password123', 1234, () => { })).to.throw(Error, 'password is not a string')
    )

    it('should fail on empty repeat password', () =>
        expect(() => registerUser('test@mail.com', 'testusername', 'Password123', '  ', () => { })).to.throw(Error, 'password is empty')
    )

    it('should fail on different password and repeat password', () =>
        expect(() => registerUser('test@mail.com', 'testusername', 'Password123', 'NotPassword1', () => { })).to.throw(Error, 'password and confirmation password are different')
    )

    it('should fail on invalid callback', () =>
        expect(() => registerUser('test@mail.com', 'testusername', 'Password123', 'Password123', '() => { }')).to.throw(Error, 'callback is not a function')
    )


    after(done => writeFile('./data/users.json', '[]', 'utf8', error => done(error)))
})