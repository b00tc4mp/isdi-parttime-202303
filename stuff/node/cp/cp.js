// $ node cp.js roadrunner.gif roadrunner-2.gif

const { createReadStream, createWriteStream } = require('fs')

// ['/bin/node', '/Users/.../cp.js', 'roadrunner.gif', 'roadrunner-2.gif']
const [, , from, to] = process.argv

console.log(process.memoryUsage())

const rs = createReadStream(from)
const ws = createWriteStream(to)

//rs.on('data', chunk => ws.write(chunk))
rs.pipe(ws)

rs.on('end', () => console.log(process.memoryUsage()))