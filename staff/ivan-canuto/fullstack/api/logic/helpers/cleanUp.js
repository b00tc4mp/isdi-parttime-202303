const { writeFile } = require('fs')

module. exports = callBack => {
    writeFile(`${process.env.DB_PATH}/users.json`, '[]', error => {
        if(error) {
            callBack(error)
            
            return
        }
        
        writeFile(`${process.env.DB_PATH}/users.json`, '[]', error => callBack(error))
    })
}