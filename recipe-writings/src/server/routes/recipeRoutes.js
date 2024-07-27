const express = require('express')
const router = express.Router()
const {addRecipe, getRecipes, getRecipe, fetchRecipes, deleteRecipe, updateRecipe}= require('../controllers/recipeController')

router.post('/recipe',addRecipe)
router.get('/recipe',getRecipes)
router.delete('/recipe/:id',deleteRecipe)
router.put('/recipe/:id',updateRecipe)
router.get('/recipes',fetchRecipes)
router.get('/recipe/:id',getRecipe)

module.exports= router;