import mongoose from "mongoose";

const categorySchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    // Self Referencing Relationship
    parentCategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        default:null
    }
})

const categoryModel=mongoose.model("Category",categorySchema);


export default categoryModel;