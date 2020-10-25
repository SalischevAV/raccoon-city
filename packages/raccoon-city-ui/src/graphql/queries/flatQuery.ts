import {gql} from 'apollo-boost';
import {ApartmentComplex} from '../../../../raccoon-city-graphql/src/db/models/apartmentComplex';
import {Developer} from '../../../../raccoon-city-graphql/src/db/models/developer';
import {Flat} from '../../components/shared/types/flat.types';
import {House} from '../../components/shared/types/house.types';
import {SinglePreviewImage} from '../../components/shared/types/layout.types';

export const GET_SECTION = gql`
    query getSectionData($sectionId: String!) {
        getSectionData(sectionId: $sectionId) {
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
                    roomAmount
                    sale
                    squarePrice
                    squarePriceSale
                }
            }
        }
    }
`;

export const GET_MAX_LEVEL = gql`
    query getMaxLevelInSection($sectionId: String!) {
        getMaxLevelInSection(sectionId: $sectionId)
    }
`;

interface ViewBox {
    width: number;
    height: number;
}
export interface SidebarFlat extends Flat {
    apartmentComplex: ApartmentComplex;
    house: House;
    developer: Developer;
    levelLayouts: Array<{
        id: string;
        paths: string[];
        image: SinglePreviewImage;
        viewBox: ViewBox;
    }>;
}
export interface GetFlatSidebarDataQuery {
    getFlatSidebarInfo: SidebarFlat;
}
export const GET_FLAT_SIDEBAR_DATA = gql`
    query getFlatSidebarInfo($flatId: String!) {
        getFlatSidebarInfo(flatId: $flatId) {
            id
            flatNumber
            levelAmount
            price
            level
            section
            area
            status
            roomAmount
            sale
            squarePrice
            squarePriceSale
            apartmentComplex {
                id
                name
            }
            developer {
                id
                receptionNumbers
                salesNumbers
                logo {
                    downloadUrl
                }
            }
            house {
                id
                name
            }
            layout {
                id
                name
                image {
                    uuid
                    downloadUrl
                    previewImageUrl
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
            levelLayouts {
                id
                image {
                    uuid
                    downloadUrl
                    previewImageUrl
                }
                viewBox {
                    width
                    height
                }
                paths
            }
        }
    }
`;

export const GET_PUBLIC_FLAT_SIDEBAR_DATA = gql`
    query getPublicFlatSidebarInfo($flatId: String!) {
        getFlatSidebarInfo: getPublicFlatSidebarInfo(flatId: $flatId) {
            id
            flatNumber
            levelAmount
            price
            level
            section
            area
            status
            roomAmount
            sale
            squarePrice
            squarePriceSale
            apartmentComplex {
                id
                name
            }
            developer {
                id
                receptionNumbers
                salesNumbers
                logo {
                    downloadUrl
                }
            }
            house {
                id
                name
            }
            layout {
                id
                name
                image {
                    uuid
                    downloadUrl
                    previewImageUrl
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
            levelLayouts {
                id
                image {
                    uuid
                    downloadUrl
                    previewImageUrl
                }
                viewBox {
                    width
                    height
                }
                paths
            }
        }
    }
`;
