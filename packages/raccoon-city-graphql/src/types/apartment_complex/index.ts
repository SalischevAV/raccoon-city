import {KeyDisplayName} from '../shared';
import {SpreadsheetFlat} from '../flat/flat';

export interface ApartmentComplexModelArgs {
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
    address: string;
    endDate: string;
}

export interface ApartmentComplexInputArgs {
    type: string;
    name: string;
    city: string;
    address: string;
    district: string;
    undergroundStation: string;
    class: string;
    levels: number;
    sections: number;
    price: number;
    beginDate: string;
    endDate: string;
}

export interface AssignFlatInputArgs {
    houseId: string;
    flats: SpreadsheetFlat[];
}
