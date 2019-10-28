const express = require('express');
const router = express.Router();
const List = require('../models/lists.js');
const Group = require('../models/groups.js');


//need to think about if this file needs to be relational
//ex: const name = require('../models/name.js');
//need routes

//LIST INDEX   MIKE
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

//LIST NEW   MIKE
router.get('/new', async (req, res) => {
    try {
        const allGroups = await Group.find()
        res.render('lists/new.ejs', {
            groups: allGroups
        });
    } catch (err) {
        res.send(err);
    }
});

//LIST SHOW    MIKE come back
router.get('/:id', async (req, res) => {
    try {
        const foundGroup = await Group.findOne({ 'lists': req.params.id })
            .populate(
                {
                    path: 'lists',
                    match: { _id: req.params.id }
                })
            .exec()
            res.render('lists/show.ejs', {
                list: foundGroup.lists[0],
                group: foundGroup
            })



                //sierras
        // const foundList = await List.findById(req.params.id);
        // List.items
    } catch (err) {
        res.send(err);
    }
});
//LIST CREATE   MIKE
router.post('/', async (req, res) => {
    try {

        //sierras
        const trimmedItems = req.body.items.replace(/\s+/g, '');
        // console.log(trimmedItems);
        const separatedItems = trimmedItems.split(',');
        // console.log()
        const newList = {
            title: req.body.title,
            items: separatedItems,
            dueDate: req.body.dueDate
        };
        const createdList = await List.create(newList);

        const foundGroup = await Group.findById(req.body.groupId);

        foundGroup.lists.push(createdList)
        await foundGroup.save();
        console.log(foundGroup)
        res.redirect('/lists');
    } catch (err) {
        res.send(err);
    }
    
   
});

//LIST EDIT
router.get('/:id/edit', async (req, res) => {
    try {
        const foundList = await List.findById(req.params.id);
        res.render('lists/edit.ejs', {
            list: foundList
        });
        console.log(foundList);
    } catch (err) {
        res.send(err);
    }
});

//LIST UPDATE
router.put('/:id', async (req, res) => {
    try {
    const trimmedItems = req.body.items.replace(/\s+/g, '');
    console.log(trimmedItems);
    const separatedItems = trimmedItems.split(',');
    console.log()
    const newList = {
            title: req.body.title,
            items: separatedItems,
            dueDate: req.body.dueDate
    }
    const updatedList = await List.findByIdAndUpdate(req.params.id, newList, {new: true}, (err, updatedList) => {
    res.redirect('/lists')
    });
    } catch (err) {
        res.send(err);
    }
});

//LIST DELETE
router.delete('/:id', async (req, res) => {
    try {
        const deletedList = await List.findByIdAndRemove(req.params.id);
        res.redirect('/lists');
    } catch (err) {
        res.send(err);
    }
});

module.exports = router;
