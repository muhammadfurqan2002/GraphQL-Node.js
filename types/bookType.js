import {GraphQLObjectType,GraphQLID,GraphQLString,GraphQLList, GraphQLNonNull} from 'graphql'


const bookType=new GraphQLObjectType({
    name:"Book",
    fields:{
        id:{type:GraphQLID},
        title:{type:GraphQLString},
        authorId:{type:GraphQLID},
    }
})


export default bookType;