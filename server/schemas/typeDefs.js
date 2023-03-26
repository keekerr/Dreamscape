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
        imageID: ID!
        imageLink: String

    }
    
    type Diary {
        entryID: ID!
        title: String!
        entry: String!
        createdAt: String!

    }

    input DiaryInput {
        entryID: ID!
        title: String!
        entry: String!
        createdAt: String!

    }
    
    input VisionBoardInput {
        imageID: ID!
        imageLink: String

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
        addEntry(
            input: DiaryInput
        ): User
        editEntry(
            entryID: ID!
        ): User
        removeEntry(
            _id: ID!
            entryID: ID!
        ): User
        addImage(
            input: VisionBoardInput
        ): User
        removeImage(
            _id: ID!
            imageID: ID!
        ): User
    }
    `

module.exports = typeDefs;