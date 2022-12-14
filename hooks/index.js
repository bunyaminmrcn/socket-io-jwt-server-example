
const rabbitHooks = require('./rabbit.hooks');

const init = async () => {
    await rabbitHooks.up();
}



module.exports = { init }