// $ node cp.js roadrunner.gif roadrunner-2.gif

const { readFile, writeFile } = require('fs')

// ['/bin/node', '/Users/.../cp.js', 'roadrunner.gif', 'roadrunner-2.gif']
const [, , from, to] = process.argv

console.log(process.memoryUsage())

readFile(from, (error, content) => {
    if (error) {
        console.error(error)

        return
    }

    console.log(process.memoryUsage())

    writeFile(to, content, error => {
        if (error) {
            console.error(error)

            return
        }

        console.log(process.memoryUsage())

        console.log('file copied')
    })
})