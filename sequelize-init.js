
const shelljs = require('shelljs')
const init = () => {
    if(shelljs.exec('npx sequelize-cli db:drop').code !== 0) {
        console.error("db:drop")
    }
    if(shelljs.exec('npx sequelize-cli db:create').code !== 0) {
        console.error("db:create")
    }
    if(shelljs.exec('npx sequelize-cli db:migrate').code !== 0) {
        console.error("db:migrate")
    }
    if(shelljs.exec('npx sequelize-cli db:seed:all').code !== 0) {
        console.error("db:seed:all")
    }
    
}

if(process.argv[1].match(__filename)) {
    init()
}

module.exports = init;