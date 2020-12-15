import {gql} from 'apollo-boost';
import {Flat} from '../../components/shared/types/flat.types';

export const HOUSE_LIST = gql`
    query getHouses($apartmentComplexId: String!) {
        getHouses(apartmentComplexId: $apartmentComplexId) {
            id
            name
            publishedDate
            images {
                CHESS_GRID {
                    uuid
                    downloadUrl
                }
            }
        }
    }
`;

export const HOUSE_INFO = gql`
    query getHouse($uuid: String!) {
        getHouse(uuid: $uuid) {
            id
            name
            parking
            price
            beginDate
            endDate
            publishedDate
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

export const PUBLISHED_HOUSE_INFO = gql`
    query getPublishedHouse($uuid: String!) {
        getPublishedHouse(uuid: $uuid) {
            id
            name
        }
    }
`;

export const HOUSE_DATA = gql`
    query getHouse($uuid: String!) {
        getHouse(uuid: $uuid) {
            id
            name
            parking
            order
            price
        }
    }
`;

export interface GroupedFlats {
    id: string;
    section: string;
    levels: Array<{
        id: string;
        level: number;
        flats: Flat[];
    }>;
}

export interface FlatsInHouse {
    id: string;
    name: string;
    groupedFlats: GroupedFlats[];
}

export interface GetGroupedFlatsBySectionQuery {
    getGroupedFlatsBySection: {
        maxPrice: number;
        minPrice: number;
        maxArea: number;
        minArea: number;
        flatsSoldOut: boolean;
        houseFlats: FlatsInHouse[];
    };
}

export const GET_PUBLIC_GROUPED_FLATS_CHESSGRID = gql`
    query getPublicGroupedFlatsBySection($uuid: [String]) {
        getGroupedFlatsBySection: getPublicGroupedFlatsBySection(uuid: $uuid) {
            maxPrice
            minPrice
            maxArea
            minArea
            flatsSoldOut
            houseFlats {
                id
                name
                groupedFlats {
                    id
                    section
                    levels {
                        id
                        level
                        flats {
                            id
                            flatNumber
                            levelAmount
                            fakeLevel
                            price
                            level
                            section
                            area
                            status
                            sale
                            squarePrice
                            squarePriceSale
                            roomAmount
                        }
                    }
                }
            }
        }
    }
`;

export const GET_PUBLIC_FLATS_LIST = gql`
    query getPublicFlatsList($uuid: [String]) {
        getPublicFlatsList(uuid: $uuid) {
            id
            flatNumber
            levelAmount
            fakeLevel
            price
            level
            section
            area
            status
            sale
            squarePrice
            squarePriceSale
            roomAmount
        }
    }
`;

export const GET_GROUPED_FLATS_CHESSGRID = gql`
    query getGroupedFlatsBySection($uuid: [String]) {
        getGroupedFlatsBySection(uuid: $uuid) {
            maxPrice
            minPrice
            maxArea
            minArea
            flatsSoldOut
            houseFlats {
                id
                name
                groupedFlats {
                    id
                    section
                    levels {
                        id
                        level
                        flats {
                            id
                            flatNumber
                            levelAmount
                            fakeLevel
                            price
                            level
                            section
                            area
                            status
                            sale
                            squarePrice
                            squarePriceSale
                            roomAmount
                        }
                    }
                }
            }
        }
    }
`;
export const GET_GROUPED_FLATS = gql`
    query getGroupedHouseData($uuid: String!) {
        getGroupedHouseData(uuid: $uuid) {
            groupedFlats {
                id
                section
                levels {
                    id
                    level
                    flats {
                        id
                        flatNumber
                        price
                        level
                        section
                        area
                        status
                        squarePrice
                        squarePriceSale
                        sale
                        roomAmount
                        levelAmount
                    }
                }
            }
        }
    }
`;

export const GET_FLAT_LIST = gql`
    query getFlatsList($uuid: [String]) {
        getFlatsList(uuid: $uuid) {
            id
            flatNumber
            levelAmount
            fakeLevel
            price
            level
            section
            area
            status
            sale
            squarePrice
            squarePriceSale
            roomAmount
        }
    }
`;

export const PUBLISHED_HOUSE_LIST = gql`
    query getPublishedHouses($uuid: String!) {
        getPublishedHouses(uuid: $uuid) {
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

export const COUNT_PUBLIC_FLAT_STATUSES = gql`
    query countPublicFlats($uuid: String!) {
        countPublicFlats(uuid: $uuid) {
            label
            count
        }
    }
`;
