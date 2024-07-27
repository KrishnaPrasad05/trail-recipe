const Recipe = require('../models/Recipe')

exports.addRecipe= async(req,res)=>{
    try{
        const {recipeName,
            recipePicture1,
            recipePicture2,
            postedBy,
            recipeDescription,
            preparationTime,
            cookingTime,
            servings,
            ingredients,
            directions,
            youtubeLink,
            recipeType,
            email} = req.body;

            if(!recipeName || !recipePicture1 || !recipePicture2 || !postedBy || !recipeDescription || !preparationTime || !cookingTime || !servings || !ingredients || !directions || !youtubeLink || !recipeType || !email){
                res.status(500).json({message:'Fill all the required fields'})
            }

            const newRecipe = new Recipe({
                    recipeName,
                    recipePicture1,
                    recipePicture2,
                    postedBy,
                    recipeDescription,
                    preparationTime,
                    cookingTime,
                    servings,
                    ingredients,
                    directions,
                    youtubeLink,
                    recipeType,
                    email
            })
            const savedRecipe = await newRecipe.save()
            res.status(201).json(savedRecipe)
    }
    catch(error){
        console.log("Error creating new recipe", error)
        res.status(500).json({message:'Internal server error'})
    }
}

exports.getRecipes= async(req,res)=>{
    try{
        const {recipeType}= req.query;
    
        let query={}

        if(recipeType){
            query.recipeType= recipeType
        }
      
        const recipes = await Recipe.find(query)
        res.status(200).json(recipes)
    }
    catch(error){
        console.log("Error creating new recipe", error)
        res.status(500).json({message:'Internal server error'})
    }
}

exports.fetchRecipes= async(req,res)=>{
    try{
        const {email}= req.query;
        const recipes = await Recipe.find({email:email})
        res.status(200).json(recipes)
    }
    catch(error){
        console.log("Error creating new recipe", error)
        res.status(500).json({message:'Internal server error'})
    }
}

exports.getRecipe= async(req,res)=>{
    try{
        const {id}=req.params;
        const recipe = await Recipe.findById(id)
        res.status(200).json(recipe)
    }
    catch(error){
        console.log("Error creating new recipe", error)
        res.status(500).json({message:'Internal server error'})
    }
}

exports.deleteRecipe= async(req,res)=>{
    try{
        const {id}=req.params;
        const recipe = await Recipe.findByIdAndDelete(id)
        res.status(200).end()
    }
    catch(error){
        console.log("Error creating new recipe", error)
        res.status(500).json({message:'Internal server error'})
    }
}
exports.updateRecipe= async(req,res)=>{
    try{
        const {id}=req.params;
        const recipe = await Recipe.findByIdAndUpdate(id,{$set:req.body},{new:true})
        res.status(200).json(recipe)
    }
    catch(error){
        console.log("Error creating new recipe", error)
        res.status(500).json({message:'Internal server error'})
    }
}