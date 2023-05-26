class Character {
    constructor(icon, name) {
        this.icon = icon
        this.name = name
    }
}

class Warrior extends Character {
    super() {
        this.dmg = 100
        this.hp = 500
    }

    attack() {
        this.dmg += Math.round(20 * (1 - Math.random()))
        return this.dmg
    }
}

const kraken = new Warrior('🦑', 'Kraken')
kraken.super()
const megalodon = new Warrior('🦈', 'Megalodon')
megalodon.super()

console.log(kraken)
console.log(megalodon.dmg)
console.log(megalodon.attack())
console.log(megalodon.dmg)
