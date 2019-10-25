const express = require('express');
const router = express.Router();
const List = require('../models/lists.js');
const Group = require('../models/groups.js');


//need to think about if this file needs to be relational
//ex: const name = require('../models/name.js');
//need routes

//LIST INDEX
router.get('/', async (req, res) => {
    try {
        const foundLists = await List.find({});
        res.render('lists/index.ejs', {
            list: foundLists
        });
    } catch (err) {
        res.send(err);
    }
});

//LIST NEW
router.get('/new', async (req, res) => {
    try {
        res.render('lists/new.ejs');
    } catch (err) {
        res.send(err);
    }
});

//LIST SHOW
router.get('/:id', (req, res) => {
    res.send('show page');
});
//LIST CREATE
router.post('/', async (req, res) => {
    try {
        List.create(req.body, (err, createdAuthor) => { 
            res.redirect('/lists')  
        })
    } catch (err) {
        res.send(err);
    }
});

//LIST EDIT
router.get('/:id/edit', (req, res) => {
    res.send('edit page');
});

//LIST UPDATE
router.put('/:id', (req, res) => {
    res.send('this is updated');
});

//LIST DELETE
router.delete('/', (req, res) => {
    res.send('deleted');
})

module.exports = router;
