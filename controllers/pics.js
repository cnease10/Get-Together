const express = require('express');
const router = express.Router();
const Pic = require('../models/pics.js');
const Group = require('../models/groups.js');

//WIP
//Pics INDEX   
router.get('/', async (req, res) => {
    try {
        const foundPics = await Pic.find({});
        res.render('pics/index.ejs', {
            pic: foundPics
        });
    } catch (err) {
        res.send(err);
    }
});

//Pics NEW   
router.get('/new', async (req, res) => {
    try {
        const allGroups = await Group.find()
        res.render('pics/new.ejs', {
            groups: allGroups
        });
    } catch (err) {
        res.send(err);
    }
});

//LIST SHOW     DONT NEED??  need updating
// router.get('/:id', async (req, res) => {
//     try {
//         const foundGroup = await Group.findOne({ 'lists': req.params.id })
//             .populate(
//                 {
//                     path: 'lists',
//                     match: { _id: req.params.id }
//                 })
//             .exec()
//         res.render('lists/show.ejs', {
//             list: foundGroup.lists[0],
//             group: foundGroup
//         })
//     } catch (err) {
//         res.send(err);
//     }
// });

//Pic CREATE   
router.post('/', async (req, res) => {
    try {
        const createdPic = await Pic.create(req.body);
        console.log(`CREATED PIC`, createdPic)

        const foundGroup = await Group.findById(req.body.groupId);
        foundGroup.pics.push(createdPic)
        await foundGroup.save();
        console.log(`ARE THERE PICS IN THE GROUP PICS ARRAY??`, foundGroup)
        res.redirect('/pics');
    } catch (err) {
        res.send(err);
    }
});

//LIST EDIT   NEED??  needs updating
// router.get('/:id/edit', async (req, res) => {
//     try {
//         const allGroups = await Group.find({})

//         const foundListGroup = await Group.findOne({ 'lists': req.params.id })
//             .populate({ path: 'lists', match: { _id: req.params.id } })
//             .exec()
//         res.render('lists/edit.ejs', {
//             list: foundListGroup.lists[0],
//             groups: allGroups,
//             listGroup: foundListGroup
//         });
//         // const foundList = await List.findById(req.params.id);
//         // res.render('lists/edit.ejs', {
//         //     list: foundList
//         // });
//         // console.log(foundList);
//     } catch (err) {
//         res.send(err);
//     }
// });


//LIST UPDATE    NEED?? nnews updating
// router.put('/:id', async (req, res) => {
//     try {
//         const foundGroup = Group.findOne({ 'lists': req.params.id });
//         console.log(`FOUND GROUP`, foundGroup)

//         const trimmedItems = req.body.items.replace(/\s+/g, '');
//         console.log(`TRIMMED`, trimmedItems);
//         const separatedItems = trimmedItems.split(',');
//         const newList = {
//             title: req.body.title,
//             items: separatedItems,
//             dueDate: req.body.dueDate
//         }
//         // console.log(`NEWLIST`, newList)
//         // console.log(`REQBODY`, req.body)
//         const updatedList = List.findByIdAndUpdate(req.params.id, newList, { new: true })
//         const [updateList, findGroup] = await Promise.all([updatedList, foundGroup])
//         // console.log(`UpdateList`, updateList)
//         // console.log(`findgroup`, findGroup)

//         if (findGroup._id.toString() != req.body.groupId) {
//             findGroup.lists.remove(req.params.id);
//             await findGroup.save();
//             const newGroup = await Group.findById(req.body.groupId);
//             newGroup.lists.push(updateList);
//             const savedNewGroup = await newGroup.save();
//             res.redirect('/lists/' + req.params.id);
//         } else {
//             console.log('else statement')
//             res.redirect('/lists/' + req.params.id);
//         }
//     } catch (err) {
//         res.send(err);
//     }
// });

//Pic DELETE   
router.delete('/:id', async (req, res) => {
    try {
        const deletedPic = await Pic.findByIdAndRemove(req.params.id);
        const foundGroup = await Group.findOne({ 'pics': req.params.id });
        foundGroup.pics.remove(req.params.id);
        await foundGroup.save()
        console.log(`CHECK IF PICS GONE`, foundGroup)
        res.redirect('/pics');
    } catch (err) {
        res.send(err);
    }
});



module.exports = router;