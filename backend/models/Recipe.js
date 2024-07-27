const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    recipeName:{ type:String, required:true },
    recipePicture1:{ type:String, required:true },
    recipePicture2:{ type:String, required:true },
    postedBy:{ type:String, required:true },
    recipeDescription:{ type:String, required:true },
    preparationTime:{ type:String, required:true },
    cookingTime:{ type:String, required:true },
    servings:{ type:String, required:true },
    ingredients:{ type:[String], required:true },
    directions:{ type:[String], required:true },
    youtubeLink:{ type:String, required:true },
    recipeType:{ type:String, required:true },
    comments:[{ type:mongoose.Schema.Types.ObjectId, ref:'Comment' }],
    email:{ type:String, required:true}
});

const Recipe = mongoose.model('Recipe', recipeSchema)
module.exports=Recipe;