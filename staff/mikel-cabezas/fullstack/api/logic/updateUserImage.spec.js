const { expect } = require('chai')
const updateUserImage = require('./updateUserImage')
const { readFile, writeFile } = require('fs')

describe('updateUserImage', () => {
    let id, name, email, password, image

    beforeEach(done => {
        id = `id-${Math.random()}`
        name = `name-${Math.random()}`
        email = `e-${Math.random()}@gmail.com`
        password = `password-${Math.random()}`
        image = `https://fastly.picsum.photos/id/798/200/200.jpg`

        writeFile('./data/users.json', '[]', error => done(error))
    })

    it('update on existing user and correct id', done => {
        const users = [{ id, name, email, password, image }]
        const json = JSON.stringify(users)
        writeFile('./data/users.json', json, error => {
            expect(error).to.be.null
            console.log('IMAGE ', image)

            const newimage = 'https://fastly.picsum.photos/id/799/200/200.jpg'

            updateUserImage(id, newimage, error => {
                debugger
                expect(error).to.be.null

                readFile('./data/users.json', (error, json) => {
                    expect(error).to.be.null


                    const [{ image }] = JSON.parse(json)
                    console.log('imageE', image)

                    expect(image).to.equal(newimage)

                    done()
                })
            })
        })
    })
    it('fails on existing user but incorrect id', done => {
        const users = [{ id, name, email, password, image }]
        const json = JSON.stringify(users)

        writeFile('./data/users.json', json, error => {
            expect(error).to.be.null

            const wrongId = id + '-wrong'
            const newimage = image + '-new'

            updateUserImage(wrongId, newimage, (error, user) => {
                expect(error).to.be.null

                expect(error).to.be.instanceOf(Error)
                expect(error).to.equal(`User with id ${id} not found`)

                done()
            })
        })
    })



    after(done => writeFile('./data/users.json', '[]', error => done(error)))

})
