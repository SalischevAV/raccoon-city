import {gql} from 'apollo-boost';

export const GET_USER_INFO = gql`
    query getUserInfo {
        getUserInfo {
            id
            name
            email
            role {
                key
                displayName
                features
            }
        }
    }
`;

export const GET_USERS = gql`
    query getUsers {
        getUsers {
            id
            name
            email
            role {
                id
                key
                displayName
                features
            }
            isDeleted
        }
    }
`;

export const GET_ROLES = gql`
    query getRoles {
        userRoles {
            id
            key
            displayName
            features
        }
    }
`;
