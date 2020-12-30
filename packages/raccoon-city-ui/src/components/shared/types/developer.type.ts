import {ApartmentComplexType as ApartmentComplex} from './apartmentComplex.types';

export interface Developer {
    id: string;
    name: string;
    address: string;
    emails: string[];
    receptionNumbers: string[];
    salesNumbers: string[];
    city: string;
    apartmentComplexes: ApartmentComplex[];
}
