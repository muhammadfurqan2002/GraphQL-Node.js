import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLInputObjectType,
  GraphQLNonNull
} from "graphql";
import userModel from "../models/user.js";


const userInputType = new GraphQLInputObjectType({
  name:"UserInput",
  fields:{
    name:{type:new GraphQLNonNull(GraphQLString)},
    age:{type:GraphQLInt}
  }
})



const userType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  },
});

// it is must to have root query
const RootQuery = new GraphQLObjectType({
  //define queries and mutations here
  name: "RootQueryType", //it cannot be empty should provide name it can be any.it's query representor should be unique
  fields: {
    // all queries should must be written in fields

    users: {
      type: new GraphQLList(userType),
      resolve(parent, args) {
        // it is not necessary to use async in query it handle it by default
        return userModel.find();
      },
    },

    user: {
      type: userType,
      args: { id: { type: GraphQLString } }, // return data base on id further more can be added
      resolve(parent, args) {
        // resolve decide where to fetch data and what will return but based on type
        const user = userModel.findById(args.id);
        return user;
      },
    },
  },
});

// mutation type working

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: userType,
      args: { 
        input:{type:userInputType}
      },
      async resolve(_,{input}) {
        if(!input.name || !input.age){
            throw new Error("Please provide required fields")
        }
        const user = new userModel({
          name: input.name,
          age: input.age,
        });
        await user.save();
        return user;
      },
    },
    updateUser: {
      type: userType,
      args: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      async resolve(parent, args) {
        const user = await userModel.findByIdAndUpdate(
          args.id,
          { name: args.name, age: args.age },
          { new: true }
        );
        return user;
      },
    },
    deleteUser: {
      type: userType,
      args: { id: { type: GraphQLString } },
      async resolve(parent, args) {
        const user = await userModel.findByIdAndDelete(args.id);
        return user;
      },
    },
  },
});

export const schema = new GraphQLSchema({
  //we are register our query in Schema for use
  query: RootQuery,
  mutation: Mutation,
});
