const { validateToken } = require('./validators')

function extractPayloadFromToken(token) {
    return JSON.parse(atob(token.split('.')[1]))
}

function isTokenAlive(token) {
    const { iat, exp } = extractPayloadFromToken(token)
    const now = Date.now() / 1000

    return exp - iat > now - iat
}

function isTokenValid(token) {
    try {
        validateToken(token)

        return true
    } catch (_) {
        return false
    }
}

function extractSubFromToken(token) {
    const { sub } = extractPayloadFromToken(token)

    return sub
}
class TreeNode {
    constructor(id, name, value) {
        this.id = id
        this.name = name
        this.value = value
        this.children = []
    }

    getChildByValue(value) {
        return this.children.find(child => child.value === value)
    }
    getChildById(id) {
        return this.children.find(child => child.id === id)
    }
    getChildByName(name) {
        return this.children.find(child => child.name === name)
    }

    addChild(id, name, value) {
        let newNode = new TreeNode(id, name, value)
        this.children.push(newNode)
    }

}

class Tree {
    constructor() {
        this.root = null
    }

    insertByNamePath(id, name, value, path) {
        let selectedNode = this.selectByNamePath(path)

        if (selectedNode) {
            selectedNode.addChild(id, name, value)
        } else {
            throw new Error("Not found any node with value:", path)
        }
    }
    insertByIdPath(id, name, value, path) {
        let selectedNode = this.selectByIdPath(path)

        if (selectedNode) {
            selectedNode.addChild(id, name, value)
        } else {
            throw new Error(`Not found any node with value: ${path}`)
        }
    }

    selectByValuePath(path) {
        if (path == undefined) {
            return this.root
        }

        let selectedNode = this.root
        let pathArr = path.split("/")

        for (let index = 0; index <= pathArr.length - 1; index++) {
            selectedNode = selectedNode?.getChildByValue(pathArr[index])
        }

        return selectedNode
    }
    selectByIdPath(path) {
        if (path == undefined) {
            return this.root
        }

        let selectedNode = this.root
        let pathArr = path.split("/")

        for (let index = 0; index <= pathArr.length - 1; index++) {
            selectedNode = selectedNode?.getChildById(pathArr[index])
        }

        return selectedNode
    }
    selectByNamePath(path) {
        if (path == undefined) {
            return this.root
        }

        let selectedNode = this.root
        let pathArr = path.split("/")

        for (let index = 0; index <= pathArr.length - 1; index++) {
            selectedNode = selectedNode?.getChildByName(pathArr[index])
        }

        return selectedNode
    }
}
module.exports = {
    isTokenAlive,
    isTokenValid,
    extractSubFromToken,
    Tree,
    TreeNode

}