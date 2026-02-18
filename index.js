import { ApolloServer, gql } from "apollo-server";

let users = [];
let posts = [];

 
 

const typeDefs = gql`

    type User {
        id: ID!
        name: String!
    }
    
    type Post {
        id: ID!
        title: String!
        content: String!
        authorId: ID!
    }

    type Query {
     users: [User!]!  
     posts: [Post!]!
     user(id: String!): User!
    }

    type Mutation {
        createUser(name: String!): User!
        createPost(title: String!, content: String!, authorId: ID!): Post!
    }
`;

const resolvers = {
  Query: {
    users: () => {
      return users;
    },
    user:(_,{id}) => {
        return users.find(user => user.id === id)
    },
    posts: () => {
        return posts
    }
  },

  Mutation: {
    createUser: (_, { name }) => {
      const newUser = {
        id: String(users.length + 1),
        name: name,
      };

      users.push(newUser);
      return newUser;
    },
    createPost: (_, {title, content, authodId}) => {
        const newPost = {
            id: String(posts.length + 1),
            title,
            content,
            authodId
        }

        posts.push(newPost)
        return newPost
    }
  },
};

const server = new ApolloServer({ typeDefs, resolvers, cors: {
    origin: '*'
} });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
