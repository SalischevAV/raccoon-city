import {gql} from 'apollo-boost';

export const ALL_CONTACTS = gql`
    query getAllContacts($developerUuid: String!) {
        getAllContacts(developerUuid: $developerUuid) {
            id
            name
            email
            phone
            position
        }
    }
`;

export const GET_CONTACT = gql`
    query getContact($uuid: String!) {
        getContact(uuid: $uuid) {
            id
            name
            email
            phone
            position
            responsible {
                id
                name
                role {
                    key
                    displayName
                }
            }
        }
    }
`;
