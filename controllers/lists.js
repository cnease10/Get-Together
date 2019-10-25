const express = require('express');
const router = express.Router();


//need to think about if this file needs to be relational
//ex: const name = require('../models/name.js');
//need routes

//LIST INDEX
router.get('/', (req, res) => {
    res.send('index page');
});

//LIST SHOW
router.get('/:id', (req, res) => {
    router.send('show page');
});
//LIST NEW
router.get('/new', (req, res) => {
    res.send('new page');
});

//LIST CREATE
router.post('/', (req, res) => {
    res.send('posted');
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
