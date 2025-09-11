import mongoose  from "mongoose";

const userSchema=mongoose.Schema({
    name:{
        type:String,
    },
    age:{
        type:Number,
    }
})



const userModel= mongoose.model("User",userSchema);

export default userModel;