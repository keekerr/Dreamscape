const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        images: [VisionBoard]
        diaryEntries: [Diary]
    }
    
    type VisionBoard {
        _id: ID!
        imageLink: String
        userID: User
    }
    
    type Diary {
        _id: ID!
        title: String!
        entry: String!
        createdAt: String
        userID: User
    }
    
    type Auth {
        token: ID
        user: User
    }
    
    type Query {
        user(_id: ID): User
    }

    type Mutation {
        loginUser(
            email: String!
            password: String!
        ): Auth
        createUser(
            username: String!
            email: String!
            password: String!
        ): Auth
    }
    `

module.exports = typeDefs;