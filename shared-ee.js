const events = require('events')
const ee = new events.EventEmitter()
ee.setMaxListeners(1);

module.exports = ee;