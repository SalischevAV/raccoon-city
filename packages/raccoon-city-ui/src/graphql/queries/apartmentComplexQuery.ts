import {gql} from 'apollo-boost';

export const ALL_APARTMENT_COMPLEXES = gql`
    query getAllApartmentComplexes($developerUuid: String!) {
        getAllApartmentComplexes(developerUuid: $developerUuid) {
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
`;

export const APARTMENT_COMPLEX_DROPDOWNS = gql`
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
        apartmentComplexClasses {
            key
            displayName
        }
        apartmentComplexTypes {
            key
            displayName
        }
    }
`;

export const APARTMENT_COMPLEX_INFO = gql`
    query getApartmentComplex($uuid: String!) {
        getApartmentComplex(uuid: $uuid) {
            id
            type {
                displayName
            }
            name
            city {
                displayName
            }
            district {
                displayName
            }
            undergroundStation {
                displayName
            }
            class {
                displayName
            }
            address
            levels
            sections
            price
            beginDate
            endDate
            images {
                CHESS_GRID {
                    uuid
                    downloadUrl
                }
                SITE {
                    uuid
                    downloadUrl
                }
                MOBILE {
                    uuid
                    downloadUrl
                }
                PHOTO {
                    uuid
                    downloadUrl
                    name
                }
                VR {
                    uuid
                    downloadUrl
                    name
                    previewImageUrl
                }
                HALF_VR {
                    uuid
                    downloadUrl
                    name
                    previewImageUrl
                }
            }
        }
    }
`;

export const GET_EDIT_APARTMENT_COMPLEX_INFO = gql`
    query getApartmentComplex($uuid: String!) {
        getApartmentComplex(uuid: $uuid) {
            id
            type {
                key
                displayName
            }
            name
            city {
                key
                displayName
            }
            district {
                key
                displayName
            }
            undergroundStation {
                key
                displayName
            }
            class {
                key
                displayName
            }
            address
            levels
            sections
            price
            beginDate
            endDate
        }
    }
`;

export const GET_APARTMENT_COMPLEX_NAME = gql`
    query getApartmentComplexName($uuid: String!) {
        getApartmentComplexName(uuid: $uuid) {
            name
        }
    }
`;
