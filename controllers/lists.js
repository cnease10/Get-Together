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
router.get('/:id', async (req, res) => {
    try {
        const foundList = await List.findById(req.params.id);
        List.items
        res.render('lists/show.ejs', {
            list: foundList
        })
    } catch (err) {
        res.send(err);
    }
});
//LIST CREATE
router.post('/', async (req, res) => {
    try {
    const trimmedItems = req.body.items.replace(/\s+/g, '');
    console.log(trimmedItems);
    const separatedItems = trimmedItems.split(',');
    console.log()
    const newList = {
        title: req.body.title,
        items: separatedItems,
        dueDate: req.body.dueDate
    };
    const createdList = await List.create(newList);
        res.redirect('/lists');
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
