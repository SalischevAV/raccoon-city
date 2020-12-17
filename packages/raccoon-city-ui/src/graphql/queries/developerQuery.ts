import {gql} from 'apollo-boost';

export const DEVELOPER_DROPDOWNS = gql`
    {
        cities {
            key
            displayName
            districts {
                key
                displayName
            }
            undergroundStations {
                key
                displayName
            }
        }
    }
`;

export const GET_DEVELOPERS = gql`
    query getDevelopers {
        getDevelopers {
            id
            name
            city
            address
            emails
            receptionNumbers
            salesNumbers
            logo {
                uuid
                downloadUrl
            }
        }
    }
`;

export const GET_DEVELOPER = gql`
    query getDeveloper($uuid: String!) {
        getDeveloper(uuid: $uuid) {
            id
            name
            city
            address
            emails
            receptionNumbers
            salesNumbers
            logo {
                uuid
                downloadUrl
            }
        }
    }
`;

export const GET_DEVELOPER_APARTMENT_COMPLEXES = gql`
    query getApartmentComplexesByDeveloper($uuid: String!) {
        getApartmentComplexesByDeveloper(uuid: $uuid) {
            id
            name
            images {
                CHESS_GRID {
                    uuid
                    downloadUrl
                }
            }
            houses {
                id
                name
                images {
                    CHESS_GRID {
                        uuid
                        downloadUrl
                    }
                }
            }
        }
    }
`;

export const GET_PUBLIC_DEVELOPER_APARTMENT_COMPLEXES = gql`
    query getPublicApartmentComplexesByDeveloper($uuid: String!) {
        getApartmentComplexesByDeveloper: getPublicApartmentComplexesByDeveloper(uuid: $uuid) {
            id
            name
            images {
                CHESS_GRID {
                    uuid
                    downloadUrl
                }
            }
            houses {
                id
                name
                images {
                    CHESS_GRID {
                        uuid
                        downloadUrl
                    }
                }
            }
        }
    }
`;

export const CHECK_AMO = gql`
    query checkAmo($uuid: String!) {
        checkAmo(uuid: $uuid)
    }
`;
