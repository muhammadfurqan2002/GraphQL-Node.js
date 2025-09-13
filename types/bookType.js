import {GraphQLObjectType,GraphQLID,GraphQLString,GraphQLList, GraphQLNonNull} from 'graphql'
import authorType from '../types/authorType.js';
import authorModel from '../models/author.js';
import categoryType from './categoryType.js';
import categoryModel from '../models/category.js';

const bookType=new GraphQLObjectType({
    name:"Book",
    fields:()=>({
        id:{type:GraphQLID},
        title:{type:GraphQLString},
        authorId:{type:GraphQLID},
        author:{
            type:authorType,
            async resolve(parent){
                return authorModel.findById(parent.authorId);
            }
        },
        categories:{
            type:new GraphQLList(categoryType),
            async resolve(parent){
                return categoryModel.find({_id:{$in: parent.categoryIds}})
            }
        }
    })
})


export default bookType;