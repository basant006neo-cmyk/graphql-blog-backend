import { gql } from "apollo-server";

export default gql`

    type AuthPayload {
        token: String!
        user: User!
    }
    
    type User {
        id: ID!
        name: String!
        email: String!
    }

    extend type Query {
        me: User!
    }

    extend type Mutation {
        register(name: String!, email: String!, password: String!): AuthPayload!
        login(email: String!, password: String!): AuthPayload!
    }

`;
