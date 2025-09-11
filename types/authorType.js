import {GraphQLObjectType,GraphQLID,GraphQLString,GraphQLList, GraphQLNonNull} from 'graphql'
import bookType from './bookType.js';
import bookModel from '../models/book.js';


const authorType=new GraphQLObjectType({
    name:"Author",
    fields:{
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        books:{
            type:new GraphQLList(bookType),
            resolve(parent){
                const books=bookModel.find({authorId:parent.id});
                return books;
            }
        }
    }
})


export default authorType;