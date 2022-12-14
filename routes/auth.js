const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const { Account } = require('../models');
const { Op } = require('sequelize');
const { check_passpord } = require('../helpers')

router.route('/login').post(async function (req, res, next) {
    let { id_, password, fetch } = req.body;
    const account = await Account.findOne({
        where: { [Op.or]: [{ email: id_ }, { phone: id_ }] }
    });

    if (account) {
        var isEqual = await check_passpord(password, account.password)
        if (isEqual) {

            let payload = {
                id: account.id,
                connect_type: 'client'
            };
            let token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: '365d'
            });
            return res.json({ data: { token, userId: account.id }, code: '1' })
        } else {
            return res.status(401).json({ code: '161' })
        }
    } else {
       return res.status(404).json({})
    }
});


module.exports = router;