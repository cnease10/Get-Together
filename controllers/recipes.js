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




//show route   MIKE
router.get('/:id', async (req, res) => {
	try {
		const foundGroup = await Group.findOne({"recipes": req.params.id})
			.populate({
				path: "recipes",
				match: {_id: req.params.id}
			}).exec()
		res.render("recipes/show.ejs", {
			recipe: foundGroup.recipes[0],
			group: foundGroup
		})
	} catch(err) {
		res.send(err);
	}
});



//create route   MIKE
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

//delete/destroy route MIKE
router.delete('/:id', async (req, res) => {
	try {
		const deletedRecipe = await Recipe.findByIdAndRemove(req.params.id)
		const foundGroup = await Group.findOne({"recipes": req.params.id})
		foundGroup.recipes.remove(req.params.id)
		await foundGroup.save()
		console.log("Check if recipe gone", foundGroup);
		res.redirect("/recipes");
	} catch(err) {
		res.send(err);
	}
	
	
	
	
	
	
	
	// Recipe.deleteOne({_id: req.params.id}, (err, response) => {
	// 	if (err) {
	// 		res.send(err);
	// 	} else {
	// 		console.log(response);
	// 		res.redirect('/recipes')
	// 	}
	// })
})


module.exports = router;
