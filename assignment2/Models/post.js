const db = require("mongoose");
const Schema = db.Schema;
const ObjectId = Schema.ObjectId;

const postSchema = new Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    image:{type:String},
    user:{type:String,required:true}
})

const postModel = db.model("Post", postSchema);

module.exports = postModel;