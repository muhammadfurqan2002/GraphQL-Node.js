import mongoose from "mongoose";

const bookSchema=mongoose.Schema({
    title:String,
    authorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Author"
    }
})

const bookModel=mongoose.model("Book",bookSchema);


export default bookModel;