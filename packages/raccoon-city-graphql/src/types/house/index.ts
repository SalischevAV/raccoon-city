import {KeyDisplayName} from '../shared';

export interface HouseDataInputArgs {
    type: KeyDisplayName;
    name: string;
    class: KeyDisplayName;
    levels: number;
    price: number;
    beginDate: string;
    endDate: string;
    order: number;
    visibleInCarousel: boolean;
    parking: boolean;
}
