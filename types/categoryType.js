import {GraphQLObjectType,GraphQLID,GraphQLString,GraphQLList, GraphQLNonNull} from 'graphql'
import bookModel from '../models/book.js';
import bookType from './bookType.js';
import categoryModel from '../models/category.js';

// const categoryType=new GraphQLObjectType({
//     name:"Category",
//     fields:()=>({
//         id:{type:GraphQLID},
//         name:{type:GraphQLString},
//         books:{
//             type: new GraphQLList(bookType),
//             async resolve(parent,args){
//                 return bookModel.find({categoryIds:parent.id})
//             }
//         },
//     })
// })

const categoryType=new GraphQLObjectType({
    name:"Category",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        //self referencing
        parentCategory:{
            type:categoryType,
            resolve(parent,args){
                return parent.parentCategory? categoryModel.findById(parent.parentCategory) :null
            }
        },
        subCategories:{
            type:new GraphQLList(categoryType),
            resolve(parent,args){
                return categoryModel.find({parentCategory:parent.id});
            }
        }
    })
})


export default categoryType;