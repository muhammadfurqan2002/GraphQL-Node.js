import dotenv from 'dotenv'
dotenv.config();
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import {schema} from './schema/index.js';
import mongoose from 'mongoose';
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Mongoose connected");
}).catch(()=>{
    console.log("Failed to connect mongoose")
});

const app=express();

//any name of route
app.use("/graphql",graphqlHTTP({
    schema,
    graphiql:true
}));





app.listen(4000,()=>{
    console.log(`Server is running on port 4000`)
})