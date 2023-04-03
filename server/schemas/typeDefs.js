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
        entryID: ID
        title: String!
        entry: String!
        createdAt: String
    }

    input DiaryInput {
        title: String!
        entry: String!
    }
    
    input VisionBoardInput {
        imageID: ID
        imageLink: String
    }

    type Auth {
        token: ID
        user: User
    }

    type PhotoUrls {
        regular: String!
    }

    type Photo {
        id: String!
        urls: PhotoUrls!
    }
    
    type Query {
        user(_id: ID): User
        photos: [Photo!]!

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
            entryID: ID!
        ): User
        addImage(
            input: VisionBoardInput
        ): User
        removeImage(
            imageID: ID!
        ): User
    }
    `

module.exports = typeDefs;