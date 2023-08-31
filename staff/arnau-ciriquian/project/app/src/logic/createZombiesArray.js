export default function createZombiesArray(numberOfZombies) {
    const zombies = []

    for (let i = 0; i < numberOfZombies; i++) {
        const threshold = Math.PI * 2.7 * 200
        const newPositionX = Math.floor(Math.random() * threshold) + 1

        const newZombie = {
            id: `ZB${i}`,
            position: [(newPositionX), 0, -200],
            visible: false,
            time: 60 + (Math.floor(Math.random() * (2*60)) + 1)
        }

        zombies.push(newZombie)
    }

    return zombies
}