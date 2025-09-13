import {GraphQLObjectType,GraphQLID,GraphQLString,GraphQLList, GraphQLNonNull, GraphQLBoolean, GraphQLInt} from 'graphql'
import bookType from './bookType.js';

const bookPaginationType=new GraphQLObjectType({
    name:"BookPagination",
    fields:()=>({
        books:{
            type: GraphQLList(bookType),
        },
        totalPages:{
            type: GraphQLInt,
        },
        currentPage:{
            type: GraphQLInt,
        },
        hasNextPage:{
            type:GraphQLString
        },
        hasPreviousPage:{
            type:GraphQLString
        }
    })
})


export default bookPaginationType;