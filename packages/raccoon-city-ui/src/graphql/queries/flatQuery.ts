import {gql} from 'apollo-boost';
import {Flat} from '../../components/shared/types/flat.types';
import {SinglePreviewImage} from '../../components/shared/types/layout.types';
import {ApartmentComplex} from '../../../../raccoon-city-graphql/src/db/models/apartmentComplex';
import {House} from '../../components/shared/types/house.types';

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
                    price
                    level
                    section
                    area
                    status
                    roomAmount
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
            price
            level
            section
            area
            status
            roomAmount
            squarePrice
            apartmentComplex {
                name
            }
            house {
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
