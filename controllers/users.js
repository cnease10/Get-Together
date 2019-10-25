const express = require('express');
const router = express.Router();
const User = require("../models/users");
const bcrypt = require("bcryptjs")


router.post('/registration', async (req, res) => {
    const password = req.body.password;
    const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    const newUser = {};
    newUser.username = req.body.username;
    newUser.password = passwordHash;
    newUser.email = req.body.email;

    const createdUser = await User.create(newUser);
    console.log(`Created User ==>`,createdUser)
    req.session.username = createdUser.username;
    req.session.logged = true;

    res.redirect('/groups')
})
 


module.exports = router;
