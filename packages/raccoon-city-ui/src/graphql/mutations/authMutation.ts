import {gql} from 'apollo-boost';

export const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
        }
    }
`;

export const AUTH_APP = gql`
    mutation authApp($apiKey: String!) {
        authApp(apiKey: $apiKey) {
            token
        }
    }
`;

export const CREATE_USER = gql`
    mutation createUser($userData: UserInput) {
        createUser(userData: $userData) {
            id
        }
    }
`;

export const LOGOUT = gql`
    mutation logout($key: String!) {
        logout(key: $key)
    }
`;

export const SAVE_HISTORY_EVENT = gql`
    mutation saveHistoryEvent($historyEvent: HistoryEventInput) {
        saveHistoryEvent(historyEvent: $historyEvent) {
            id
        }
    }
`;
