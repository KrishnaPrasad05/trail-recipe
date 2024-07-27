const Recipe = require('../models/Recipe')
const Comment = require('../models/Comment')

exports.addComment= async(req,res)=>{
    try{
       
        //extracting dataFields from body
        const {userName,comment}= req.body;

         //extracting id from params
         const {recipeId}= req.params;

        //checking if any field is missed
        if(!userName || !comment){
            res.status(500).json({message:'Fill all the required fields'})
        }

        //creating new data
        const newComment = new Comment({
            recipeId,userName,comment
        })

        //saving created data
        const savedComment = await newComment.save()

        //updating comment to existing recipe schema
        await Recipe.findByIdAndUpdate(recipeId,{$push:{comments: savedComment._id}})
        res.status(201).json(savedComment) //201 for creation of new data
    }
    catch(error){
        console.log("Error creating new recipe", error)
        res.status(500).json({message:'Internal server error'}) //500 for server fails to handle
    }
}

exports.getComments = async(req,res)=>{
    try{
        const {recipeId}= req.params;

        //sort for displaying newly added comment at top
        const comments = await Comment.find({ recipeId }).sort({ createdAt: -1 });
        res.status(200).json(comments)
    }
    catch(error){
        console.log("Error creating new recipe", error)
        res.status(500).json({message:'Internal server error'})
    }
}