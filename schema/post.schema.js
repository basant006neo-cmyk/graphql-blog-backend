import { gql } from "apollo-server";

export default gql`
  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
    createdAt: String
  }

  extend type Query {
    posts(page: Int, limit: Int): [Post]
    post(id: ID!): Post
  }

  extend type Mutation {
    createPost(title: String!, content: String!): Post
  }
`;
