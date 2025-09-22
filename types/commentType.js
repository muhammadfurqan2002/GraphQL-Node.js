import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLUnionType,
} from "graphql";
import videoType from "./videoType.js";
import postType from "./postType.js";
import postModel from "../models/post.js";
import videoModel from "../models/video.js";

const commentableType = new GraphQLUnionType({
  name: "Commentable",
  types: [videoType, postType],
  resolveType(value) {
    if (value.url) {
      return videoType;
    }
    if (value.content) {
      return postType;
    }
    return null;
  },
});

const commentType = new GraphQLObjectType({
  name: "Comment",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    content: {
      type: GraphQLString,
    },
    commentableId: {
      type: GraphQLID,
    },
    commentableType: {
      type: GraphQLString,
    },
    commentableData: {
      type: commentableType,
      async resolve(parent) {
        if (parent.commentableType === "Post") {
          return await postModel.findById(parent.commentableId);
        }
        if (parent.commentableType === "Video") {
          return await videoModel.findById(parent.commentableId);
        }
        return null;
      },
    },
  }),
});

export default commentType;
