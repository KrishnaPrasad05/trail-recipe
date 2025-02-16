const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    recipeId:{ type:mongoose.Schema.Types.ObjectId, ref:'Recipe', required:true},
    userName:{ type:String, required:true},
    comment:{ type:String, required:true},
    createdAt:{ type:Date, default:Date.now}
});

const Comment = mongoose.model('Comment', commentSchema)
module.exports= Comment;