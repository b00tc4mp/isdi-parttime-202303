class ObjectId {
    constructor(id) {
        this.id = id || Math.random().toString().slice(2)
    }

    toString() {
        return this.id
    }
}


class User {
    constructor(doc) {
        doc._id = new ObjectId()

        this._doc = doc
    }

    get name() {
        return this._doc.name
    }

    set name(name) {
        this._doc.name = name
    }

    get email() {
        return this._doc.email
    }

    set email(email) {
        this._doc.email = email
    }

    get password() {
        return this._doc.password
    }

    set password(password) {
        this._doc.password = password
    }
}

// demo

var user = new User({ name: 'Pepito Grillo', email: 'pepito@grillo.com', password: '123123123' })

delete user.name

console.log(user.name)

delete user._doc.name

console.log(user.name)




// VM457: 50 Pepito Grillo
// VM457: 54 undefined
// undefined
// user
// User { _doc: {… } } _doc: { email: 'pepito@grillo.com', password: '123123123', _id: ObjectId } email: (...)name: (...)password: (...)[[Prototype]]: Object