import {GraphQLObjectType,GraphQLID,GraphQLString,GraphQLList, GraphQLNonNull} from 'graphql'
import bookModel from '../models/book.js';
import bookType from './bookType.js';

const categoryType=new GraphQLObjectType({
    name:"Category",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        books:{
            type: new GraphQLList(bookType),
            async resolve(parent,args){
                return bookModel.find({categoryIds:parent.id})
            }
        }
    })
})


export default categoryType;