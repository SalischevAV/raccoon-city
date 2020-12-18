import {House} from './house.types';

export interface SingleImage {
    uuid: string;
    downloadUrl: string;
}

export interface NamedImage extends SingleImage {
    name: string;
}

export interface PreviewImage extends NamedImage {
    previewImageUrl: string;
}

export interface City {
    key: string;
    displayName: string;
    districts: District[];
    undergroundStations: UndergroundStation[];
}

export interface District {
    key: string;
    displayName: string;
}

export interface UndergroundStation {
    key: string;
    displayName: string;
}

export interface KeyDisplayName {
    key: string;
    displayName: string;
}

export interface ApartmentComplexDTO {
    type: KeyDisplayName;
    name: string;
    address: string;
    city: KeyDisplayName;
    district: KeyDisplayName;
    undergroundStation: KeyDisplayName;
    class: KeyDisplayName;
    levels: number;
    sections: number;
    price: number;
    beginDate: string;
    endDate: string;
}

export interface ApartmentComplexImages {
    CHESS_GRID?: SingleImage;
    SITE?: SingleImage;
    MOBILE?: SingleImage;
    PHOTO?: NamedImage[];
    VR?: PreviewImage[];
    HALF_VR?: PreviewImage[];
}

export interface ApartmentComplexType {
    id: string;
    type: KeyDisplayName;
    name: string;
    city: KeyDisplayName;
    district: KeyDisplayName;
    undergroundStation: KeyDisplayName;
    class: KeyDisplayName;
    levels: number;
    sections: number;
    price: number;
    beginDate: string;
    endDate: string;
    address: string;
    images: ApartmentComplexImages;
    houses: House[];
}

export interface ApartmentComplexFormValues {
    type: KeyDisplayName;
    name: string;
    city: City;
    address: string;
    district: District;
    undergroundStation: UndergroundStation;
    class: KeyDisplayName;
    levels: string;
    sections: string;
    price: string;
    beginDate: string;
    endDate: string;
}

export enum ImageType {
    CHESS_GRID = 'CHESS_GRID',
    SITE = 'SITE',
    MOBILE = 'MOBILE',
    PHOTO = 'PHOTO',
    VR = 'VR',
    HALF_VR = 'HALF_VR'
}
