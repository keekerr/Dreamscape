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
                    imageID
                    imageLink    
                }
                diaryEntries {
                    entryID
                    title
                    entry
                    createdAt
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
                entryID
                title
                entry
                createdAt
            }
        }
    }
`;

export const EDIT_ENTRY = gql`
    mutation editEntry($entryID: ID!) {
        editEntry(entryID: $entryID) {
            _id
            username
            diaryEntries {
                entryID
                title
                entry
                createdAt
            }
        }
    }
`;

export const REMOVE_ENTRY = gql`
    mutation removeEntry($entryID: ID!) {
        removeEntry(entryID: $entryID) {
            _id
            username
            diaryEntries {
                entryID
                title
                entry
                createdAt
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
                imageID
                imageLink
            }
        }
    }
`;

export const REMOVE_IMAGE = gql`
    mutation removeImage($imageID: ID!) {
        removeImage(imageID: $imageID) {
            _id
            username
            images {
                imageID
                imageLink
            }
        }
    }
`;