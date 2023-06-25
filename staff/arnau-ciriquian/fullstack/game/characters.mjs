//CHARACTER MANAGEMENT
class Character {
    constructor(icon, name) {
        this.icon = icon
        this.name = name
    }
}

export class Warrior extends Character {
    super() {
        this.dmg = 100
        this.heal = 50
        this.hp = 500
    }

    attack() {
        this.dmg += Math.round(20 * (1 - Math.random()))
        return this.dmg
    }

    specialAttack() {
        this.dmg += Math.round(20 * (1 - Math.random()))
        return this.dmg * 2
    }

    healHp() {
        this.heal += Math.round(50 * (1 - Math.random()))
        return this.heal
    }

    reset(stat) {
        if (stat === 'damage') this.dmg = 100
        if (stat === 'heal') this.heal = 50
        if (stat === 'hp') this.hp = 500
    }
}