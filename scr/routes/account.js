const express = require('express');
const router = express.Router();

const passport = require('passport');
const jwt = require('jsonwebtoken');

const AppModel = require('../model/application');

router.post('/login', 
    passport.authenticate('local', {session: false }), 
    async (req, res, next) => {
        const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.send({ token });
    });

router.post('/register', 
    async (req, res, next) => {
        const user = new AppModel({
            name: req.body.name,
        });

        try {
            await AppModel.register(user, req.body.password);
            res.status(200).json({ status: 0 });
        }
        catch (err) {
            res.status(200).json({ status: -1 });
        }
})

module.exports = router;