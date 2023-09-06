import { User, Workspot } from '../../../data/models'

module.exports = async function cleanUp() {
    await Promise.all([
        User.deleteMany(),
        Workspot.deleteMany(),
    ])
}

