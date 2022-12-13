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
    mutation addUser($username: String! $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }   
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($authors: [String], $title: String, $bookId: ID, $description: String, $image: String, $link: String) {
        saveBook(authors: $authors, title: $title, bookId: $bookId, description: $description, image: $image, link: $link) {
            username
            savedBooks {
                _id
                title
                bookId
                description
                image
                link
            }
        }
    } 
`;

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: ID) {
        removeBook(bookId: $bookId) {
            _id
            bookId
        }    
    }
`;