const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipes');

//need to think about if this file needs to be relational
//ex: const name = require('../models/name.js');
//need routes

//in reference to above comment, added 
//this for now:

// const User = require('..models/users');

//index route
router.get('/', (req, res) => {
	Recipe.find({}, (err, foundRecipes) => {
		if (err) {
			res.send(err);
		} else {
			res.render('recipes/index.ejs', {
				recipes: foundRecipes
			})
		}
	});
});		
	

//new route
router.get('/new', (req, res) => {
	res.render('recipes/new.ejs')
});




//show route
router.get('/recipes/:id', (req, res) => {
	Recipe.findById(req.params.id, (err, foundRecipe) => {
		if (err) {
			res.send(err);
		} else {
			console.log(foundRecipe);
			res.render('show.ejs', {
				// recipes: foundRecipe
			})
		}
	})
});

//create route
router.post('/', (req, res) => {
	console.log(req.body);
	//create new recipe
	Recipe.create(req.body, (err, createRecipe) => {
		if (err) {
			res.send(err);
		} else {
			console.log(createRecipe);
			res.redirect('/recipes')
		}
	})
});

//edit route
router.get('/:id/edit', (req, res) => {
	Recipe.findById(req.params.id, (err, foundRecipe) => {
		if (err) {
			res.send(err);
		} else {
			res.render('edit.ejs', {
				// recipes: foundRecipe
			})
		}
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
