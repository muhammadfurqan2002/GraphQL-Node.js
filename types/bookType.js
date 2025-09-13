import {GraphQLObjectType,GraphQLID,GraphQLString,GraphQLList, GraphQLNonNull} from 'graphql'
import authorType from '../types/authorType.js';
import authorModel from '../models/author.js';

const bookType=new GraphQLObjectType({
    name:"Book",
    fields:()=>({
        id:{type:GraphQLID},
        title:{type:GraphQLString},
        authorId:{type:GraphQLID},
        author:{
            type:authorType,
            resolve(parent){
                return authorModel.findById(parent.authorId);
            }
        }
    })
})


export default bookType;