import {ApartmentComplexImages, KeyDisplayName} from './apartmentComplex.types';

// tslint:disable-next-line:no-empty-interface
export interface HouseImages extends ApartmentComplexImages {}
export interface House {
    id: string;
    name: string;
    class: KeyDisplayName;
    levels: number;
    publishedDate: string;
    price: number;
    beginDate: string;
    endDate: string;
    visibleInCarousel: boolean;
    apartmentComplex: string;
    parking: boolean;
    images: HouseImages;
}
