import {gql} from 'apollo-boost';
import {GroupedFlats} from './houseQuery';
import {HouseLayout} from '../../components/shared/types/layout.types';

export const GET_LAYOUTS = gql`
    query getFlatLayouts($houseId: String!) {
        getFlatLayouts(houseId: $houseId) {
            id
            name
            image {
                downloadUrl
                previewImageUrl
            }
        }
    }
`;

export interface GetLayoutQuery {
    getFlatLayout: HouseLayout;
}
export const GET_LAYOUT = gql`
    query getFlatLayout($layoutId: String!) {
        getFlatLayout(layoutId: $layoutId) {
            id
            name
            image {
                downloadUrl
                previewImageUrl
            }
            flats {
                id
                flatNumber
            }
            images {
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
export interface GetGroupedFlatsWithLayoutQuery {
    getChessGridLayout: GroupedFlats[];
}
export const GET_GROUPED_FLATS_WITH_LAYOUT = gql`
    query getChessGridLayout($houseId: String!, $layoutId: String!) {
        getChessGridLayout(houseId: $houseId, layoutId: $layoutId) {
            id
            section
            levels {
                id
                level
                flats {
                    id
                    flatNumber
                    levelAmount
                    price
                    level
                    section
                    area
                    status
                    sale
                    roomAmount
                    belongsToLayout
                    hasLayout
                }
            }
        }
    }
`;

export const GET_LEVEL_LAYOUTS = gql`
    query getLevelLayouts($houseId: String!) {
        getLevelLayouts(houseId: $houseId) {
            id
            name
            image {
                downloadUrl
                previewImageUrl
            }
        }
    }
`;

export const GET_LEVEL_LAYOUTS_EXTENDED = gql`
    query getLevelLayoutsToChessView($houseId: String!) {
        getLevelLayoutsToChessView(houseId: $houseId) {
            id
            name
            image {
                downloadUrl
                previewImageUrl
            }
            levels
        }
    }
`;

export const GET_PUBLISHED_FLATS_INFO_WITH_SVG_LAYOUTS = gql`
    query getPublishedFlatsLayoutByHouseId($houseId: String, $sectionId: String, $levelId: String) {
        getPublishedFlatsLayoutByHouseId(houseId: $houseId, sectionId: $sectionId, levelId: $levelId) {
            image {
                previewImageUrl
                downloadUrl
            }
            fullFlatsInfo {
                flatInfo {
                    flatNumber
                    price
                    level
                    squarePrice
                    squarePriceSale
                    levelAmount
                    status
                    id
                    layout
                    roomAmount
                    area
                }
                svgInfo {
                    paths
                    viewBox {
                        width
                        height
                    }
                    id
                    image {
                        downloadUrl
                        name
                        previewImageUrl
                    }
                }
            }
        }
    }
`;

export const GET_FLATS_INFO_WITH_SVG_LAYOUTS = gql`
    query getFlatsLayoutsByIds($levelId: String) {
        getFlatsLayoutsByIds(levelId: $levelId) {
            image {
                previewImageUrl
                downloadUrl
            }
            fullFlatsInfo {
                flatInfo {
                    flatNumber
                    price
                    level
                    squarePrice
                    squarePriceSale
                    levelAmount
                    status
                    id
                    layout
                    roomAmount
                    area
                }
                svgInfo {
                    paths
                    viewBox {
                        width
                        height
                    }
                    id
                    image {
                        downloadUrl
                        name
                        previewImageUrl
                    }
                }
            }
        }
    }
`;

export const GET_APARTMENT_COMPLEX_LAYOUTS = gql`
    query getApartmentComplexLayouts($uuid: String!) {
        getApartmentComplexLayouts(uuid: $uuid) {
            id
            name
            image {
                downloadUrl
                previewImageUrl
            }
            layouts {
                house {
                    id
                    name
                    images {
                        CHESS_GRID {
                            uuid
                            downloadUrl
                        }
                    }
                }
                path
                viewBox {
                    width
                    height
                }
            }
        }
    }
`;

export const GET_APARTMENT_COMPLEX_LAYOUT = gql`
    query getApartmentComplexLayout($uuid: String!) {
        getApartmentComplexLayout(uuid: $uuid) {
            id
            name
            image {
                downloadUrl
                previewImageUrl
            }
            layouts {
                house {
                    id
                    name
                    order
                    visibleInCarousel
                    images {
                        CHESS_GRID {
                            uuid
                            downloadUrl
                        }
                    }
                }
                path
                viewBox {
                    width
                    height
                }
            }
        }
    }
`;
