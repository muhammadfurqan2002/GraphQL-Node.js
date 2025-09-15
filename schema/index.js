import {GraphQLObjectType,GraphQLID,GraphQLString,GraphQLList,GraphQLSchema, GraphQLInputObjectType, GraphQLInt, GraphQLNonNull} from 'graphql'
import authorType from '../types/authorType.js'
import bookType from '../types/bookType.js'
import bookModel from '../models/book.js'
import authorModel from '../models/author.js'
import bookPaginationType from '../types/booksPagination.js'
import categoryType from '../types/categoryType.js'
import categoryModel from '../models/category.js'



const Mutation=new GraphQLObjectType({
    name:"Mutation",
    fields:{

        addCategory:{
            type:categoryType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString),},
                parentCategory:{type:GraphQLID}
            },
            async resolve(parent,args){
                const category=await categoryModel.create({
                    name:args.name,
                    parentCategory:args.parentCategory||null
                })
                category.save();
                return category;
            }
        },

        // addCategory:{
        //     type:categoryType,
        //     args:{
        //         name:{type:new GraphQLNonNull(GraphQLString)}
        //     },
        //     async resolve(parent,args){
        //         const category=await categoryModel.create({
        //             name:args.name
        //         })
        //         category.save();
        //         return category;
        //     }
        // },


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
                authorId:{type:GraphQLID},
                categoryIds:{type:new GraphQLList(GraphQLID)},
            },
            async resolve(parent,args){
               const book= await bookModel.create({
                    title:args.title,
                    authorId:args.authorId,
                    categoryIds:args.categoryIds
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
                // type:new GraphQLList(bookType),
                // type:new GraphQLList(bookPaginationType),
                type:bookPaginationType, // for [pagination we done these things]
                args:{
                  page:{type:GraphQLInt},
                  authorId:{type:GraphQLID},
                },
                async resolve(parent,args){
                    const limit=5;
                    const page=args.page||1;
                    const offset=(page-1)*limit;
                    const filtering={};
                    if(args.authorId){
                        filtering.authorId=args.authorId;
                    }
                    const totalCount=await bookModel.countDocuments(filtering);
                    const totalPages=Math.ceil(totalCount/limit);
                    const books=await bookModel.find(filtering).skip(offset).limit(limit);
                    return {
                        books,
                        totalPages,
                        currentPage:page,
                        hasNextPage:page<totalPages?"true":"false",
                        hasPreviousPage:page>1?"true":"false",
                    };
                }
            },
            category:{
                type:categoryType,
                args:{
                    id:{type:GraphQLID},
                },
                resolve(parent,args){
                    return categoryModel.findById(args.id);
                }
            },
            categories:{
                type:new GraphQLList(categoryType),
                resolve(parent){
                    return categoryModel.find();
                }
            }
        }
})




export const schema= new GraphQLSchema({
    query:RootQUery,
    mutation:Mutation
})
