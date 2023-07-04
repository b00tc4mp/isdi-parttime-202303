const a = function () { }
const b = function () { }

const lib = { a, b }

// with iife

const lib = (() => {
    const a = function () { }
    const b = function () { }

    return { a, b }
})()