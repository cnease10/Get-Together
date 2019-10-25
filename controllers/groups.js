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


//create route DONE and pushes group into current users groups array
router.post('/', async (req, res) => {
    try {
        const findUser = await User.findOne({'username': req.session.username});
        const createGroup = await Group.create(req.body);
        findUser.groups.push(createGroup);
        await findUser.save();
        res.redirect('/groups');
    } catch (err) {
        res.send(err);
    }
});


//show route  WORKING
router.get('/:id', async (req, res) => {
    try {
        const foundUser = await User.findOne({ 'username': req.session.username })
            .populate(
                {
                    path: 'groups',
                    match: { _id: req.params.id }
                })
            .exec()
        res.render('groups/show.ejs', {
            user: foundUser,
            group: foundUser.groups[0]
        });
        console.log(foundUser)
    } catch (err) {
        res.send(err);
    }
});


//edit route



//update route



//destroy route
router.delete('/:id', async (req, res) => {
    try {
        const deleteGroup = await Group.findByIdAndRemove(req.params.id);
        const findUser = await User.findOne({ 'username': req.session.username });
        console.log(findUser, ' found user')
        findUser.groups.remove(req.params.id);
        await findUser.save()
        console.log(findUser)
        res.redirect('/groups')
    } catch (err) {
        res.send(err);
    }
});




module.exports = router;
