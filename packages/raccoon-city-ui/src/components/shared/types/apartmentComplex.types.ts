export interface SingleImage {
    uuid: string;
    downloadUrl: string;
}

export interface NamedImage extends SingleImage {
    name: string;
}

export interface City {
    key: string;
    displayName: string;
    districts: District[];
}

export interface District {
    key: string;
    displayName: string;
}

interface KeyDisplayName {
    key: string;
    displayName: string;
}

export interface ApartmentComplexDTO {
    type: KeyDisplayName;
    name: string;
    city: KeyDisplayName;
    district: KeyDisplayName;
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
    VR?: NamedImage[];
    HALF_VR?: NamedImage[];
}

export interface ApartmentComplexType {
    id: string;
    type: KeyDisplayName;
    name: string;
    city: KeyDisplayName;
    district: KeyDisplayName;
    class: KeyDisplayName;
    levels: number;
    sections: number;
    price: number;
    beginDate: string;
    endDate: string;
    images: ApartmentComplexImages;
}

export interface ApartmentComplexFormValues {
    type: KeyDisplayName;
    name: string;
    city: City;
    district: District;
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