import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const CREATE_USER = gql`
    mutation createUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
                email
                images {
                    _id
                    imageLink
                    userID
                }
                diaryEntries {
                    _id
                    title
                    entry
                    createdAt
                    userID
                }
            }
        }
    }
`;

export const ADD_ENTRY = gql`
    mutation addEntry($input: DiaryInput) {
        addEntry(input: $input) {
            _id
            username
            diaryEntries {
                _id
                title
                entry
                createdAt
                userID
            }
        }
    }
`;

export const REMOVE_ENTRY = gql`
    mutation removeEntry($title: String!) {
        removeEntry(title: $title) {
            _id
            username
            diaryEntries {
                _id
                title
                entry
                createdAt
                userID
            }
        }
    }
`;

export const ADD_IMAGE = gql`
    mutation addImage($input: VisionBoardInput) {
        addImage(input: $input) {
            _id
            username
            images {
                _id
                imageLink
                userID
            }
        }
    }
`;

export const REMOVE_IMAGE = gql`
    mutation removeImage($imageLink: String!) {
        removeImage(imageLink: $imageLink) {
            _id
            username
            images {
                _id
                imageLink
                userID
            }
        }
    }
`;