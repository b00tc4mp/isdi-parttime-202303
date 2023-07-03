function ObjectId(id) {
    this.id = id || Math.random().toString().slice(2)
}

ObjectId.prototype.toString = function () {
    return this.id
}


var user = {  //new User
    _id: new ObjectId(),

    get id() {
        return this._id.toString()
    }
}

console.log(user.id)
// VM464: 18 15463813428673867