import { gql } from 'apollo-server'

export default gql`
    type Comment {
        id: ID!
        text: String!
        user: User!
        post: Post!
    }

    extend type Mutation {
        addComment(postId: String!, text: String!): Comment!
    }
`