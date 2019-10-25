const express = require('express');
const router = express.Router();
const Group = require("../models/groups");
const User = require("../models/users");

//ROUTES

//index route  DONE
router.get('/', async (req, res) => {
    try {
        const foundGroups = await Group.find({});
        res.render('groups/index.ejs', {
            groups: foundGroups
        });
    } catch (err) {
        res.send(err);
    }
});


//new route  DONE
router.get('/new', (req, res) => {
    res.render('groups/new.ejs');
});


//create route



//show route



//edit route



//update route



//destroy route





module.exports = router;
