const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipes');
const Group = require("../models/groups")

//need to think about if this file needs to be relational
//ex: const name = require('../models/name.js');
//need routes

//in reference to above comment, added 
//this for now:

// const User = require('..models/users');

//index route   MIKE
router.get('/', async (req, res) => {
	try{
		const foundRecipes = await Recipe.find({})
		res.render("recipes/index.ejs", {
			recipes: foundRecipes
		})
	}catch(err){
		res.send(err)
	}

});		
	

//new route   MIKE
router.get('/new', async (req, res) => {
	try{
		const allGroups = await Group.find({})
		res.render('recipes/new.ejs', {
			groups: allGroups
		})
	}catch(err){
		res.send(err)
	}
});




//show route
router.get('/:id', (req, res) => {
	Recipe.findById(req.params.id, (err, foundRecipe) => {
		if (err) {
			res.send(err);
		} else {
			res.render('recipes/show.ejs', {
			recipe: foundRecipe
		});
		}	
	})
});



//create route
router.post('/', async (req, res) => {
	try {
		const createdRecipe = await Recipe.create(req.body);
		const foundGroup = await Group.findById(req.body.groupId);
		foundGroup.recipes.push(createdRecipe);
		await foundGroup.save();
		console.log(foundGroup);
		res.redirect('/recipes');
	} catch(err) {
		res.send(err);
	}
});


	// console.log(req.body);
	// //create new recipe
	// Recipe.create(req.body, (err, createRecipe) => {
	// 	if (err) {
	// 		res.send(err);
	// 	} else {
	// 		console.log(createRecipe);
	// 		res.redirect('/recipes')
	// 	}
	// })




//edit route
router.get('/:id/edit', (req, res) => {
	Recipe.findById(req.params.id, (err, foundRecipe) => {
			res.render('recipes/edit.ejs', {
				recipe: foundRecipe
			})
		})
	});


//update route
router.put('/:id', (req, res) => {
	console.log(req.body)

	Recipe.findByIdandUpdate(
		req.params.id,
		req.body,
		{new: true},
		(err, updatedRecipe) => {
			if(err) {
				res.send(err);
			} else {
				console.log(updatedRecipe);
				res.redirect('/recipes')
			}
		})
})

//delete/destroy route
router.delete('/:id', (req, res) => {
	Recipe.deleteOne({_id: req.params.id}, (err, response) => {
		if (err) {
			res.send(err);
		} else {
			console.log(response);
			res.redirect('/recipes')
		}
	})
})


module.exports = router;
