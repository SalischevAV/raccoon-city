import {KeyDisplayName} from '../shared';

export interface ApartmentComplexInputArgs {
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
