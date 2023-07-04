var o = {
    name: 'Peter',
    surname: 'Pan',

    get fullName() {
        return `${this.name} ${this.surname}`
    },

    set fullName(fullName) {
        const [name, surname] = fullName.split(' ')

        this.name = name
        this.surname = surname
    }
}
// { name: 'Peter', surname: 'Pan' }
o.fullName
// 'Peter Pan'
o.fullName = 'Wendy Darling'
// 'Wendy Darling'
o
// { name: 'Wendy', surname: 'Darling' }