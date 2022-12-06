import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($email: String!, $password: String!) {
        addUser(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }   
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($authors: [String], $title: String!, $bookID: ID!, $description: String, $image: String, $link: String) {
        saveBook(authors: $authors, title: $title, bookID: $bookID, description: $description, image: $image, link: $link) {
            username
            savedBooks {
                _id
                title
                bookID
                description
                image
                link
            }
        }
    } 
`;

export const REMOVE_BOOK = gql`
    mutation removeBook($bookID: ID!) {
        removeBook(bookID: $bookID) {
            username
            savedBooks {
                _id
                title
                bookID
                description
                image
                link
            }
        }    
    }
`;