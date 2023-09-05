export default function removeZombie(zombies, zombieId) {
    // gestio ERRORS!!
    console.log(zombieId)
    console.log(zombies)

    zombies.map(zombie => console.log(zombie.id))
    const zombieIndex = zombies.findIndex(zombie => zombie.id === zombieId)

    console.log(zombieIndex)

    if (zombieIndex === -1) throw new Error('Zombie not found!')

    zombies.splice(zombieIndex, 1)
}