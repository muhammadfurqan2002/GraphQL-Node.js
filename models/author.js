import mongoose from 'mongoose'

const authorSchema=mongoose.Schema({
    name:String,
})


const authorModel=mongoose.model("Author",authorSchema);


export default authorModel;