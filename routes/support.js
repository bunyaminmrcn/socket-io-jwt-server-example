const express = require('express');
const router = express.Router();
const { Message } = require('../models');
const ee = require('../shared-ee');
const moment = require('moment')


router.route('/new_message').post(async function(req, res, next) {

    try {
        const { from_user, to_user, body, ticketId, socketId, mySocketId } = req.body;
        let now = moment().add(3, 'hours').toISOString().substring(0, 19)
        const message = await Message.create({
            from_user, to_user, ticketId, body,createdAt: now, updatedAt: now
        })

        ee.emit('post:message:to', { to: socketId, payload: message.toJSON()})
        ee.emit('post:message:to', { to: mySocketId, payload: message.toJSON()})

        return res.json({ data: message })
    } catch (error) {
        return res.status(422).json({})
    }
});

module.exports = router;