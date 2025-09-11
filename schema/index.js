import {GraphQLObjectType,GraphQLID,GraphQLString,GraphQLList,GraphQLSchema, GraphQLInputObjectType} from 'graphql'
import authorType from '../types/authorType.js'
import bookType from '../types/bookType.js'
import bookModel from '../models/book.js'
import authorModel from '../models/author.js'



const Mutation=new GraphQLObjectType({
    name:"Mutation",
    fields:{
        addAuthor:{
            type: authorType,
            args:{
                name:{type:GraphQLString},
            },
            async resolve(parent,args){
               const author=await authorModel.create({
                    name:args.name
                });
                author.save();
                return author;
            }
        },
        
        addBook:{
            type: bookType,
            args:{
                title:{type:GraphQLString},
                authorId:{type:GraphQLID}
            },
            async resolve(parent,args){
               const book= await bookModel.create({
                    title:args.title,
                    authorId:args.authorId
                });
                book.save();
                return book;
            }
        },

    }
});





const RootQUery=new GraphQLObjectType({
        name:"RootQueryType",
        fields:{
            authors:{
                type:new GraphQLList(authorType),
                resolve(){
                    const authors=authorModel.find();
                    return authors;
                }
            },
            books:{
                type:new GraphQLList(bookType),
                resolve(){
                    const books=bookModel.find();
                    return books;
                }
            }
        }
})




export const schema= new GraphQLSchema({
    query:RootQUery,
    mutation:Mutation
})
