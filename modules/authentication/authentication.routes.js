const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const passport = require('passport');
const jwt = require('./authentication.model').token;

router.post('/', passport.authenticate('local', {session: false}), function(req, res) {
    let user = req.user.toJSON();
    console.log(user);
    res.status(200).send({token: jwt.sign({
        user: {
            id: user.id,
            email: user.email,
        },
    })});
});

module.exports = router;
